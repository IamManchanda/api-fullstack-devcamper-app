const crypto = require("crypto");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TOKEN_FINISH } = process.env;

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
  password: {
    type: String,
    required: [true, "Please add a valid password"],
    minlength: [6, "Password should have minimum length of 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordFinish: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function saveBcryptPasswordHandler(next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.readSignedJwtToken = function readSignedJwtToken() {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_TOKEN_FINISH,
  });
};

userSchema.methods.matchPassword = async function matchPassword(
  enteredPassword,
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.readResetPasswordToken = function readResetPasswordToken() {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordFinish = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = model("User", userSchema);
