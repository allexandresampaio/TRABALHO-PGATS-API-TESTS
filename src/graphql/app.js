const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const jwtMiddleware = require('./jwtMiddleware');

const app = express();
app.use(express.json());
app.use(jwtMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ token: req.token })
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app });
}

startApollo();

module.exports = app;
