const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User.model");

//  GET /api/users -  Retrieves all users that are NOT admins
// router.get("/users", (req, res, next) => {
//     if(!User.isAdmin) {
//       User.find()
//         .then((allUsers) => res.json(allUsers))
//         .catch((err) => res.json(err));
//     } else {

//     }
// });

//  GET /api/users/:userId -  Retrieves a specific user by id
router.get("/users/:userId", (req, res, next) => {
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
router.put("/users/:userId", (req, res, next) => {
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
router.delete("/users/:userId", (req, res, next) => {
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
