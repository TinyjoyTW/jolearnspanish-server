const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    category: {
      type: String,
      required: true,
      enum: [
        "vocabulary",
        "grammar",
        "conversation",
        "pronunciation",
        "culture",
        "listening",
        "writing",
      ],
    },
    level: {
      type: String,
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1"],
    },
    price: String,
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

module.exports = Course;
