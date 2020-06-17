const express = require('express');
const withAuth = require('../middleware/auth.middleware');
const walletController = require('../controllers/wallet.controller');
const router = express.Router();

/* GET Wallet */
router.get('/', withAuth, async (req, res, next) => {
	res.render('app/wallet', req.session.wallet);
});

router.get('/deposit', withAuth, async (req, res, next) => {
	res.render('app/wallet/deposit', req.session.wallet);
});
router.post('/deposit', withAuth, async (req, res, next) => {
	const { _id, amount } = req.body;
	req.session.wallet = await walletController.deposit(_id, amount);
	res.redirect('app/wallet/');
});

router.get('/withdraw', withAuth, async (req, res, next) => {
	res.render('app/wallet/withdraw', req.session.wallet);
});
router.post('/withdraw', withAuth, async (req, res, next) => {
	const { _id, amount } = req.body;
	try {
		req.session.wallet = await walletController.widthdraw(_id, amount);
		res.redirect('app/wallet/');
	} catch (err) {
		res.render('app/wallet/withdraw', { errorMessage: err.message });
	}
});
module.exports = router;
