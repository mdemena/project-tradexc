const express = require("express");
const Wallet = require("../models/wallet");
const router = express.Router();

/* GET Wallet */
router.get("/app/wallet", (req, res, next) => {
  if (req.session.user) {
    res.render("app/wallet", req.session.user);
  } else res.render("auth/login");
});

module.exports = router;
