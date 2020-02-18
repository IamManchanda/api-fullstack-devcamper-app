const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const bootcampsRoute = require("./routes/bootcamps");

dotenv.config({
  path: "./config/config.env",
});
const { NODE_ENV, PORT } = process.env;

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcampsRoute);

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`),
);
