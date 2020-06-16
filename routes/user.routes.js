const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.get("/app/user", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/user", req.session.user);
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/app/user",async (req, res, next) => {
});

module.exports = router;
