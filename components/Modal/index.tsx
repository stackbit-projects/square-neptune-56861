import React from 'react'
import { Root, Wrapper } from './Modal.styles'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  thankYouPage: boolean
}

export const Modal = (props: ModalProps) => {
  React.useEffect(() => {
    if (props.open) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }, [props.open])

  if (!props.open) {
    return null
  }

  return (
    <React.Fragment>
      <Root >
        <Wrapper thankYouPage={props.thankYouPage}>
          {props.children}
        </Wrapper>
      </Root>
    </React.Fragment>
  )
}