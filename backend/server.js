const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const calculatorRoutes = require('./routes/calculatorRoutes');
const userRoutes = require('./routes/userRoutes');

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FitCalc API is running', timestamp: new Date() });
});

// Mount routes
app.use('/api/calculators', calculatorRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`FitCalc server is running on port ${PORT}`);
});

module.exports = app;
