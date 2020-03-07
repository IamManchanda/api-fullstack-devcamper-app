const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a valid password"],
    minlength: [6, "Password should have minimum length of 6 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordFinish: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", userSchema);
