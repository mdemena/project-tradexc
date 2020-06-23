const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transaction.controller');
const tradeController = require('../controllers/trade.controller');

/* GET home page */
router.get('/', async (req, res, next) => {
	const transactions = await transactionsController.listByUser(
		req.session.user._id
	);
	// Begin Dashboard data
	let transAmount = 0;
	let transCount = 0;
	let transBuys = 0;
	let transSells = 0;
	let balanceBuySell = 0;
	let walletAmount = req.session.wallet.amount;
	const balanceInvest = await tradeController.groupedByUserBySymbol(
		req.session.user._id
	);

	if (transactions.length > 0) {
		transBuys = transactions.filter((trans) => trans.type === 'buy');
		transSells = transactions.filter((trans) => trans.type === 'sell');
		transBuysAmount = transBuys.reduce(
			(total, trans) => (total += trans.total),
			0
		);
		transSellsAmount = transSells.reduce(
			(total, trans) => (total += trans.total),
			0
		);
		transAmount = transBuysAmount - transSellsAmount;
		transCount = transactions.length;
		transBuysCount = transBuys.length;
		transSellsCount = transSells.length;
		balanceBuySell =
			transBuysAmount /
			(transSellsAmount === 0 ? transBuysAmount : transSellsAmount);
	}
	// End Dashboard data
	res.render('app/index', {
		layout: 'app/layout',
		user: req.session.user,
		walletAmount: walletAmount,
		transAmount: transAmount,
		transCount: transCount,
		transBuys: transBuysCount,
		transSells: transSellsCount,
		balanceBuySell: balanceBuySell * 100,
		balanceInvest: balanceInvest,
	});
});

module.exports = router;
