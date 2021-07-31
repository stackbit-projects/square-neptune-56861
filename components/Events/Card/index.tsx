import React from 'react'
import { Root, Image, Title, Summary, Wrapper, Banner, ImageWrapper } from './Card.styles'

const EventCard = (props) => {
  const { item: { fields } } = props.renderingContext

  let bannerText = ""
  if (fields.status === "full") {
    bannerText = "Event capacity full"
  } else if (fields.status === "cancelled") {
    bannerText = "Event cancelled"
  }
  return (
    <React.Fragment>
      <Root>
        <ImageWrapper status={fields.status}>
          <Image src={fields["pod image"].url} alt={fields["pod image"].alt} />
        </ImageWrapper>
        {bannerText && <Banner status={fields.status}>{bannerText}</Banner>}
        <Wrapper>
          <Title><a href={fields.link.url}>{fields.title}</a></Title>
          <Summary>{fields["pod text"]}</Summary>
        </Wrapper>
      </Root>
    </React.Fragment>
  )
}

export default EventCard