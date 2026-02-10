const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

// Middleware
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Sneaker Warehouse API v1.0' });
});

// Register All API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route tidak ditemukan' });
});

module.exports = app;