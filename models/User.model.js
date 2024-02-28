const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, default: false },
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
      name: { type: String },
      bio: { type: String },
      picture: {
        type: String,
        default: "https://i.ibb.co/YpvBg3g/default-profile-picture.jpg",
      },
    },
    coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;