const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  created: { type: Date, default: Date.now },
  status: { type: String, enum: ["completed", "failed"], default: "pending" },
});

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
