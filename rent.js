import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/carRental';

const dbName = 'carRental';

let client;
let mongodb;

const connectMongoDB = async () => {
  try {
    client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    mongodb = client.db(dbName);

    console.log('MongoDB connected successfully to the database:', dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export { mongodb, connectMongoDB };
