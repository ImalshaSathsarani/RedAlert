// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const http = require('http');

// // Import middleware and handlers
// const { protect } = require('./middleware/authMiddleware');
// // const { corsOption } = require('./middleware/corsMiddleware'); // Optional custom CORS
// // If you're not using a custom config, just use `cors()` below

// // Import DB connection
// require('./config/db')();

// dotenv.config();

// const app = express();

// const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: '*', // Replace with frontend origin if needed
//     methods: ['GET', 'POST'],
//   }
// });

// const connectedUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("New client connected", socket.id);

//   socket.on("register", (userId) => {
//     console.log("Registering user:", userId);
//     connectedUsers.set(userId, socket.id);
//   });

//   socket.on("disconnect", () => {
//     for (const [userId, sockId] of connectedUsers.entries()) {
//       if (sockId === socket.id) {
//         connectedUsers.delete(userId);
//         break;
//       }
//     }
//     console.log("Client disconnected", socket.id);
//   });
// });

// // Make available in routes/controllers
// app.set("io", io);
// app.set("connectedUsers", connectedUsers);


// // Middleware
// app.use(express.json()); // Parse JSON
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// // CORS configuration
// app.use(cors({
//     origin: '*', // Allow all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// })); // Use basic CORS (or cors(corsOption) if defined)
// app.use(morgan('dev')); // HTTP request logging

// // Basic Route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Routes
// app.use('/api/auth', require('./routes/donor/authRoutes'));
// app.use('/api/donor/profile', require('./routes/donor/userRoutes')); // Changed from /api/users to /api/donor/profile
// app.use('/api/donor/eligibility', require('./routes/donor/eligibilityRoutes'));
// app.use('/api/donor/posts', require('./routes/donor/donationPostRoutes'));
// app.use('/api/community',require('./routes/communityRoutes'))
// app.use('/api/chatbot', require('./routes/chatRoutes'));
// const eligibilityRoutes = require('./routes/eligibilityRoute');
// app.use('/api/eligibility', eligibilityRoutes);
// const notificationRoutes = require("./routes/notificationRoutes");
// app.use("/api/notifications",notificationRoutes)
// const requestRoutes = require("./routes/requestRoutes");
// app.use("/api/requests",requestRoutes)


// // app.use('/api/requests', require('./routes/bloodRequestRoutes'));
// // app.use('/api/notifications', require('./routes/notificationRoutes'));

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server Error' });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// const HOST = '0.0.0.0';

// // Start server
// const server = app.listen(PORT, HOST, () => {
//     console.log(`Server running on http://${HOST}:${PORT}`);
// });
// // Remove duplicate server creation

// // Socket.io (if needed in the future)
// // const io = require('socket.io')(server, { cors: { origin: '*' } });
// // require('./sockets/socketHandler')(io);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

dotenv.config();
require('./config/db')(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/donor/authRoutes'));
app.use('/api/donor/profile', require('./routes/donor/userRoutes'));
app.use('/api/donor/eligibility', require('./routes/donor/eligibilityRoutes'));
app.use('/api/donor/posts', require('./routes/donor/donationPostRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/chatbot', require('./routes/chatRoutes'));
app.use('/api/eligibility', require('./routes/eligibilityRoute'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Create HTTP server and attach socket.io AFTER routes and middleware
const server = http.createServer(app);

// Now you can attach Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("register", (userId) => {
    console.log("Registering user:", userId, " => socket:", socket.id);
    connectedUsers.set(userId, socket.id);
     console.log("📡 Connected Users Map:", connectedUsers);
  });

  socket.on("disconnect", () => {
    for (const [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    console.log("Client disconnected", socket.id);
  });
});

// Make Socket.IO accessible in routes/controllers
app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Start server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
