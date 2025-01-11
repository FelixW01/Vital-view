const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");
const callApi = require("../../client/templates/public/js/foodData");

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

// About/resource page
router.get("/about", (req, res) => {
  res.render("about");
});

// Chart/app page
router.get("/chart", async (req, res) => {
  try {
    const responseData = await callApi();
    // console.log(responseData); // Log data to check for blanks
    res.render("chart", { food: responseData });
  } catch (error) {
    console.error("Error in /chart route:", error);
    res.status(500).send("An error occurred while fetching data.");
  }
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
