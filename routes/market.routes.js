const express = require('express');
const { withAuth } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/app/market', withAuth, async (req, res, next) => {
	res.render('app/market');
});

module.exports = router;
