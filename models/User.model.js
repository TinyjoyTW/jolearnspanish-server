const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, required: true },
    name: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    profile: {
      name: { type: String, required: [true], unique: true },
      bio: { type: String },
      picture: { type: String, default: "" },
    },
    coursesEnrolled: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
