const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    curso: String
    favorecidos: [String]
    saldo: Float
  }


  type AuthPayload {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, password: String!): User
    enroll(username: String!, curso: String!): User
  }
`;

module.exports = typeDefs;
