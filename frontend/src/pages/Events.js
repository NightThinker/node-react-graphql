import React, { Component } from 'react'
import styled from 'styled-components'

import AuthContext from '../context/auth-context'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'

//styled
import { Button } from '../components/Styled/GlobalStyled'
import { Control } from '../components/Styled/FormStyled'

const EventControl = styled.div`
  text-align: center;
  border: 1px solid #01d1d1;
  padding: 1rem;
  width: 30rem;
  max-width: 80%;
  margin: 2rem auto;
`

const EventList = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`

const EventListItem = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #01d1d1;
`

class EventsPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props)
    this.titleElRef = React.createRef()
    this.priceElRef = React.createRef()
    this.dateElRef = React.createRef()
    this.descriptionElRef = React.createRef()
    this.state = {
      creating: false,
      events: []
    }
  }

  componentDidMount() {
    this.fetchEvents()
  }

  startCreateEventHandler = () => {
    this.setState({creating: true})
  }

  modalConfirmHandler = () => {
    this.setState({creating: false})
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if(
      title.trim().length === 0 || 
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0 
    ) {
      return;
    }
    const event = {
      title: title, 
      price: price, 
      date: date, 
      description: description
    }
    const requestBody = {
      query: ` 
      mutation {
        createEvent(eventInput: {
          title: "${title}"
          description: "${description}"
          price: ${price}
          date: "${date}"
        })  {
          _id
          title
          description
          date
          price
          creator {
            _id
            email
          }
        }
      }
      `
    }

    const token = this.context.token

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res.status)
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      this.fetchEvents()
    })
    .catch(err => {
      console.log(err)
    })
  }

  modalCancelHandler = () => {
    this.setState({creating: false})
  }

  fetchEvents() {
    const requestBody = {
      query: ` 
        query {
          events {
            _id
            title
            date
            description
            price
            creator {
              _id
              email
              createdEvents {
                title
              }
            }
          }
        }
      `
    }

    const token = this.context.token

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.status)
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      const events = resData.data.events
      this.setState({events: events})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    const eventList = this.state.events.map(event => {
      return <EventListItem key={event._id}>{event.title}</EventListItem>
    })
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop/>}
        {this.state.creating && <Modal title="Add Event" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
          <form>
            <Control>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={this.titleElRef}/>
            </Control>
            <Control>
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={this.priceElRef}/>
            </Control>
            <Control>
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={this.dateElRef}/>
            </Control>
            <Control>
              <label htmlFor="description">Description</label>
              <textarea  id="description" rows="4" ref={this.descriptionElRef} />
            </Control>
          </form>
        </Modal>}
        {this.context.token && (
          <EventControl>
            <p>Share your own Events!</p>
            <Button onClick={this.startCreateEventHandler}>Create Event</Button>
          </EventControl>
        )}
        <EventList>
          {eventList}
        </EventList>
      </React.Fragment>
    )
  }
}

export default EventsPage
