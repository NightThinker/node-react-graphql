import React from 'react'
import styled from 'styled-components'

const Control = styled.div`
  text-align: center;
  padding: 0.5rem;
`

const Button = styled.button`
  font: inherit;
  border: none;
  background: transparent;
  color: ${props => props.active ? "#01d1d1" : "#000"};
  padding: 0.25rem 1rem;
  border-bottom: 2px solid  ${props => props.active ? "#01d1d1" : "transparent"};
  &:focus {
    outline: none;
  }
`

const bookingControls = props => {
  return (
    <Control>
      <Button active={props.activeOutputType === 'list'} onClick={props.onChange.bind(this, 'list')}>List</Button>
      <Button active={props.activeOutputType === 'chart'} onClick={props.onChange.bind(this, 'chart')}>Chart</Button>
    </Control>
  )
}

export default  bookingControls