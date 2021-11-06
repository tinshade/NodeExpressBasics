const express = require("express");
const app = express();
const morgan = require("morgan");
const { logger, authorize } = require("./utils");

//!SELF-MADE MIDDLEWARE
app.use([logger, authorize]); //*Assings middleware to all routes

//!THIRD PARTY MIDDLEWARE
app.use(morgan("dev")); //*OPTIONS: tiny, short, dev,combined,common

app.get("/", (req, res) => {
  res.end("Hello Middleware");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
