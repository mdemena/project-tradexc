const express = require('express');
const { withAuth } = require('../middleware/auth.middleware');
const tradeController = require('../controllers/trade.controller');
const router = express.Router();

/* GET Trade */
router.get('/', withAuth, async (req, res, next) => {
	res.render('app/trade', {
		trades: await tradeController.listByUser(req.session.user._id),
	});
});

router.get('/buy', withAuth, async (req, res, next) => {
	res.render('app/trade/buy');
});

router.get('/buy/:symbol-:name', withAuth, async (req, res, next) => {
	res.render('app/trade/buy', {
		symbol: req.params.symbol,
		name: req.params.name,
	});
});

router.get('/sell', withAuth, async (req, res, next) => {
	res.render('app/trade/sell', {
		trades: await tradeController.listByUser(req.session.user._id),
	});
});

router.get('/sell/:symbolID', withAuth, async (req, res, next) => {
	res.render('app/trade/sell');
});

router.post('/buy', withAuth, async (req, res, next) => {
	try {
		const { symbol, name, type, units } = req.body;
		await tradeController.buy(req.session.user._id, symbol, name, type, units);
		res.redirect('app/trade/');
	} catch (err) {
		res.render('app/trade/buy', {
			symbol,
			name,
			type,
			units,
			errorMessage: err.message,
		});
	}
});

router.post('/sell', withAuth, async (req, res, next) => {
	const { symbolId, units } = req.body;
	await tradeController.sell(req.session.user._id, symbolId, units);
	res.redirect('app/trade/');
	res.render('app/trade/sell', {
		symbolId,
		units,
		errorMessage: err.message,
	});
});

module.exports = router;
