const fs = require("fs");
const { connect } = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});
const { MONGO_URI } = process.env;

const User = require("./models/User");
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const Review = require("./models/Review");

connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`),
  "utf-8",
);
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`),
  "utf-8",
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`),
  "utf-8",
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`),
  "utf-8",
);

const importData = async () => {
  try {
    await User.create(users);
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await Review.create(reviews);
    console.log("Data Imported...".green);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await Review.deleteMany();
    console.log("Data Destroyed...".red);
    if (process.argv[2] === "-d") {
      process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};

const resetData = async () => {
  try {
    await destroyData();
    await importData();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
} else if (process.argv[2] === "-r") {
  resetData();
}
