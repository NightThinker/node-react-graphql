const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const Event = require('./models/event')

const app = express()


app.use(bodyParser.json())


app.use(
  '/graphql', 
  graphqlHttp({
    schema: buildSchema(`
      type Event{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      input EventInput {
        title: String!
        description: String!
        price: Float!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return Event
          .find()
          .then(events => {
            return events.map(event => {
              return { 
                ...event._doc ,
                _id: event._doc._id.toString()
              }
            })
          })
          .catch(err => {
            console.log(err)
            throw err
          })
      },
      createEvent: ({ eventInput }) => {
				// console.log('TCL: eventInput', eventInput)
        // const event = {
        //   _id: Math.random().toString(),
        //   title: eventInput.title,
        //   description: eventInput.description,
        //   price: +eventInput.price,
        //   date: new Date().toISOString(),
        // }
        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date()
        })
        return event
          .save()
          .then(result => {
            console.log(result)
            return {
              ...result._doc
            }
          })
          .catch(err => {
            console.log(err)
            throw err
          })
        
      }
    },
    graphiql: true
  })
)

mongoose
  .connect(`
    mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PEASSWORD}@cluster0-rnstb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true
  `)
  .then(() => {
    app.listen(4000)
  })
  .catch(err => console.log(err))