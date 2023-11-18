// routes.js
const express = require('express');
const router = express.Router();
const { getData } = require('../models/Spot'); // Import the model function

// Define a route to fetch data
router.get('/', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
