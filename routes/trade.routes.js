const express = require("express");
const Wallet = require("../models/wallet.model");
const Stock = require("../models/stock.model");
const router = express.Router();

/* GET Trade */
router.get("/app/trade", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/trade");
  } else res.redirect("auth/login");
});


router.get("app/trade/buy", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/trade/buy");
  } else res.redirect("auth/login");
});

router.get("app/trade/buy/:symbolId", async (req, res, next) => {
  if (req.session.user) {
    const movements = req.body;
    Wallet.create(movements)
      .save()
      .then((stock) => res.render("app/trade/buy", stock))
      .catch((err) => console.log("Error buy the stock:", err));
  } else res.redirect("auth/login");
});

router.get("app/trade/sell", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/trade/sell", req.session.user);
  } else res.redirect("auth/login");
});

router.get("app/trade/sell/:symbolID", async (req, res, next) => {
  if (req.session.user) {
    Wallet.update(req.params.id)
      .then((stock) => res.render("app/trade/buy", stock))
      .catch((err) => console.log("Error sell the stock:", err));
  } else res.redirect("auth/login");
});

router.post("app/trade/buy", async (req, res, next) => {
  if (req.session.user) {
    res.render("app/trade/buy", req.session.user);
  } else res.redirect("auth/login");
});

router.post("app/trade/sell", async (req, res, next) => {
    if (req.session.user) {
      res.render("app/trade/sell", req.session.user);
    } else res.redirect("auth/login");
  });

async function getSymbolPrice(symbol) {
  const key = "UBKY9YCP2IW6L5D2";
  const functionName = "GLOBAL_QUOTE";
  const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${key}`;

  try {
    const responseFromAPI = await axios.get(apiUrl);
    return responseFromAPI.data["Global Quote"]["05. price"];
  } catch (err) {
    console.log("Error while getting the data: ", err);
    return 1;
  }
}

module.exports = router;
