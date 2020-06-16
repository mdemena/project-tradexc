const express = require("express");
const router = express.Router();

/* GET Wallet */
router.get("/app/trade", (req, res, next) => {
  if (userLogin) {
    req.session.user = userLogin;
    res.render("app/trade");
  } else res.render("auth/login");
});

module.exports = router;