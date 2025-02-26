// routes/carRoutes.js

import express from 'express';
import { getCars } from '../controllers/carController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get rental cars with filters (price, year, color, steering type, number of seats)
router.get('/rental-cars', getCars);

export default router;
