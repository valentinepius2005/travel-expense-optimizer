import express from 'express';
import { addTrip } from '../controllers/tripController.js';

const router = express.Router();

router.post('/add', addTrip);

export default router;
