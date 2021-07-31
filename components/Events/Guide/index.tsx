import React from 'react'
import { ContinueButton } from '../../Button/Button.styles'
import { Root, Title, Summary, Image } from './Guide.styles'

const EventGuide = (props) => {
  const { item: { fields } } = props.renderingContext
  
  return (
    <React.Fragment>
      <Root>
          <Title>{fields.title}</Title>
          <Image src={fields.image.url} alt={fields.image.alt}/>
          <Summary>{fields.text}</Summary>
          <ContinueButton>Download</ContinueButton>
      </Root>
    </React.Fragment>
  )
}

export default EventGuide