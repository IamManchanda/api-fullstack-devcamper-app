const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

dotenv.config({
  path: "./config/config.env",
});
const { NODE_ENV, PORT = 5000, MONGO_URI } = process.env;

const connectDB = require("./connect-db");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const bootcampsRoute = require("./routes/bootcamps");
const coursesRoute = require("./routes/courses");
const errorHandler = require("./middlewares/error");

connectDB(MONGO_URI);

const app = express();
app.use(express.json());
app.use(cookieParser());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/auth/admin/users", usersRoute);
app.use("/api/v1/bootcamps", bootcampsRoute);
app.use("/api/v1/courses", coursesRoute);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold),
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  server.close(() => process.exit(1));
});
