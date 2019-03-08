import React from 'react'
import styled from 'styled-components'

import { Button } from '../../../Styled/GlobalStyled'

const EventListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #01d1d1;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #01d1d1;
  }
  h2 {
    margin: 0;
    font-size: 1rem;
    color: #7c7c7c;
  }
  p {
    margin: 0;
  }
`

const eventItem = props => (
  <EventListItem key={props.eventId}>
  <div>
    <h1>{props.title}</h1>
    <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
  </div>
  <div>
    {props.userId === props.creatorId 
      ? (<Button onClick={props.onDetail.bind(this, props.eventId)}>Detial</Button>)
      : (<p>Your the owner of this event</p>)
    }
  </div>
  </EventListItem>
)

export default eventItem