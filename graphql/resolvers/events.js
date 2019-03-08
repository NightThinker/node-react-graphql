const User = require('../../models/user')
const Event = require('../../models/event')
const { transformEvent } = require('./merge')


module.exports = {
  events: async () => {
    try{
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event)
      })
    } catch(err) {
        throw err
    }
  },
  createEvent: async ({ eventInput }, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: eventInput.date,
      creator: '5c7ded9f2bfcc70b98f9dffd'
    })
    let createdEvent;
    try{
      const result = await event.save()
      createdEvent =  transformEvent(result)
      const creator = await User.findById('5c7ded9f2bfcc70b98f9dffd')
      
      if(!creator) {
        throw new Error('User not found.')
      }
      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent

    } catch(err) {
      throw err
    }
  },
}