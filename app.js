// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

const courseRoutes = require("./routes/course.routes");
app.use("/api", courseRoutes);

const transactionRoutes = require("./routes/transaction.routes");
app.use("/api", transactionRoutes);

const reviewRoutes = require("./routes/review.routes");
app.use("/api", reviewRoutes);

require("./error-handling")(app);

module.exports = app;