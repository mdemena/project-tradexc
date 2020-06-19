const express = require('express');
const walletController = require('../controllers/wallet.controller');
const router = express.Router();

/* GET Wallet */
router.get('/', async (req, res, next) => {
	res.render('app/wallet', req.session.wallet);
});

router.get('/deposit', async (req, res, next) => {
	res.render('app/wallet/deposit', req.session.wallet);
});
router.post('/deposit', async (req, res, next) => {
	const { amount } = req.body;
	req.session.wallet = await walletController.deposit(
		req.session.wallet._id,
		amount
	);
	res.redirect('app/wallet/');
});

router.get('/withdraw', async (req, res, next) => {
	res.render('app/wallet/withdraw', req.session.wallet);
});
router.post('/withdraw', async (req, res, next) => {
	const { amount } = req.body;
	try {
		req.session.wallet = await walletController.widthdraw(
			req.session.wallet._id,
			amount
		);
		res.redirect('app/wallet/');
	} catch (err) {
		res.render('app/wallet/withdraw', {
			amount: amount,
			errorMessage: err.message,
		});
	}
});
module.exports = router;
