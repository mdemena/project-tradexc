const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
	if (req.session.user) {
		res.render('app/market', req.session.user);
	} else {
		res.redirect('/auth/login');
	}
});

module.exports = router;