import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'carRental';

let client;
let db;
let usersCollection;

// Function to connect to MongoDB
const connectDB = async () => {
  if (db) {
    console.log('Already connected to MongoDB');
    return;
  }
  
  try {
    client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    db = client.db(dbName);
    usersCollection = db.collection('users');

    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

const getUsersCollection = () => {
  if (!db) {
    throw new Error('Database connection is not established');
  }
  return usersCollection;
};

export { connectDB, getUsersCollection };
