const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require("../models/Transaction.model");

//  GET /api/transactions -  Retrieves all transactions
router.get("/transactions", (req, res, next) => {
  Transaction.find()
    .populate("user", "course")
    .then((allTransactions) => res.json(allTransactions))
    .catch((err) => res.json(err));
});

//  GET /api/transactions/:transactionId -  Retrieves a specific transaction by id
router.get("/transations/:transactionId", (req, res, next) => {
  const { transactionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    res.status(400).json({ message: "Transaction id is not valid" });
    return;
  }
  Transaction.findById(transactionId)
    .then((transaction) => res.status(200).json(transaction))
    .catch((err) => {
      res.json(err);
    });
});

//  POST /api/transactions  -  Creates a new transaction
router.post("/transactions", (req, res, next) => {
  const {
    user,
    course,
    status
  } = req.body;

  Transaction.create(req.body)
    .then((newTransaction) => res.json(newTransaction))
    .catch((error) => res.json(error));
});
