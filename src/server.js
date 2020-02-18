const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const loggerMiddleware = require("./middlewares/logger");
const bootcampsRoute = require("./routes/bootcamps");

dotenv.config({
  path: "./config/config.env",
});
const { NODE_ENV, PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use("/api/v1/bootcamps", bootcampsRoute);

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`),
);
