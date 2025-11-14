const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'University Landing Page API',
    status: 'running',
    endpoints: {
      universities: '/api/university/:id',
      courses: '/api/courses/:universityId',
      fees: '/api/fees/:courseId'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;