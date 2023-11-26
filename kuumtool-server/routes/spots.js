// routes.js
const express = require('express');
const router = express.Router();
const { getData, updateVolume, updateMovement, updateSimulation} = require('../models/Spot'); // Import the model function

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

router.get('/:id/volume/:volume', async (req, res) => {
  const spotId = req.params.id;
  const volume = req.params.volume;
  try {
    await updateVolume(spotId, volume);
    res.json({ success: true, message: 'Volume updated successfully.' });
  } catch (error) {
    console.error('Error updating volume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id/movement/:movement', async (req, res) => {
  const spotId = req.params.id;
  const movement = req.params.movement;

  try {
    await updateMovement(spotId, movement);
    res.json({ success: true, message: 'Movement updated successfully.' });
  } catch (error) {
    console.error('Error updating movement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id/simulated/:value', async (req, res) => {
  const spotId = req.params.id;
  const value = req.params.value;
  if (value !== '1' && value !== '0') {
    res.status(400).json({ error: 'Use tinyint 0 or 1 to turn off or on simulation' });
    return;
  }

  try {
    await updateSimulation(spotId, value);
    res.json({ success: true, message: 'Simulation updated successfully.' });
  } catch (error) {
    console.error('Error updating simulation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
