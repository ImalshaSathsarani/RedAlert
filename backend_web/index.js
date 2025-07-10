const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRouter = require("./routers/authroutes");

const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const adminRouter = require("./routers/admin");

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.listen(process.env.PORT, () => {
  console.log("listening....");
});

const bloodRequestRoutes = require("./routers/requestroutes");
app.use("/api/request", bloodRequestRoutes);

const hospitalRoutes = require("./routers/hospitalroutes");
app.use("/api/hospital", hospitalRoutes);

const communityroutes = require("./routers/communityroutes");
app.use("/api/community", communityroutes);

const dashboardRoutes = require("./routers/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);
