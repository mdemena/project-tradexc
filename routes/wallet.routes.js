const express = require("express");
const Wallet = require("../models/wallet");
const router = express.Router();

/* GET Wallet */
router.get("/app/wallet", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/wallet", req.session.user);
  } else res.redirect("auth/login");
});

router.post("/app/wallet",async (req, res, next) => {
});

router.get("app/wallet/deposit", async (req, res, next) =>{
    if (req.session.user) {
        res.render("app/wallet/deposit", req.session.user);
      } else res.redirect("auth/login");
});

router.get("app/wallet/withdraw", async (req, res, next) =>{
    if (req.session.user) {
        res.render("app/wallet/withdraw", req.session.user);
      } else res.redirect("auth/login");
});

module.exports = router;
