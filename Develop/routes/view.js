const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/index");
});

router.get("/stats", function (req, res) {
  res.redirect("/stats.html");
});

router.get("/exercise", function (req, res) {
  res.redirect("/exercise.html");
});

module.exports = router;
