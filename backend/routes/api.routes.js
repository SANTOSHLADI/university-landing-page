const express = require('express');
const router = express.Router();
const universityController = require('../controllers/university.controller');

// University routes
router.get('/university/:id', universityController.getUniversity);
router.get('/courses/:universityId', universityController.getCourses);
router.get('/fees/:courseId', universityController.getFees);

module.exports = router;