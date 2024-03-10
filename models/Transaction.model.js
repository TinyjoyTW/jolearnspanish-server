const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ["completed", "failed", "pending"], required: true},
  },
  {
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
