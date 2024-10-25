const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
app.use(cors());

// json parsing middleware
app.use(express.json());

// Morgan for API logs(response time, endpoints hit and response codes)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Basic Routes setup

app.use("/api/v1/signup", authRouter);
app.use("/api/v1/getUserDetails", userRouter);
// app.use("/api/v1/login");
// app.use("/api/v1/riders");

module.exports = app;
