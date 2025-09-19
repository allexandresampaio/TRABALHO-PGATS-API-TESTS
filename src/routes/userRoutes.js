const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.get('/', authenticateToken, userController.getAll);

module.exports = router;