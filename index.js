import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; 
import authRoutes from './routes/authRoutes.js'; 
import carRoutes from './routes/carRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config(); 

const app = express();

// Middleware setup
app.use(bodyParser.json()); 
app.use(cors()); 

// Connect to MongoDB and then set up the routes
const startServer = async () => {
  try {
    await connectDB(); 

    // Define the routes
    app.use('/api/auth', authRoutes); 
    app.use('/api/cars', carRoutes); 

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
  }
};

startServer();
