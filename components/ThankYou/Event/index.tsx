import { format, parse } from 'date-fns';
import React from 'react'
import AddToCalendar from '@culturehq/add-to-calendar';
import { FormStorageNames } from '../../../utils/constants';
import { ListText, Calendar, SummaryText, Root, ModalButton, InnerModal } from './ThankYou.styles';
import { Modal } from '../../Modal'

interface UserProps {
  firstname: string
  lastname: string
  email: string
  reference: string
  successfulPaymentFormNotUpdated: boolean
}

interface EventProps {
  title: string
  description: string
  location: string
  challenge: string
  dateTime: Date | null
  date: Date | null
}

const ThankYou = (props) => {
  const [user, setUser] = React.useState<UserProps | null>(null)
  const [event, setEvent] = React.useState<EventProps | null>(null)
  const [toggle, setToggle] = React.useState<boolean>(false)
  const { item: { fields } } = props.renderingContext

  React.useEffect(() => {
    setToggle(user?.successfulPaymentFormNotUpdated)
  }, [user?.successfulPaymentFormNotUpdated])

  React.useEffect(() => {
    const redirectFunc = () => {
      if (fields["fallback url"]) {
        window.location.href = fields["fallback url"]
      } else {
        const paths = window.location.pathname.split("/").filter(path => path)
        paths.pop()
        window.location.replace(`${window.location.origin}/${paths.join("/")}/`)
      }
    }

    if (fields["event page"]) {
      const storageData = JSON.parse(sessionStorage.getItem(fields["event page"]["id"]))
      if (!storageData) {
        redirectFunc()
      } else {
        setUser({
          firstname: storageData[FormStorageNames.Firstname],
          lastname: storageData[FormStorageNames.Lastname],
          email: storageData[FormStorageNames.Email],
          reference: storageData[FormStorageNames.PaymentReference],
          successfulPaymentFormNotUpdated: storageData[FormStorageNames.SuccessfulPaymentFormNotUpdated]
        })

        let eventDate = fields["event page"]["event date"]
        // 'Own Events' challenge dates are not returned by backend
        // see if there's a date in sessionStorage as fallback
        // these dates don't have a time element
        if (!eventDate) {
          eventDate = storageData[FormStorageNames.DateOfChallenge]
        }

        let parsedDate = null
        let parsedDateTime = null
        // TODO - pass dates around consistently as ISO timestamps
        if (eventDate) {
          if (eventDate.indexOf('/') > -1) {
            parsedDateTime = eventDate ? parse(eventDate, "MM/dd/yyyy h:mm:ss a", new Date()) : null
            parsedDate = parsedDateTime
          } else {
            parsedDate = eventDate ? parse(eventDate, "yyyy-MM-dd", new Date()) : null
          }
        }
        setEvent({
          title: fields["calendar title"],
          description: "",
          location: fields["event page"]["location"],
          challenge: storageData[FormStorageNames.Challenge],
          dateTime: parsedDateTime,
          date: parsedDate
        })
      }
    } else {
      redirectFunc()
    }
  }, [])

  if (!fields || !fields["event page"]) {
    console.log("No event data supplied")
    return null
  }

  if (!user || !event) {
    return (<p>Loading</p>)
  }

  let startsAtStr = ''
  let endsAtStr = ''
  let startsAtDateStr = ''
  let startsAtTimeStr = ''
  // @see useEffect() setEvent state
  if (event.dateTime) {
    startsAtStr = format(event.dateTime, "yyyy-MM-dd'T'HH:mm")
    endsAtStr = format(event.dateTime, "yyyy-MM-dd'T'HH:mm")
    startsAtDateStr = format(event.dateTime, "dd/MM/yyyy")
    startsAtTimeStr = format(event.dateTime, "h:mm a")
  } else if (event.date) {
    startsAtStr = format(event.date, "yyyy-MM-dd")
    endsAtStr = format(event.date, "yyyy-MM-dd")
    startsAtDateStr = format(event.date, "dd/MM/yyyy")
  }

  const handleModalButtonClick = () => {
    setToggle(!toggle)
    document.body.classList.remove("no-scroll")
    return toggle
  }

  return (
    <Root className="component">
      <p>{fields["confirmation text"]}</p>
      <h2>{fields["title"]}</h2>


      {toggle && (
        <Modal open={user?.successfulPaymentFormNotUpdated} thankYouPage>
          <InnerModal role="alert">
            <SummaryText modal>Well, this is paw-kward..</SummaryText>
            <SummaryText modal>
              Your payment was successful but we don't seem to have all of the information we need. There is no need to make another payment but please contact our Supporter Care Team on 0800 953 113 or via email <a href="mailto:guidedogs@guidedogs.org.uk">guidedogs@guidedogs.org.uk</a> so we can resolve this for you. Please quote the payment reference displayed below. </SummaryText>
            <SummaryText modal>Payment reference: {user.reference}</SummaryText>
            <ModalButton onClick={handleModalButtonClick} type='button' value="OK"/>
          </InnerModal>
        </Modal>
      )}

      <SummaryText dangerouslySetInnerHTML={{ __html: fields["summary"].replace("#EMAIL#", user.email) }} />

      <div>
        <ListText>Name: {user.firstname} {user.lastname}</ListText>
        
        {event.challenge && <ListText>Challenge: {event.challenge}</ListText>}
        {event.location && !event.challenge && <ListText>Where: {event.location}</ListText>}
        
        {startsAtDateStr && <ListText>Date: {startsAtDateStr}</ListText>}
        {startsAtTimeStr && <ListText gutter={true}>Time: {startsAtTimeStr}</ListText>}

        {user.reference &&
          <ListText>Payment reference: {user.reference}</ListText>
        }
      </div>
      {startsAtStr && endsAtStr &&
        <Calendar>
          <AddToCalendar
            children="Add to my calendar"
            event={{
              name: event.title,
              details: "",
              location: event.location,
              startsAt: startsAtStr,
              endsAt: endsAtStr,
            }}
          />
        </Calendar>
      }

    </Root>
  )
}

export default ThankYou