# Car Rental API

This is a simple REST API built using Node.js, Express.js, and MongoDB for a car rental system. The API allows users to register, login, view their profile, and browse rental cars.

1.Clone the Repository

git clone https://github.com/your-username/carrent.git

cd carrent

2. Install Dependencies
   
Run the following command to install the required dependencies:

npm install

4. Set Up Environment Variables
   
Create a .env file in the root directory of the project and add the following environment variables:

Environment Variables

MONGO_URI: MongoDB connection string (default: mongodb://localhost:27017)

JWT_SECRET: Secret key for signing JWT tokens.

PORT: The port for the server to run on (default: 5000).

4. Start the Application
   
Run the following command to start the application:

npm start

This will start the server at http://localhost:5000.

API Endpoints

Here are the available API endpoints you can test:

1. User Registration
   
POST /api/auth/register

Request Body:

{
  "fullName": "Test test",
  "email": "test@example.com",
  "username": "test_test1",
  "password": "password"
}

2. User Login
   
POST /api/auth/login

Request Body:

{
  "username": "test_test1",
  "password": "password"
}

3. Get User Profile (Authenticated)

GET /api/auth/my-profile

Headers:

Authorization: Bearer <JWT Token>

4. Get Rental Cars
   
GET /api/cars/rental-cars

Query Parameters:

year: Filter by year 

color: Filter by color 

steering_type: Filter by steering type 

number_of_seats: Filter by number of seats 


Authentication

JWT authentication is used for the /my-profile endpoint. After logging in, you will receive a token. Include this token in the Authorization header to access protected routes.

Testing Steps:

Register a User: Send a POST request to /api/auth/register with the required fields.

Login: Send a POST request to /api/auth/login with the username and password.

Get Profile: Send a GET request to /api/auth/my-profile with the JWT token in the Authorization header.

Browse Rental Cars: Send a GET request to /api/cars/rental-cars with optional query parameters to filter the cars.
