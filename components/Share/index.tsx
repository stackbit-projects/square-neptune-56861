import * as Yup from 'yup'
import React from 'react'
import { Root, ShareLink, ShareLinkWrapper, Heading, Title } from './Share.styles'
import { InlineStyledButton, InlineStyledInput, InlineWrapper } from '../Form/Form.styles'

interface ShareProps {
  title: string
  link: string
  message?: string
}

const Share = (props: ShareProps) => {
  const textRef = React.useRef(null)
  const [email, setEmail] = React.useState<string>("")
  const [emailError, setEmailError] = React.useState<string | null>(null)

  const onCopy = () => {
    textRef.current.select()
    document.execCommand('copy');
  }

  const onEmail = async () => {
    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required()
    })

    try {
      await validationSchema.validate({ email })
      setEmailError(null)
      // @TODO send email
    } catch (error) {
      setEmailError(error.errors[0])
    }
  }

  return (
    <Root>
      <Title>{props.title}</Title>

      <InlineWrapper>
        <label htmlFor="share-link">Link:</label>
        <InlineStyledInput
          ref={textRef}
          type="text"
          id="share-link"
          name="share-link"
          value={props.link}
          className="inline-input"
        />
        <InlineStyledButton type="button" onClick={onCopy}>Copy Link</InlineStyledButton>
      </InlineWrapper>

      <Heading>Social</Heading>

      <ShareLinkWrapper>
        <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${props.link}`} target="_blank">
          <img src="/images/Facebook.svg" />
          <span>Facebook</span>
        </ShareLink>
        <ShareLink href={`https://twitter.com/intent/tweet?text=${props.link}`} target="_blank">
          <img src="/images/Twitter.svg" />
          <span>Twitter</span>
        </ShareLink>
        <ShareLink href={`https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodeURIComponent(props.link)}`} target="_blank">
          <img src="/images/LinkedIn.svg" />
          <span>LinkedIn</span>
        </ShareLink>
      </ShareLinkWrapper>

      <InlineWrapper>
        <label htmlFor="email-link">Email address *</label>
        <InlineStyledInput
          type="text"
          id="email-link"
          name="email-link"
          value={email}
          className="inline-input"
          onChange={e => {
            setEmailError(null)
            setEmail(e.target.value)
          }}
        />
        <InlineStyledButton type="button" onClick={onEmail} disabled={emailError || !email}>Email</InlineStyledButton>
      </InlineWrapper>
      {emailError && <span className="field-validation-error">{emailError}</span>}

    </Root>
  )
}

export default Share