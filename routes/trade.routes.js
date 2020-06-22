const express = require('express');
const tradeController = require('../controllers/trade.controller');
const transactionController = require('../controllers/transaction.controller');
const walletController = require('../controllers/wallet.controller');
const router = express.Router();

/* GET Trade */
router.get('/', async (req, res, next) => {
	const trades = await tradeController.listByUser(req.session.user._id);
	const transactions = await transactionController.listByUser(
		req.session.user._id
	);
	let buyAmount = 0;
	let sellAmount = 0;
	let walletAmount = req.session.wallet.amount;
	if (trades) {
		if (transactions.length > 0) {
			buyAmount = transactions
				.filter((trans) => trans.type === 'buy')
				.reduce((total, trans) => (total += trans.total), 0);
			sellAmount = transactions
				.filter((trans) => trans.type === 'sell')
				.reduce((total, trans) => (total += trans.total), 0);
		}
	}
	res.render('app/trade/index', {
		layout: 'app/layout',
		user: req.session.user,
		walletAmount: walletAmount,
		buyAmount: buyAmount,
		sellAmount: sellAmount,
		trades: trades,
		transactions: transactions,
	});
});

router.get('/buy', async (req, res, next) => {
	res.render('app/trade/trade', {
		layout: 'app/layout',
		user: req.session.user,
		title: 'Buy',
		action: 'buy',
		hasSymbol: false,
		walletAmount: req.session.wallet.amount,
		symbol: '',
		symbolCode: '',
		symbolName: '',
		price: 0,
	});
});

router.get('/buy/:type/:symbol-:name', async (req, res, next) => {
	res.render('app/trade/trade', {
		layout: 'app/layout',
		user: req.session.user,
		title: 'Buy',
		action: 'buy',
		hasSymbol: true,
		walletAmount: req.session.wallet.amount,
		symbol: `${req.params.name} (${req.params.symbol})`,
		symbolCode: req.params.symbol,
		symbolName: req.params.name,
		price: await tradeController.getSymbolPrice(
			req.params.symbol,
			req.params.type
		),
	});
});

router.get('/sell', async (req, res, next) => {
	res.render('app/trade/sell', {
		layout: 'app/layout',
		user: req.session.user,
		title: 'Sell',
		action: 'sell',
		trades: await tradeController.listByUser(req.session.user._id),
	});
});

router.get('/sell/:type:/:units/:symbol-:name', async (req, res, next) => {
	res.render('app/trade/sell', {
		layout: 'app/layout',
		user: req.session.user,
		title: 'Sell',
		action: 'sell',
		symbol: req.params.symbol,
		name: req.params.name,
		units: req.params.units,
		price: await tradeController.getSymbolPrice(
			req.params.symbol,
			req.params.type
		),
	});
});

router.post('/buy', async (req, res, next) => {
	const { symbolCode, symbolName, type, units, price } = req.body;
	console.log({ symbolCode, symbolName, type, units, price });
	try {
		if (units * price <= req.session.wallet.amount) {
			await tradeController.buy(
				req.session.user._id,
				symbolCode,
				symbolName,
				type,
				units,
				price
			);
			res.redirect('app/trade/');
		} else {
			throw new Error(
				`You don't have sufficient amount in your wallet for this buy. Wallet: ${
					req.session.wallet.amount
				}, Total Cost: ${units * price}`
			);
		}
	} catch (err) {
		res.render('app/trade/trade', {
			layout: 'app/layout',
			user: req.session.user,
			title: 'Buy',
			action: 'buy',
			symbolCode,
			symbolName,
			type,
			units,
			price,
			errorMessage: err.message,
		});
	}
});

router.post('/sell', async (req, res, next) => {
	const { symbolId, units } = req.body;
	await tradeController.sell(req.session.user._id, symbolId, units);
	res.redirect('app/trade/');
	res.render('app/trade/sell', {
		layout: 'app/layout',
		user: req.session.user,
		symbolId,
		units,
		errorMessage: err.message,
	});
});

router.get('/getSymbolPrice/:type/:symbol', async (req, res, next) => {
	res.json(
		await tradeController.getSymbolPrice(req.params.symbol, req.params.type)
	);
});
router.get('/searchSymbol/:type/:keywords', async (req, res, next) => {
	res.json(
		await tradeController.searchSymbol(req.params.keywords, req.params.type)
	);
});

module.exports = router;
