const express = require("express");
const morgan = require("morgan");
const app = express();

// json parsing middleware
app.use(express.json());

// Morgan for API logs(response time, endpoints hit and response codes)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

module.exports = app;
