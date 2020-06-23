const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support.controller");

router.get("/", async (req, res, next) => {
  res.render("app/support/ticket", {
    layout: "app/layout",
    user: req.session.user,
  });
});

router.get("/", async (req, res, next) => {
  res.render("app/support/index", {
    layout: "app/layout",
    user: req.session.user,
    support: await supportController.listByUser(req.session.user._id),
  });
});



router.post("/", async (req, res, next) => {
  const status = "New";
  const user = req.session.user._id;
  const { name, email, subject, message } = req.body;
  try {
    await supportController.add({
      user,
      name,
      email,
      subject,
      message,
      status,
    });

    res.redirect("/app");
  } catch (err) {
    console.log(err);
    res.render("app/support", {
      layout: "app/layout",
      user: req.session.user,
      name,
      email,
      subject,
      message,
      status,
      errorMessage: err.message,
    });
  }
});

module.exports = router;
