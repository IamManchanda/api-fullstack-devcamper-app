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

courseSchema.statics.calculateAverageCost = async function calculateAverageCost(
  bootcampId,
) {
  const arr = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId,
      },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: {
          $avg: "$tuition",
        },
      },
    },
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(arr[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.error(error);
  }
};
courseSchema.post("save", async function calculateAverageCostAfterSave() {
  await this.constructor.calculateAverageCost(this.bootcamp);
});
courseSchema.pre("remove", async function calculateAverageCostBeforeRemove() {
  await this.constructor.calculateAverageCost(this.bootcamp);
});

module.exports = model("Course", courseSchema);
