const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transaction.controller');

/* GET home page */
router.get('/', (req, res, next) => {

	const transactions = transactionsController.listByUser(req.session.user_id);
	let totalTransactions = 0;
	let totalBuy = 0;
	let totalSell = 0;
	if (transactions.length > 0) {
		totalTransAmount = transactions
			.listByUser(req.session.user_id)
			.reduce(
				(total, trans) =>
					(total += trans.type === 'buy' ? trans.amount : -1 * trans.amount),
				0
			);
		totalBuyAmount = transactions
			.listByUser(req.session.user_id)
			.filter((trans) => trans.type === 'buy')
			.reduce((total, trans) => (total += trans.amount), 0);
		totalSellAmount = transactions
			.listByUser(req.session.user_id)
			.filter((trans) => trans.type === 'sell')
			.reduce((total, trans) => (total += trans.amount), 0);
	}
	res.render('app/index', {
		layout: 'app/layout',
		user: req.session.user,
		walletAmount: req.session.wallet.amount,
		totalTransactions: totalTransactions,
		totalBuy: totalBuy,
		totalSell: totalSell,
	});

});

module.exports = router;
