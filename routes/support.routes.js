const express = require('express');
const router = express.Router();

router.get('/app/support', async (req, res, next) => {
	res.render('app/support', req.session.user);
});

module.exports = router;
