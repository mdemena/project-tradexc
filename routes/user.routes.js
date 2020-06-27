const express = require("express");
const User = require("../models/user.model");
const { set } = require("../controllers/wallet.controller");
const UserController = require("../controllers/user.controller");
const supportController = require("../controllers/support.controller");
const bcrypt = require("bcryptjs");
const router = express.Router();

const saltRounds = 10;

router.get("/", async (req, res, next) => {
  const support = await supportController.listByUser(req.session.user._id);
  let supportCount = support.length;
  res.render("app/user", {
    layout: "app/layout",
    user: req.session.user,
    supportCount: supportCount,
    supports: support,
  });
});

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    validateSignup(name, email, password);
    const passwordHash = await bcrypt.hashSync(password, saltRounds);
    await UserController.set({
      _id: req.session.user._id,
      name,
      email,
      passwordHash,
    });

    req.session.user.name = name;
    req.session.user.email = email;
    req.session.user.password = passwordHash;

    res.redirect("/app");
  } catch (err) {
    res.render("app/user", {
      name,
      email,
      passwordHash,
      errorMessage: err.message,
    });
  }
});

function validateLogin(_email, _password) {
  if (!_email || !_password) {
    throw new Error("Email and password are mandatory");
  }
  validatePassword(_password);
}
function validateSignup(_name, _email, _password) {
  if (!_name || !_email || !_password) {
    throw new Error("Name, email and password are mandatory");
  }
  validatePassword(_password);
}
function validatePassword(_password) {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(_password)) {
    throw new Error(
      "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    );
  }
}

module.exports = router;
