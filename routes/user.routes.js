const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/app/user", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/user", req.session.user);
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
