const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schame/index')
const graphqlResolvers = require('./graphql/resolvers/index')

const app = express()


app.use(bodyParser.json())




app.use(
  '/graphql', 
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
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