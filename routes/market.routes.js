const express = require('express');
const router = express.Router();

router.get('/app/market', async (req, res, next) => {
	res.render('app/market', req.session.user);
});

module.exports = router;
