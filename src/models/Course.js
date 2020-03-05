const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title."],
  },
  description: {
    type: String,
    required: [true, "Please add a course description."],
  },
  weeks: {
    type: Number,
    required: [true, "Please add Number of weeks of the course."],
  },
  tuition: {
    type: Number,
    required: [true, "Please add Cost of the tuition of the course."],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill."],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
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
});

module.exports = model("Course", courseSchema);
