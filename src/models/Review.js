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

reviewSchema.statics.calculateAverageRating = async function calculateAverageRating(
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
        averageRating: {
          $avg: "$rating",
        },
      },
    },
  ]);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: arr[0].averageRating,
    });
  } catch (error) {
    console.error(error);
  }
};
reviewSchema.post("save", async function calculateAverageRatingAfterSave() {
  await this.constructor.calculateAverageRating(this.bootcamp);
});
reviewSchema.pre("remove", async function calculateAverageRatingBeforeRemove() {
  await this.constructor.calculateAverageRating(this.bootcamp);
});

module.exports = model("Review", reviewSchema);
