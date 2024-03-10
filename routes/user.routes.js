const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

//  GET /api/users -  Retrieves all users that are NOT admins
router.get("/non-admin-users", isAuthenticated, isAdmin, (req, res, next) => {
  User.find({ isAdmin: false })
    // .populate("coursesEnrolled")
    .then((nonAdminUsers) => res.json(nonAdminUsers))
    .catch((err) => res.json(err));
});

// GET /api/sum-of-users - Retrieve the total amount of user excluding admins
router.get(
  "/sum-of-non-admin-users",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
    User.find({ isAdmin: false })
      .then((sumOfNonUsers) => res.json(sumOfNonUsers.length))
      .catch((err) => res.json(err));
  }
);

//  GET /api/users/:userId -  Retrieves a specific user by id
router.get("/users/:userId", isAuthenticated, isAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "User id is not valid" });
    return;
  }

  User.findById(userId)
    .populate("coursesEnrolled")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

// PUT  /api/users/:userId  -  Updates a specific user by id
router.put("/users/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "User id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});

// DELETE  /api/users/:userId  -  Deletes a specific user by id
router.delete("/users/:userId", isAuthenticated, isAdmin, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "User id is not valid" });
    return;
  }

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({
        message: `User with ${userId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
