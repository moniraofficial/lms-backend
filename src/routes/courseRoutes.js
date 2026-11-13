const express = require('express');
const router = express.Router();
const { getDB } = require('../config/db');


router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const courses = await db.collection('courses').find({}).toArray();
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message,
    });
  }
});

module.exports = router;