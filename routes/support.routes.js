const express = require("express");
const router = express.Router();

router.get("/app/support", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/support", req.session.user);
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;