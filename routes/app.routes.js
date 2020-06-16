const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/app", (req, res, next) => {
  res.render("app/index");
});

module.exports = router;