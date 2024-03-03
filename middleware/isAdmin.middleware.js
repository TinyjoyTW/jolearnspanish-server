const User = require("../models/User.model");

function isAdmin(req, res, next) {
  // Check if the user is authenticated
  if (!req.payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findById(req.payload._id).then(({ isAdmin }) => {
    // Check if the user has the admin role
    if (isAdmin) {
      // User is authenticated and has the admin role
      next();
    } else {
      return res.status(403).json({ message: "Access denied, not an admin" });
    }
  });
}

module.exports = { isAdmin };
