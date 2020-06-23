const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transaction.controller');
const tradeController = require('../controllers/trade.controller');

/* GET home page */
router.get('/', (req, res, next) => {
	const transactions = transactionsController.listByUser(req.session.user_id);
	// Begin Dashboard data
	let transAmount = 0;
	let transCount = 0;
	let transBuys = 0;
	let transSells = 0;
	let balanceBuySell = 0;
	let walletAmount = req.session.wallet.amount;
	const balanceInvest = tradeController.groupedByUserBySymbol(
		req.session.user._id
	);

	if (transactions.length > 0) {
		transAmount = transactions.reduce(
			(total, trans) =>
				(total += trans.type === 'buy' ? trans.amount : -1 * trans.amount),
			0
		);
		transCount = transactions.length;
		transBuys = transactions.filter((trans) => trans.type === 'buy').length;
		transSells = transactions.filter((trans) => trans.type === 'sell').length;
		balanceBuySell =
			transactions
				.filter((trans) => trans.type === 'buy')
				.reduce((total, trans) => (total += trans.amount), 0) /
			transactions
				.filter((trans) => trans.type === 'sell')
				.reduce((total, trans) => (total += trans.amount), 0);
	}
	// End Dashboard data
	res.render('app/index', {
		layout: 'app/layout',
		user: req.session.user,
		walletAmount: walletAmount,
		transAmount: transAmount,
		transCount: transCount,
		transBuys: transBuys,
		transSells: transSells,
		balanceBuySell: balanceBuySell * 100,
		balanceInvest: balanceInvest,
	});
});

module.exports = router;
