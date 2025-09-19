const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/enroll', authenticateToken, courseController.enroll);
router.get('/', authenticateToken, courseController.getAll);

module.exports = router;