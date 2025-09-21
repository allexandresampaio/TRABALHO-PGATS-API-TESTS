const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    username: String!
    curso: String
  }

  type Course {
    id: Int!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    courses: [Course]
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, password: String!): User
    enroll(username: String!, courseId: Int!): User
  }
`;

module.exports = typeDefs;
