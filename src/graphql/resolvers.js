const userService = require('../../src/services/userService');
const courseService = require('../../src/services/courseService');
const authService = require('../../src/services/authService');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_, { username }) => userService.getUserByUsername(username)
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const { token, user } = await authService.login(username, password);
      return { token, user };
    },
    register: async (_, { username, password }) => {
      return await userService.register(username, password);
    },
    enroll: async (_, { username, curso }, context) => {
      if (!context.token) throw new Error('Authentication required');
      jwt.verify(context.token, process.env.JWT_SECRET);
      return await courseService.enroll(username, curso);
    }
  }
};
