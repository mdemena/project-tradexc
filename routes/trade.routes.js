const express = require('express');
const withAuth = require('../middleware/auth.middleware');
const router = express.Router();

/* GET Trade */
router.get('/', withAuth, async (req, res, next) => {
	res.render('app/trade');
});

router.get('/buy', withAuth, async (req, res, next) => {
	res.render('app/trade/buy');
});

router.get('/buy/:symbolId', withAuth, async (req, res, next) => {
	res.render('app/trade/buy', req.params.symbolId);
});

router.get('/sell', withAuth, async (req, res, next) => {
	res.render('app/trade/sell', req.session.user);
});

router.get('/sell/:symbolID', withAuth, async (req, res, next) => {
	Wallet.update(req.params.id)
		.then((stock) => res.render('app/trade/buy', stock))
		.catch((err) => console.log('Error sell the stock:', err));
});

router.post('/buy', withAuth, async (req, res, next) => {
	res.render('app/trade/buy', req.session.user);
});

router.post('/sell', withAuth, async (req, res, next) => {
	res.render('app/trade/sell', req.session.user);
});

module.exports = router;
