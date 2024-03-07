const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Review = require("../models/Review.model");

//  GET /api/reviews -  Retrieves all reviews
router.get("/reviews", (req, res, next) => {
  Review.find()
    .populate("course")
    .then((allReviews) => res.json(allReviews))
    .catch((err) => res.json(err));
});

// GET /api/sum-of-reviews - Retrieve the total amount of reviews 
router.get("/sum-of-reviews", (req, res, next) => {
  Review.find()
    .then((sumOfReviews) => res.json(sumOfReviews.length))
    .catch((err) => res.json(err));
});

//  GET /api/reviews/:reviewId -  Retrieves a specific review by id
router.get("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Review id is not valid" });
    return;
  }

  Review.findById(reviewId)
    .then((review) => res.status(200).json(review))
    .catch((error) => res.json(error));
});

//  POST /api/reviews  -  Creates a new review
router.post("/reviews", (req, res, next) => {

  Review.create(req.body)
    .then((newReview) => res.json(newReview))
    .catch((error) => res.json(error));
});

// PUT  /api/reviews/:reviewId  -  Updates a specific review by id
router.put("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Review id is not valid" });
    return;
  }

  Review.findByIdAndUpdate(reviewId, req.body, { new: true })
    .then((updatedReview) => res.json(updatedReview))
    .catch((error) => res.json(error));
});

// DELETE  /api/reviews/:reviewId  -  Deletes a specific review by id
router.delete("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Review id is not valid" });
    return;
  }

  Review.findByIdAndRemove(reviewId)
    .then(() =>
      res.json({
        message: `Review with ${reviewId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
