const fs = require("fs");
const { connect } = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});
const { MONGO_URI } = process.env;

const Bootcamp = require("./models/Bootcamp");

connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`),
  "utf-8",
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
