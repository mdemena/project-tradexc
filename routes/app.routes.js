const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (isAuthenticate) => {
	if (req.session.user) {
		res.render('app/index');
	} else {
		res.redirect('/');
	}
});

function isAuthenticate(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
