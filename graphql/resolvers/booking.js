const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformEvent, transformBooking } = require('./merge')


module.exports = {
  bookings: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const bookings = await Booking.find() 
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch(err) {
      throw err
    }
  },
  bookEvent: async ({ eventId }, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const fetchedEvent = await Event.findOne({ _id: eventId })
    const booking = new Booking({
      user: '5c7ded9f2bfcc70b98f9dffd',
      event: fetchedEvent
    });
    const result = await booking.save()
    return transformBooking(result)
  },
  cancelBooking: async ({ bookingId }, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const booking = await Booking.findById(bookingId) .populate('event')
      const event = transformEvent(booking._doc.event)
      await Booking.deleteOne({ _id: bookingId })
      return event
    } catch(err) {
      throw err
    }

  }
}