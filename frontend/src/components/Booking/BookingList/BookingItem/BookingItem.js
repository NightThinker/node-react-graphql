import React from 'react'
import styled from 'styled-components'

import { Button } from '../../../Styled/GlobalStyled'

const BookingItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #01d1d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ItemData = styled.div``
const ItemActions = styled.div``

const bookingItem = props => (
  <BookingItem>
    <ItemData>
      {props.title} - {new Date(props.createdAt).toLocaleDateString()}
    </ItemData>
    <ItemActions>
      <Button onClick={props.onDeleteBook.bind(this, props.bookingId)}>Cancel</Button>
    </ItemActions>

  </BookingItem>
)

export default bookingItem