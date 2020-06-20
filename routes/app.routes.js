const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
	console.log('We arrive!!');
	res.render('app/index', {
		layout: 'app/layout',
		user: req.session.user,
		wallet: req.session.wallet,
	});
});

module.exports = router;
