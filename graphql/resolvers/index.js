const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/user')

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds} })
    .then(events => {
      return events.map(event => {
        return{
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        }
      })
    })
    .catch(err => {
      throw err
    })
}

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      }
    })
    .catch(err => {
      throw err
    })
}

module.exports = {
  events: () => {
    return Event
      .find()
      .then(events => {
        return events.map(event => {
          return { 
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator)
          }
        })
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  },
  createEvent: ({ eventInput }) => {
    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(),
      creator: '5c7ded9f2bfcc70b98f9dffd'
    })
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent =  {
          ...result._doc,
          _id: result._doc._id.toString(),
          date: new Date(result._doc.date).toISOString(),
          creator: user.bind(this, result._doc.creator)
        }
        return User.findById('5c7ded9f2bfcc70b98f9dffd')
        
      })
      .then(user => {
        if(!user) {
          throw new Error('User not found.')
        }
        user.createdEvents.push(event)
        return user.save()
      })
      .then(result => {
        return createdEvent
      })
      .catch(err => {
        console.log(err)
        throw err
      }) 
  },
  createUser: ({ userInput }) => {
    return User.findOne({ email: userInput.email})
      .then(user => {
        if(user) {
          throw new Error('User exists already.')
        }
        return bcrypt.hash(userInput.password, 12)
      })
      .then(hashedPassword => {
        const user = new User({
          email: userInput.email,
          password: hashedPassword
        })
        return user.save()
      })
      .then(result => {
        console.log(result)
        return {
          ...result._doc,
          password: null,
          _id: result.id
        }
      })
      .catch(err => {
        throw err
      })
  }
}