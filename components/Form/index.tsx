
import React from 'react'
import axios from 'axios';
import { Formik, Form, getIn, ErrorMessage, FormikProps, FormikValues } from 'formik';
import { 
  createValidationSchema,
  flattenFormValues,
  extractFields,
  validate,
  computeConditionRule,
  FormValuesProps,
  ConditionProps,
  focusFormField
} from '../../utils/formUtils';
import Postcode from "./Postcode"
import { Radio, CheckBox, DropDown, Text, Legend, Input, DatePickerDropdowns, InputError } from './Elements';
import { BackButton, FormSectionWrapper, Section, StyledButton } from './Form.styles';
import { PaymentWrapper } from './Payment/PaymentWrapper';
import DashedDivider from '../Divider/Dashed';
import { FormStorageNames, OwnPlaceAlias } from '../../utils/constants';

interface RenderFieldProps {
  isValidating: boolean
  formProps: FormikProps<FormikValues>
  fieldValues: FormValuesProps
  rules: ConditionProps[];
  setDisabledState: (fieldId: string, state: boolean) => void
  firstErrorKey: string | null
}

const RenderField = ({ isValidating, formProps, fieldValues, rules, setDisabledState, firstErrorKey }: RenderFieldProps) => {
  const errRef = React.useRef(null)
  const hasError = getIn(formProps.errors, fieldValues.name) && getIn(formProps.touched, fieldValues.name)

  const fieldType = fieldValues.type

  React.useEffect(() => {
    if (hasError && errRef && errRef.current && firstErrorKey && firstErrorKey === fieldValues.name) {
      errRef.current.scrollIntoView({ behavior: 'smooth' })
      focusFormField(errRef.current)
      //@see Postcode which has responsibility for handling it's own error messages
    }
  }, [isValidating, firstErrorKey])

  if (fieldValues.name === 'address') {
    return (
      <Postcode
        firstErrorKey={firstErrorKey}
        formErrors={formProps.errors}
        values={formProps.values.address}
        touchedFields={formProps.touched}
        onBlur={formProps.handleBlur}
        onChange={formProps.handleChange}
        onSubmit={values => formProps.setFieldValue('address', values)}
      />
    )
  }

  if (fieldType === 'button' || fieldValues.type === 'hidden') {
    return null
  }

  if (fieldValues.isHTML) {
    if (fieldType === 'section') {
      return (
        <div>
          {fieldValues.items.map((sectionField, index) => (
            <React.Fragment key={`${index}-${sectionField.Id}`}>
              <RenderField
                firstErrorKey={firstErrorKey}
                isValidating={isValidating}
                formProps={formProps}
                fieldValues={sectionField}
                rules={rules}
                setDisabledState={setDisabledState}
              />
            </React.Fragment>
          ))}
        </div>
      )
    }

    return <Text htmlElement={fieldValues.htmlElement} />
  }

  const { options, validation, defaultValue, helptext, conditions, className, itemName, ...rest } = fieldValues
  const isCheckbox = fieldValues.type === 'checkbox'

  const handleRules = (event) => {
    if (rules) {
      rules.forEach(condition => {
        const cond = condition.MatchType === 'any' ? 'find' : 'every'
        const isValid = condition.Conditions[cond](rule => {
          const relatedField = fieldValues.id === rule.FieldKey ? isCheckbox ? String(event.target.checked) : event.target.value : formProps.values[rule.FieldKey]
          if (relatedField) {
            return computeConditionRule({ operator: rule.Operator, match: rule.Value, value: relatedField })
          }
        })
        condition.Actions.forEach(action => {
          const isDisabled = action.Action === 'disable'
          setDisabledState(action.FieldKey, isValid ? isDisabled : !isDisabled)
        })
      })
    }
  }

  let fieldProps: any = {
    ...rest,
    helptext,
    className,
    'aria-required': validation.required,
    required: validation.required,
    value: formProps.values[rest.name],
    onBlur: formProps.handleBlur,
    onChange: (e) => {
      formProps.handleChange(e)
      handleRules(e)
    },
  }

  if (hasError) fieldProps["aria-invalid"] = "true"

  // if there is no error, set the aria-label to label value
  if (!hasError) fieldProps['aria-label'] = rest.label
  // if there is an error, include the error id along with  the field label in the aria-describedby
  fieldProps['aria-describedby'] = hasError ? `${rest.name} ${rest.name}-error` : rest.name

  if (fieldProps.type === 'date') {
    fieldProps.max = validation.max
    fieldProps.min = validation.min
  } else {
    fieldProps.maxLength = validation.max
    fieldProps.minLength = validation.min
  }

  const getField = () => {
    if (fieldType === 'checkbox') {
      return <CheckBox {...fieldProps} selected={fieldProps.value} />
    }

    if (fieldType === 'checkbox list') {
      if (!hasError) {
        delete fieldProps['aria-describedby']
      }
      delete fieldProps['aria-label']
      return (
        <React.Fragment>
          <fieldset>
            <Legend label={fieldProps.label} required={validation.required} />
            {options.map(option =>
              <CheckBox
                key={`${fieldProps.id}-${option.value}`}
                {...fieldProps}
                required={false}
                id={`${fieldProps.id}-${option.value}`}
                name={`${fieldProps.id}-${option.value}`}
                value={option.value}
                label={option.label}
                onChange={(e) => {
                  let checkValues = fieldProps.value
                  if (!e.target.checked) {
                    checkValues = checkValues.filter(val => val !== e.target.value)
                  } else {
                    checkValues.push(e.target.value)
                  }
                  formProps.setFieldValue(fieldProps.id, checkValues)
                  handleRules(e)
                }}
              />
            )}
          </fieldset>
        </React.Fragment>
      )
    }

    if (fieldType === 'radio list') {
      if (!hasError) {
        delete fieldProps['aria-describedby']
      }
      delete fieldProps['aria-label']
      return !fieldProps.disabled && (
        <React.Fragment>
          <fieldset>
            <Legend label={fieldProps.label} required={validation.required} />
              {options.map(option => (
                <Radio
                  key={`${fieldProps.id}-${option.value}`}
                  {...fieldProps}
                  required={false}
                  name={fieldProps.name}
                  id={`${fieldProps.id}-${option.value}`}
                  value={option.value} label={option.label}
                  selected={fieldProps.value === option.value}
                  onChange={(e) => {
                    formProps.setFieldValue(fieldProps.id, e.target.value)
                    handleRules(e)
                  }}
                />
              ))}
          </fieldset>
        </React.Fragment>
      )
    }

    if (["dropdown", "list box"].includes(fieldType)) {
      return <DropDown options={options} error={hasError} {...fieldProps} addDefault={!Boolean(defaultValue)} required={validation.required} />
    }

    if (fieldType === "date") {

      const defaultMinDate = new Date();
      defaultMinDate.setFullYear(defaultMinDate.getFullYear() - 120)
      const defaultMaxDate = new Date();
      defaultMaxDate.setFullYear(defaultMaxDate.getFullYear() + 51)

      let minDate: Date = fieldProps.min ? new Date(fieldProps.min) : defaultMinDate;
      let initDate: Date | null = fieldProps.value ? new Date(fieldProps.value) : null;
      let maxDate: Date = fieldProps.max ? new Date(fieldProps.max) :defaultMaxDate;

      if (fieldProps.alias.toLowerCase() === 'past') {
        minDate = defaultMinDate;
        maxDate = new Date();
      } else if (fieldProps.alias.toLowerCase() === 'future') {
        minDate = new Date();
        maxDate = defaultMaxDate;
      } 

      let min = `${minDate.getFullYear()}-${String(minDate.getMonth()+1).padStart(2, '0')}-${String(minDate.getDate()).padStart(2, '0')}`;
      let initValue = initDate ? `${initDate.getFullYear()}-${String(initDate.getMonth()+1).padStart(2, '0')}-${String(initDate.getDate()).padStart(2, '0')}` : null;
      let max = `${maxDate.getFullYear()}-${String(maxDate.getMonth()+1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;
      
      /**
      * @see https://guidedogs.atlassian.net/browse/GDID-4569
      * Leaving code in should we ever revisit using the built-in Date Input
      * 
      // test whether a new date input falls back to a text input or not
      const test = document.createElement('input');

      try {
        test.type = 'date';
      } catch (e) {
        console.log(e.description);
      }
      // if it does, run the code inside the if() {} block
      if(test.type === 'date') {
        return (
          <Input {...fieldProps} type='date' min={min} max={max} error={hasError} />
        )
      }
      */
      return (
        <DatePickerDropdowns 
          {...fieldProps}
          min={min}
          max={max}
          initValue={initValue}
          error={hasError}
          onChange={value => formProps.setFieldValue(fieldProps.name, value)}
        />
          
      )
    }

    return (
      <Input  {...fieldProps} type={fieldType} error={hasError} />
    )
  }

  return (
    <React.Fragment>
      <div ref={errRef}>
        {getField()}
        <ErrorMessage name={fieldValues.name} render={msg => <InputError id={`${fieldValues.name}-error`} message={msg} />} />
      </div>
    </React.Fragment>
  )
}

const FormComponent = (props) => {
  const {
    page: { id: pageId, fields: { capacity, eventDetails } },
    item: { fields: { FormData, PaymentOptions } }
  } = props.renderingContext

  if (!FormData || !FormData.Fields || !eventDetails) {
    console.error('No FormData/eventDetails detected')
    return null
  }

  if (capacity && ["cancel", "full"].includes(capacity["title"])) {
    return null
  }

  const paymentSettings = (PaymentOptions || []).map(paymentOption => ({
    type: paymentOption['Type ID'],
    summary: paymentOption['Payment Summary Text']
  }))

  const formDataFields = FormData.Fields
  const sectionRef = React.useRef(null)

  const [firstErrorKey, setFirstErrorKey] = React.useState<string | null>(null)

  const [currentStep, setCurrentStep] = React.useState(1)
  const [hasMounted, setHasMounted] = React.useState<boolean>(false)
  const [isValidating, setIsValidating] = React.useState<boolean>(false)
  const [renderPaymentStep, setRenderPaymentStep] = React.useState<boolean>(false)
  const [hasPaymentSection, setHasPaymentSection] = React.useState<boolean>(false)
  const [requiresPayment, setRequiresPayment] = React.useState<number | null>(null)
  const [paymentReference, setPaymentReference] = React.useState({
    SitecoreFormSessionId: null,
    WebsiteReferenceID: null
  })
  const [formSubmissionError, setFormSubmissionError] = React.useState<string | null>(null)
  const [formattedFields, setFormattedFields] = React.useState(extractFields(formDataFields.filter(field => field.Name !== 'meta')))
  const [allFormValues, setAllFormValues] = React.useState(flattenFormValues(formattedFields))
  const capacityFull = capacity ? capacity["title"] === OwnPlaceAlias : false
  const ownPlaceField = allFormValues.find(formValue => formValue.alias && formValue.alias.toLowerCase() === 'own_place')

  const initialValues = allFormValues.reduce((sum, item) => {
    if (item.isHTML) {
      return sum
    }
    if (item.name === 'address') {
      return {
        ...sum,
        address: {
          id: "",
          label: "",
          addressline1: "",
          addressline2: "",
          addressline3: "",
          town: "",
          county: "",
          country: "United Kingdom",
          postcode: "",
        }
      }
    }
    return {
      ...sum,
      [item.name]: item.defaultValue ?? ""
    }
  }, {
    paymentId: "",
  })
  const conditions = allFormValues.reduce((sum, item) => {
    if (item.isHTML || !item.conditions) {
      return sum
    }
    return [
      ...sum,
      ...item.conditions
    ]
  }, [])

  const updateFormattedField = (fields, fieldId, key, value) => {
    const updatedFields = fields.map(field => {
      if (field.id === fieldId) {
        if (key.includes('.')) {
          const keys = key.split(".")
          keys.reduce((sum, keySplit, index) => {
            if (sum[keySplit] === undefined) {
              return sum
            }

            if (index === (keys.length - 1)) {
              return sum[keySplit] = value
            }
            return sum[keySplit]
          }, field)
        }

        field[key] = value
      }

      if (field.isHTML) {
        if (field.items) {
          return {
            ...field,
            items: updateFormattedField(field.items, fieldId, key, value)
          }
        } else {
          return field
        }
      }
      return field
    })

    return updatedFields
  }

  React.useEffect(() => {
    setAllFormValues(flattenFormValues(formattedFields))
  }, [formattedFields])

  // @NOTE enables payment step 
  React.useEffect(() => {
    if (hasPaymentSection && formattedFields[currentStep - 1] && formattedFields[currentStep - 1].items.find(item => item.name === 'payment')) {
      setRenderPaymentStep(true)
    } else {
      setRenderPaymentStep(false)
    }
  }, [currentStep, hasPaymentSection])

  // @NOTE scrolls to top of appended section
  React.useEffect(() => {
    if (sectionRef && sectionRef.current && hasMounted) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
      focusFormField(sectionRef.current)
    }
  }, [currentStep, renderPaymentStep])

  // @NOTE sets payment amount
  React.useEffect(() => {
    const paymentField = allFormValues.find(formValue => formValue.name === 'payment')
    if (paymentField) {
      setHasPaymentSection(true)
    } else {
      setHasPaymentSection(false)
    }

    if (paymentField && !paymentField.disabled && !capacityFull) {
      const paymentAmount = Number(paymentField.defaultValue)
      if (!isNaN(paymentAmount) && paymentAmount > 0) {
        setRequiresPayment(paymentAmount * 100)
        initialValues.payment = paymentAmount * 100
      }
    } else {
      setRequiresPayment(null)
    }

  }, [allFormValues])

  // @NOTE sets disabled/required state on initial load
  React.useEffect(() => {
    if (!hasMounted) {
      let updatedFields = formattedFields
      conditions.forEach(condition => {
        condition.Actions.forEach(action => {
          updatedFields = updateFormattedField(formattedFields, action.FieldKey, 'disabled', action.Action === 'enable')
        })
      })

      if (ownPlaceField && capacityFull) {
        updatedFields = updateFormattedField(updatedFields, ownPlaceField.id, 'type', 'hidden')
      }
      
      setFormattedFields(updatedFields)
      setHasMounted(true)
    }
  }, [hasMounted, formattedFields, conditions, capacityFull, ownPlaceField])

  const getButtonData = (hasSubmittedPayment: boolean): { label: string, action: "payment" | "next" | "submit" } => {
    const paymentField = formattedFields[currentStep] && formattedFields[currentStep].items.find(item => item.name === "payment")
    if (requiresPayment && paymentField && !hasSubmittedPayment) {
      return {
        label: "To payment",
        action: "payment"
      }
    }

    if (!paymentField && currentStep < formattedFields.length) {
      return {
        label: "Continue",
        action: "next"
      }
    }

    return {
      label: "Reserve place",
      action: "submit"
    }
  }

  const setDisabled = (fieldId: string, state: boolean) => {
    const fields = updateFormattedField(formattedFields, fieldId, "disabled", state)
    setFormattedFields(fields)
  }

  const validatePage = async (values) => {
    const isUK = values['address'].country === 'United Kingdom'

    const currentFormValues = formattedFields.slice(0, currentStep).reduce((fields, field) => {
      return [
        ...fields,
        ...field.items
      ]
    }, [])

    const formattedFormValues = flattenFormValues(currentFormValues)
    const schema = createValidationSchema({ fields: formattedFormValues, hardcodedAddress: true, isUK })

    const validateValues = await validate({ schema, values, fields: formattedFormValues })

    return validateValues
  }

  const matchFieldByName = (name, value) => {
    const matchedItem = allFormValues.find(field => field.itemName?.toLowerCase() === name.toLowerCase())
    if (!matchedItem) {
      return null
    }

    return {
      [matchedItem.id]: value
    }
  }

  const onSubmit = (values) => {
    const aliasFields = allFormValues.filter(value => value.alias)
    const firstname = aliasFields.find(value => value.alias === "firstname")
    const lastname = aliasFields.find(value => value.alias === "lastname")
    const email = aliasFields.find(value => value.alias === "email")
    const challenge = aliasFields.find(value => value.alias === "challenge")
    const dateOfChallenge = aliasFields.find(value => value.itemName === "DateOfChallenge")

    sessionStorage.removeItem(pageId);
    sessionStorage.setItem(pageId, JSON.stringify({
      [FormStorageNames.Firstname]: values[firstname.id],
      [FormStorageNames.Lastname]: values[lastname.id],
      [FormStorageNames.Email]: values[email.id],
      [FormStorageNames.Challenge]: challenge ? values[challenge.id] : "",
      [FormStorageNames.DateOfChallenge]: dateOfChallenge ? values[dateOfChallenge.id] : "",
      [FormStorageNames.PaymentReference]: paymentReference.WebsiteReferenceID ? paymentReference.WebsiteReferenceID : undefined,
      [FormStorageNames.SuccessfulPaymentFormNotUpdated]: values['successful_payment_form_not_updated'],
    }));

    const button = allFormValues.find(formValue => formValue.redirectURL)
    if (button) {
      window.location.href = button.redirectURL
    } else {

      window.location.href = window.location.href + "thank-you"
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validate={validatePage}
      onSubmit={async (values, formProps) => {
        formProps.setSubmitting(true)
        setFormSubmissionError(null)
        const addressFields = Object.keys(values.address).reduce((sum, key) => {
          if (!matchFieldByName) {
            return sum
          }
          return {
            ...sum,
            ...matchFieldByName(key, values.address[key])
          }
        }, {})

        const ownPlaceValue = capacityFull && ownPlaceField ? { [ownPlaceField.id]: "OWN" } : undefined

        let payload = {
          formId: props.renderingContext.item.id,
          ...values,
          ...addressFields,
          ...ownPlaceValue
        }

        const finalAmountField = matchFieldByName("finalamount", "")
        const paymentReferenceField = matchFieldByName("payment reference", "")
        const discountField = matchFieldByName("discounts", "")

        if (!requiresPayment) {
          payload = {
            ...payload,
            ...finalAmountField,
            ...paymentReferenceField,
            ...discountField
          }
        } else {
          delete payload[Object.keys(finalAmountField)[0]]
          delete payload[Object.keys(paymentReferenceField)[0]]
          delete payload[Object.keys(discountField)[0]]
        }

        delete payload.address
        delete payload.discounts
        delete payload.paymentId
        delete payload.payment

        try {
          const { data } = await axios.post("/api-fe/formSubmission", payload)
          setPaymentReference(data)

          if (hasPaymentSection && requiresPayment && currentStep !== formattedFields.length) {
            setCurrentStep(currentStep + 1)
          } else {
            onSubmit(values)
          }
        } catch (error) {
          console.error(error)
          if (error.response?.data && error.response.status < 500) {
            formProps.setErrors(error.response.data)
          } else {
            setFormSubmissionError("Something went wrong")
          }
          setCurrentStep(hasPaymentSection ? formattedFields.length - 1 : formattedFields.length)
        }

        formProps.setSubmitting(false)
      }}
    >
      {(formProps) => {
        const availableFields = formattedFields.slice(0, currentStep)
        const hasMadePayment = Boolean(formProps.values.paymentId) && Object.keys(formProps.errors).length > 0
        const showPaymentStep = renderPaymentStep && requiresPayment && !hasMadePayment
        const buttonData = getButtonData(hasMadePayment)
        if (showPaymentStep) {
          const paymentFields = availableFields[currentStep - 1]
          const discountField = allFormValues.find(field => field.name === "discounts")
          const productType = allFormValues.find(field => field.itemName === "ProductType")
          const statementDescription = allFormValues.find(field => field.itemName === "StatementDescriptorSuffix")
          return (
            <React.Fragment>
              <BackButton type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                Back to registration
              </BackButton>

              <Section ref={sectionRef}>
                {paymentFields.items.map((paymentField, paymentFieldIndex) => {
                  return <React.Fragment key={`paymentField-${paymentFieldIndex}`}>
                    {paymentField.name === "payment" ?
                      <PaymentWrapper
                        amount={requiresPayment}
                        onDiscountSubmit={discountField ? (code, value) => {
                          formProps.setFieldValue("payment", value)
                          formProps.setFieldValue(discountField.id, code)
                        } : undefined}
                        paymentProps={{
                          discountCode: discountField.value,
                          paymentOptions: paymentSettings,
                          referenceNumber: paymentReference.WebsiteReferenceID,
                          sessionId: paymentReference.SitecoreFormSessionId,
                          statement: statementDescription?.defaultValue ?? "",
                          productType: productType?.defaultValue ?? "",
                          formId: props.renderingContext.item.id,
                          amount: formProps.values.payment,
                          onReferenceUpdate: (ref: string) => setPaymentReference({
                            ...paymentReference,
                            WebsiteReferenceID: ref
                          }),
                          onSubmit: (paymentId, params) => {
                            console.log(" params['successful_payment_form_not_updated']", params)
                            formProps.setFieldValue("paymentId", paymentId)
                            formProps.setSubmitting(true)
                            formProps.values.successful_payment_form_not_updated = params['successful_payment_form_not_updated'] && params['successful_payment_form_not_updated']
                            formProps.values.paymentId = paymentId
                            onSubmit(formProps.values)
                          }
                        }}
                      />
                      : <RenderField
                        firstErrorKey={firstErrorKey}
                        isValidating={isValidating}
                        rules={conditions}
                        formProps={formProps}
                        fieldValues={paymentField}
                        setDisabledState={setDisabled}
                      />
                    }
                  </React.Fragment>
                })}
              </Section>
            </React.Fragment>
          )
        }
        return (
          <Form id="formWrapper">
            {availableFields.map((availableField, index) => {
              return (
                <React.Fragment>
                  {index > 0 && <DashedDivider />}
                  <Section ref={sectionRef} key={`section-${index}`}>
                    {availableField.items.map((field: FormValuesProps, index) => {
                      return (
                        <FormSectionWrapper key={`${field.id}-${index}`}>
                          <RenderField
                            firstErrorKey={firstErrorKey}
                            isValidating={isValidating}
                            rules={conditions}
                            formProps={formProps}
                            fieldValues={field}
                            setDisabledState={setDisabled}
                          />
                        </FormSectionWrapper>
                      )
                    })}

                    {index >= currentStep - 1 &&
                      <StyledButton
                        type="button"
                        disabled={formProps.isSubmitting}
                        onClick={async () => {
                          setFirstErrorKey(null);
                          setIsValidating(true)
                          const formErrors = await formProps.validateForm()
                          if (Object.keys(formErrors).length > 0) {
                            Object.keys(formErrors).map(formErr => formProps.setFieldTouched(formErr))

                            setFirstErrorKey(Object.keys(formErrors)[0])
                          } else {
                            if (["submit", "payment"].includes(buttonData.action)) {
                              await formProps.submitForm()
                            } else {
                              setCurrentStep(currentStep + 1)
                            }
                          }
                          
                          setIsValidating(false)
                        }}
                      >
                        {buttonData.label}
                      </StyledButton>
                    }

                  </Section>
                </React.Fragment>
              )
            })}

            {formSubmissionError && (
              <React.Fragment>
                <h2>Well, this is paw-kward...</h2>
                <p>{formSubmissionError}</p>
                {formProps.values.paymentId && <p><strong>Payment Reference</strong>: {formProps.values.paymentId}</p>}
              </React.Fragment>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default FormComponent