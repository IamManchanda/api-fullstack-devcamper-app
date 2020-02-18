const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

const { NODE_ENV, PORT } = process.env;
app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`),
);
