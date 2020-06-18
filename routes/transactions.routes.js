const express = require('express');
const { withAuth } = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/', withAuth, async (req, res, next) => {
	res.render('app/transactions', {
		transactions: await transactionController.listByUser(req.session.user._id),
	});
});

module.exports = router;
