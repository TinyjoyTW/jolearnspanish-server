function isAdmin(req, res, next) {
  // Check if the user is authenticated
  if (!req.payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the user has the admin role
  if (req.payload.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  // User is authenticated and has the admin role
  next();
}

module.exports = { isAdmin };
