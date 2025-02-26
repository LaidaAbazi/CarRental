import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb'; 
import { getUsersCollection } from '../config/db.js';

dotenv.config();

// User registration
const register = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    const usersCollection = getUsersCollection(); 

    // Check if the username or email already exists
    const existingUser = await usersCollection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { fullName, email, username, password: hashedPassword };
    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usersCollection = getUsersCollection(); // Get the collection after connection is established

    // Find the user by username
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const usersCollection = getUsersCollection(); 

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { fullName, username, email } = user;
    res.status(200).json({ fullName, username, email });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

export { register, login, getUserProfile };
