const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')
const { sequelize } = require('./models')

// const { typeDefs, resolvers } = require('./schema');
const schema = require('./schema/query/query')
const resolvers = require('./schema/resolvers/resolvers')

const typeDefs = gql(schema)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    sequelize,
  },
})

console.log(sequelize.models)
const app = express()

app.get('/', (req, res) => {
  res.end('<h1> Test server </h1>')
})

app.use(cors(), bodyParser.json())

server.applyMiddleware({ app })

sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  app.listen({ port: config.port })
  console.log(`Server started at port ${config.port}`)
})
