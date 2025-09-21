const userService = require('../../src/services/userService');
const courseService = require('../../src/services/courseService');
const authService = require('../../src/services/authService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo';

module.exports = {
  Query: {
    users: () => userService.getAllUsers(),
    user: (_, { username }) => userService.getUserByUsername(username),
    courses: () => courseService.getAllCourses(),
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await authService.login({ username, password });
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { username: user.username },
        SECRET,
        { expiresIn: '1h' }
      );
      return { token, user };
    },
    register: async (_, { username, password }) => {
      return await userService.registerUser({ username, password });
    },
    enroll: async (_, { username, courseId }, context) => {
      if (!context.token) throw new Error('Authentication required');
      jwt.verify(context.token, SECRET);
      return await courseService.enroll({ username, courseId });
    }
  }
};
