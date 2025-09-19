const userService = require('../services/userService');

exports.register = (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = (req, res) => {
  // Retorna apenas nome e curso de cada usuário
  const users = userService.getAllUsers().map(u => ({ username: u.username, curso: u.curso }));
  res.json(users);
};