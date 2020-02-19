const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const colors = require("colors");

dotenv.config({
  path: "./config/config.env",
});
const { NODE_ENV, PORT = 5000, MONGO_URI } = process.env;

const connectDB = require("./connect-db");
const bootcampsRoute = require("./routes/bootcamps");

connectDB(MONGO_URI);
const app = express();
app.use(bodyParser.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcampsRoute);

const server = app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold),
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  server.close(() => process.exit(1));
});
