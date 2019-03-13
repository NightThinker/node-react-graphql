import React, { Component } from 'react'

import Spinner from '../components/Spinner/Spiner'
import AuthContext from '../context/auth-context'
import BookingList from '../components/Booking/BookingList/BookingList'
import BookingChart from '../components/Booking/BookingChart/BookingChart'
import BookingControls from '../components/Booking/BookingControls/BookingControls'

class BookingsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      bookings: [],
      outputType: 'list'
    }
  }
  static contextType = AuthContext

  componentDidMount () {
    console.log(this.state.bookings)
    this.fetchBookings()
  }

  fetchBookings () {
    this.setState({ isLoading: true })
    const requestBody = {
      query: ` 
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      `
    }

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
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
				console.log('TCL: BookingsPage -> fetchBookings -> resData', resData)
        const bookings = resData.data.bookings
				console.log('TCL: BookingsPage -> fetchBookings -> bookings', bookings)
        this.setState({ bookings: bookings, isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  deleteBookingHandler = (bookingId) => {
    this.setState({ isLoading: true })
    const requestBody = {
      query: ` 
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId
      }
    }

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
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
          const updateBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId
          })
          return { bookings: updateBookings, isLoading: false }
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  changeOutputTypeHandler = (outputType) => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' })
    } else {
      this.setState({ outputType: 'chart' })
    }
  }

  render () {
    let content = <Spinner />
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingControls 
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === 'list' ? (
              <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} />
            ) : (
              <BookingChart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )
  }
}

export default BookingsPage
