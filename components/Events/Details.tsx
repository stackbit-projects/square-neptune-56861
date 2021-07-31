import React from 'react'
import { format } from 'date-fns'
import { Info, Price, Summary, Heading, Root} from './Details.styles'

const EventDetails = (props) => {
  const { page: { fields: { capacity, eventDetails } }, item: { fields } } = props.renderingContext

  if (!eventDetails) {
    console.error('No event data supplied')
    return null
  }

  const fee = Number(eventDetails["registration fee"])

  return (
    <Root className="component">
      {!capacity && <Summary dangerouslySetInnerHTML={{__html: fields.summary }} />}
      <Heading>{fields.heading}</Heading>
      <Info>
        {eventDetails["event date"] && <span>{eventDetails["event date label"] ?? "When:"} {format(new Date(eventDetails["event date"]), 'iiii dd MMMM yyyy')}</span>}
        {eventDetails["location"] && <span>{eventDetails["location label"] ?? "Where:"} {eventDetails["location"]}</span>}
      </Info>
      <Info withoutGutter={true}>{eventDetails["registration fee label"] ?? "Registration fee:"}</Info>
      <Price>{!fee ? 'FREE' : `£${fee}`}</Price>
      <Summary dangerouslySetInnerHTML={{__html: eventDetails["registration info"] }} />
    </Root>
  )
}

export default EventDetails