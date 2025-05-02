import Trip from '../models/Trip.js';

export const addTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
