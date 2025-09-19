const courseService = require('../services/courseService');

exports.enroll = (req, res) => {
  try {
    const user = courseService.enroll(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = (req, res) => {
  res.json(courseService.getAllCourses());
};