

import { ObjectId } from 'mongodb'; 

// Define the Car schema
const carSchema = {
  _id: {
    type: ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  price_per_day: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  steering_type: {
    type: String,
    required: true,
  },
  number_of_seats: {
    type: Number,
    required: true,
  },
};


const Car = (db) => db.collection('cars');
export default Car;
