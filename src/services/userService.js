const { users } = require('../models/userModel');

function registerUser({ username, password }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  // Adiciona a propriedade 'curso' ao usuário
  const user = { username, password, curso: null };
  users.push(user);
  return user;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

function getAllUsers() {
  return users;
}

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
};