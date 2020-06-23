const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("app/transactions", {
    layout: "app/layout",
    user: req.session.user,
    transactions: await transactionController.listByUser(req.session.user._id),
  });
});

module.exports = router;
