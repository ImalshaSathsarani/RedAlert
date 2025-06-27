const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

// Import middleware and handlers
// const { corsOption } = require('./middleware/corsMiddleware'); // Optional custom CORS
// If you're not using a custom config, just use `cors()` below

// Import DB connection
require('./config/db')();

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Use basic CORS (or cors(corsOption) if defined)
app.use(morgan('dev')); // HTTP request logging

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/donor/authRoutes'));
app.use('/api/users', require('./routes/donor/userRoutes'));
app.use('/api/eligibility', require('./routes/donor/eligibilityRoutes'));
app.use('/api/donor/posts', require('./routes/donor/donationPostRoutes'));
// app.use('/api/requests', require('./routes/bloodRequestRoutes'));
// app.use('/api/notifications', require('./routes/notificationRoutes'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io (if needed in the future)
// const io = require('socket.io')(server, { cors: { origin: '*' } });
// require('./sockets/socketHandler')(io);
