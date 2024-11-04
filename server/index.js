const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user_routes = require('./routes/user');
const request_routes = require('./routes/request');
const dashboard_routes = require('./routes/dashboard');
const { verifyToken } = require('./middleware/VerifyToken');

// Load environment variables from .env file
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.VITE_ALLOW_ORIGIN || 'https://notify-chat-application-git-development-rohandagale28s-projects.vercel.app',
  credentials: true,
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Set up MongoDB connection
require('./db');

// User Routes
app.use('/', user_routes);

// Dashboard Routes
app.use('/dashboard', verifyToken, dashboard_routes);

// Request Routes
app.use('/request', verifyToken, request_routes);

// Home Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running healthy' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
