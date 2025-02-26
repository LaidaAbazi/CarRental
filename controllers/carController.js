
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
const url = 'mongodb://localhost:27017';
const dbName = 'carRental';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = client.db(dbName);
const carsCollection = db.collection('cars');

// Fetch all cars with optional filtering and sorting
const getCars = async (req, res) => {
  const { year, color, steering_type, number_of_seats, sortByPrice } = req.query;

  try {
    const filters = {};

    if (year) filters.year = parseInt(year);
    if (color) filters.color = color.toLowerCase();
    if (steering_type) filters.steering_type = steering_type.toLowerCase();
    if (number_of_seats) filters.number_of_seats = parseInt(number_of_seats);

    const sortOption = sortByPrice ? { price_per_day: sortByPrice === 'desc' ? -1 : 1 } : { price_per_day: 1 };

    const cars = await carsCollection.find(filters).sort(sortOption).toArray();

    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars found with the given filters.' });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};

export { getCars };
