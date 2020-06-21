const express = require("express");
const router = express.Router();
const SupportController = require("../controllers/support.controller");

router.get("/", async (req, res, next) => {
  res.render("app/support", { layout: "app/layout", user: req.session.user });
});



/* GET Support */
router.get('/', async (req, res, next) => {
	res.render('app/support-list', {
    layout: 'app/layout',
		support: await SupportController.list(req.session.user._id),
	});
});

router.post("/", async (req, res, next) => {
  const status = "New";
  const user = req.session.user._id;
  const { name, email, subject, message } = req.body;
  try {
    await SupportController.add({
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
    res.render("app/support", {layout: "app/layout", user: req.session.user,
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
