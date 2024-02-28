const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, maxlength: 300 },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);
module.exports = Review;

