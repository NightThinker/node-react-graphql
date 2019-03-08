import React, { Component } from 'react'
import styled from 'styled-components'

import { Button } from '../components/Styled/GlobalStyled'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'

const EventControl = styled.div`
  text-align: center;
  border: 1px solid #01d1d1;
  padding: 1rem;
  width: 30rem;
  max-width: 80%;
  margin: 2rem auto;
`

class EventsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creating: false
    }
  }

  startCreateEventHandler = () => {
    this.setState({creating: true})
  }

  modalConfirmHandler = () => {
    this.setState({creating: false})
  }

  modalCancelHandler = () => {
    this.setState({creating: false})
  }

  render () {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop/>}
        {this.state.creating && <Modal title="Add Event" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
          <p>Modal Content</p>
        </Modal>}
        <EventControl>
          <p>Share your own Events!</p>
          <Button onClick={this.startCreateEventHandler}>Create Event</Button>
        </EventControl>
      </React.Fragment>
    )
  }
}

export default EventsPage
