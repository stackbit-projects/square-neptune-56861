import React from 'react'
import axios from 'axios';
import Payment, { PaymentProps } from '.'
import { InlineStyledButton, InlineStyledInput, InlineWrapper } from '../Form.styles'
import {  AppliedDiscount, AppliedDiscountButton, DiscountWrapper, PriceText } from './Payment.styles'
import { isBefore, isAfter } from 'date-fns'

export interface DiscountDataProps {
  code: string
  method: 'fixed' | 'subtract' | 'percentage',
  amount: number
  start: string
  end: string
}

export const formatPrice = (amount: number) => amount.toFixed(2).replace(/[.,]00$/, "")

interface PaymentWrapperProps {
  onDiscountSubmit?: (code: string, value: number) => void
  amount: number
  paymentProps: PaymentProps
}

const Discount = (props: { formId: string, currentAmount: number, onSubmit: (values: { code: string, value: number }) => void }) => {
  const [discountInput, setDiscountInput] = React.useState("")
  const [discountApplied, setDiscountApplied] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const discountParam = urlParams.get("discountCode");
    if (discountParam) {
      setDiscountInput(discountParam)
      applyDiscount(discountParam)
    }
  }, [])

  const applyDiscount = async (code?: string) => {
    const discountCode = discountInput || code
    if (!discountCode) {
      setError("Please enter valid discount code")
      return props.onSubmit({ code: "", value: props.currentAmount })
    }

    try {
      const response = await axios.post("/api-fe/discountLookup", {
        formId: props.formId,
        code: discountCode
      })
      const validCode: DiscountDataProps = response.data
      if (isBefore(new Date(validCode.start), new Date()) && isAfter(new Date(validCode.end), new Date())) {
        setError("Discount code not recognized")
        return props.onSubmit({ code: "", value: props.currentAmount })
      }
      setError(null)

      const codeAmount = Number(validCode.amount)
      if (validCode.method === 'fixed') {
        props.onSubmit({ code: discountCode, value: codeAmount * 100 })
      } else if (validCode.method === 'subtract') {
        props.onSubmit({ code: discountCode, value: props.currentAmount - (codeAmount * 100) })
      } else if (validCode.method === 'percentage') {
        const subtraction = (props.currentAmount / 100) * codeAmount
        props.onSubmit({ code: discountCode, value: props.currentAmount - subtraction })
      }
      setDiscountApplied(true)
    } catch (error) {
      if (error.response.status >= 500) {
        setError("Something went wrong, please try again")
      } else {
        setError(error.response.data)
      }
      props.onSubmit({ code: "", value: props.currentAmount })
    }
  }

  if (discountApplied) {
    return (
      <DiscountWrapper>
        <label>Discount applied</label>
        <AppliedDiscount>
          <span>{discountInput}</span>
          <AppliedDiscountButton onClick={() => {
             setDiscountInput("")
            setDiscountApplied(false)
            props.onSubmit({ code: "", value: props.currentAmount })
          }}/>
        </AppliedDiscount>
      </DiscountWrapper>
    )
  }
  return (
    <DiscountWrapper>
      <InlineWrapper>
        <label htmlFor="discountInput">Discount code</label>
        <InlineStyledInput
          type="text"
          id="discountInput"
          name="discountInput"
          className="inline-input"
          value={discountInput}
          onChange={e => {
            setError(null)
            setDiscountInput(e.target.value)
          }}
        />
        <InlineStyledButton type="button"  onClick={() => applyDiscount()} disabled={false}>Apply</InlineStyledButton>
        {error && <span className="field-validation-error">{error}</span>}
      </InlineWrapper>
    </DiscountWrapper>
  )
}

const Price = (props: { amount: number }) => <PriceText>£{formatPrice(props.amount / 100)}</PriceText>

export const PaymentWrapper = (props: PaymentWrapperProps) => {
  return (
    <React.Fragment>
      <Price amount={props.paymentProps.amount} />
      {props.onDiscountSubmit &&
        <Discount
          formId={props.paymentProps.formId}
          currentAmount={props.amount}
          onSubmit={({ code, value }) => props.onDiscountSubmit(code, value)}
        />
      }
      <Payment {...props.paymentProps} />
    </React.Fragment>
  )
}