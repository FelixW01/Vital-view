const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

// About/resource page
router.get("/about", (req, res) => {
  res.render("about");
});

// Chart/app page
router.get("/chart", (req, res) => {
  res.render("chart");
});

//login page
router.get("/login", (req, res) => {
  res.render("login");
});

//signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Use apiRoutes when /api is triggered
router.use("/api", apiRoutes);

// Wild Card for 404 page
router.get("/*", (req, res) => {
  res.render("404");
});

module.exports = router;
