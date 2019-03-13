import React from 'react'
import styled from 'styled-components'

import EventItem from './EventItem/EventItem'

const EventList = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`

const eventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventItem 
        key={event._id} 
        eventId={event._id} 
        title={event.title} 
        price={event.price}
        date={event.date}
        description={event.description}
        userId={props.authUserId} 
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
      )
  })
  return <EventList>{events}</EventList>
}

export default eventList
