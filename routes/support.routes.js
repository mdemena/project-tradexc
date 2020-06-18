const express = require('express');
const { withAuth } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/app/support', withAuth, async (req, res, next) => {
	res.render('app/support', req.session.user);
});

module.exports = router;
