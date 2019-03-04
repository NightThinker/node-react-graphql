const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql', 
  graphqlHttp({
    schema: buildSchema(`
      type RootQuery {
        events: [String!]!
      }

      type RootMutation {
        createEvent(name: String!): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return ['Romatic Cooking', 'Sailing', 'All-Night Coding']
      },
      createEvent: ({ name }, req) => {
        return name
      }
    },
    graphiql: true
  })
)

// app.get('/',(req, res, next) => {
//   res.send('Hlloe')
// })

app.listen(4000)