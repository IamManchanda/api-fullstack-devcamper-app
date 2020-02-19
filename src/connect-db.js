const { connect } = require("mongoose");

const connectDB = async uri => {
  const conn = await connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = connectDB;
