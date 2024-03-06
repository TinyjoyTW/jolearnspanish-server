const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const { isAdmin } = require("../middleware/isAdmin.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  GET /api/courses -  Retrieves all courses
router.get("/courses", (req, res, next) => {
  Course.find()
    // .populate("studentsEnrolled")
    .then((allCourses) => res.json(allCourses))
    .catch((err) => res.json(err));
});

// GET /api/sum-of-courses - Retrieve the total amount of courses
router.get("/sum-of-courses", (req, res, next) => {
  Course.find()
    .then((allCourses) => res.json(allCourses.length))
    .catch((err) => res.json(err));
});

//  GET /api/courses/:courseId -  Retrieves a specific course by id
router.get("/courses/:courseId", (req, res, next) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Course id is not valid" });
    return;
  }

  Course.findById(courseId)
    .then((course) => res.status(200).json(course))
    .catch((error) => res.json(error));
});

//  POST /api/courses  -  Creates a new course
router.post("/courses", isAuthenticated, isAdmin, (req, res, next) => {
  Course.create(req.body)
    .then((newCourse) => res.json(newCourse))
    .catch((error) => res.status(400).json({ message: "Input not valid." }));
});

// PUT  /api/courses/:courseId  -  Updates a specific course by id
router.put("/courses/:courseId", isAuthenticated, isAdmin, (req, res, next) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Course id is not valid" });
    return;
  }

  Course.findByIdAndUpdate(courseId, req.body, { new: true })
    .then((updatedCourse) => res.json(updatedCourse))
    .catch((error) => res.json(error));
});

// DELETE  /api/courses/:courseId  -  Deletes a specific course by id
router.delete(
  "/courses/:courseId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ message: "Course id is not valid" });
      return;
    }

    Course.findByIdAndDelete(courseId)
      .then(() =>
        res.json({
          message: `Course with ${courseId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  }
);

router.post("/courses/:courseId/enroll", isAuthenticated, (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Course id is not valid" });
    return;
  }
  // Waiting for two promises to fulfill
  Promise.all([
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { coursesEnrolled: courseId } },
      { new: true }
    ),
    Course.findByIdAndUpdate(
      courseId,
      //addToSet makes sure what we're adding is unique
      { $addToSet: { studentsEnrolled: userId } },
      { new: true }
    ),
  ])
    // The result is an array of two objects from two promises, but we only want to send the second result to the frontend.
    .then((updatedAll) => res.json(updatedAll[1]))
    .catch((error) => res.json(error));
});

module.exports = router;
