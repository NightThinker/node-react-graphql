import React from 'react'
import styled from 'styled-components'

import BookingItem from './BookingItem/BookingItem'

const BookingList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 40rem;
  max-width: 90%;
`


const bookingList = (props) => (
  <BookingList>
    {props.bookings.map((booking) => {
      return (
        <BookingItem 
          key={booking._id}
          bookingId={booking._id}
          title={booking.event.title}
          createdAt={booking.createdAt}
          onDeleteBook={props.onDelete}
        />
      )
    })}
  </BookingList>
)

export default bookingList
