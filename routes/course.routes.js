const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Course = require("../models/Course.model");

//  GET /api/courses -  Retrieves all courses
router.get("/courses", (req, res, next) => {
  Course.find()
    // .populate("studentsEnrolled")
    .then((allCourses) => res.json(allCourses))
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
router.post("/courses", (req, res, next) => {

  Course.create(req.body)
    .then((newCourse) => res.json(newCourse))
    .catch((error) => res.json(error));
});

// PUT  /api/courses/:courseId  -  Updates a specific course by id
router.put("/courses/update/:courseId", (req, res, next) => {
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
router.delete("/courses/:courseId", (req, res, next) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    res.status(400).json({ message: "Course id is not valid" });
    return;
  }

  Course.findByIdAndRemove(courseId)
    .then(() =>
      res.json({
        message: `Course with ${courseId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
