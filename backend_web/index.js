// const express = require("express");
// const helmet = require("helmet");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const http = require('http');
// const socketIO = require('socket.io');

// const authRouter = require("./routers/authroutes");
// require("dotenv").config();

// const app = express();
// app.use(helmet());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from your React app
//     credentials: true, // If you're using cookies or authentication
//   })
// );

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const adminRouter = require("./routers/admin");

// app.use("/api/auth", authRouter);
// app.use("/api/admin", adminRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from the server" });
// });

// app.listen(process.env.PORT, () => {
//   console.log("listening....");
// });

// const bloodRequestRoutes = require("./routers/requestroutes");
// app.use("/api/request", bloodRequestRoutes);

// const hospitalRoutes = require("./routers/hospitalroutes");
// app.use("/api/hospital", hospitalRoutes);

// const communityroutes = require("./routers/communityroutes");
// app.use("/api/community", communityroutes);

// const dashboardRoutes = require("./routers/dashboardRoutes");
// app.use("/api/dashboard", dashboardRoutes);

// const notificationRoutes = require("./routers/notificationroutes");
// app.use('/api/notifications', notificationRoutes);
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");

require("dotenv").config();



const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // your React web or React Native dev IP
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store connected users by their userId
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    for (const [userId, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

// Make `io` and `connectedUsers` available in routes
app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Middleware

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // Your web/React frontend
    credentials: true
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

// Routes
const authRouter = require("./routers/authroutes");
const adminRouter = require("./routers/admin");
const bloodRequestRoutes = require("./routers/requestroutes");
const hospitalRoutes = require("./routers/hospitalroutes");
const communityroutes = require("./routers/communityroutes");
const dashboardRoutes = require("./routers/dashboardRoutes");
const notificationRoutes = require("./routers/notificationroutes");

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/request", bloodRequestRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/community", communityroutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/donors", require("./routers/donorRoutes"))

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

// Start server (note: use `server.listen`, not `app.listen`)
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


