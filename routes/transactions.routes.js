const express = require("express");
const Transaction = require("../models/transaction.model");
const router = express.Router();

router.get("/app/transactions", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/transactions", req.session.user);
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
