import React, { Component } from 'react'
import styled from 'styled-components'

import AuthContext from '../context/auth-context'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import EventList from '../components/Events/EventList/EventList'
import Spiner from '../components/Spinner/Spiner'

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

class EventsPage extends Component {
  static contextType = AuthContext

  constructor (props) {
    super(props)
    this.titleElRef = React.createRef()
    this.priceElRef = React.createRef()
    this.dateElRef = React.createRef()
    this.descriptionElRef = React.createRef()
    this.state = {
      creating: false,
      events: [],
      isLoading: false,
      seletedEvent: null
    }
  }

  componentDidMount () {
    this.fetchEvents()
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true })
  }

  modalConfirmHandler = () => {
    this.setState({ creating: false })
    const title = this.titleElRef.current.value
    const price = +this.priceElRef.current.value
    const date = this.dateElRef.current.value
    const description = this.descriptionElRef.current.value

    if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
      return
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
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        console.log(res.status)
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updateEvents = [ ...prevState.events ]
          updateEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            date: resData.data.createEvent.date,
            description: resData.data.createEvent.description,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          })
          return {
            events: updateEvents
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  modalCancelHandler = () => {
    this.setState({ creating: false, seletedEvent: null })
  }

  fetchEvents () {
    this.setState({ isLoading: true })
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
            }
          }
        }
      `
    }

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.status)
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => {
        const events = resData.data.events
        this.setState({ events: events, isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  showDetailHandler = (eventId) => {
    this.setState(prevState => {
      const seletedEvent = prevState.events.find(e => e._id === eventId)
			console.log('TCL: EventsPage -> showDetailHandler -> seletedEvent', seletedEvent)
      return {seletedEvent: seletedEvent}
    })
  }
   
  bookEventHandler = () => {

  }

  render () {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.seletedEvent) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <Control>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </Control>
              <Control>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </Control>
              <Control>
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </Control>
              <Control>
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4" ref={this.descriptionElRef} />
              </Control>
            </form>
          </Modal>
        )}
        {this.state.seletedEvent && (
          <Modal
            title={this.state.seletedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText="Book"
          >
            <h1>{this.state.seletedEvent.title}</h1>
            <h2>${this.state.seletedEvent.price} - {new Date(this.state.seletedEvent.date).toLocaleDateString()}</h2>
            <p>{this.state.seletedEvent.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <EventControl>
            <p>Share your own Events!</p>
            <Button onClick={this.startCreateEventHandler}>Create Event</Button>
          </EventControl>
        )}
        {this.state.isLoading ? (
          <Spiner />
        ) : (
          <EventList 
            events={this.state.events} 
            authUserId={this.context.userId} 
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    )
  }
}

export default EventsPage
