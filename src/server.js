const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bootcampsRoutes = require("./routes/bootcamps");

dotenv.config({
  path: "./config/config.env",
});
const { NODE_ENV, PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/bootcamps", bootcampsRoutes);

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`),
);
