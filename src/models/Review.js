const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review."],
    maxLength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

reviewSchema.index(
  {
    bootcamp: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

module.exports = model("Review", reviewSchema);
