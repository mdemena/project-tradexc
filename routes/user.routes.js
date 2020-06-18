const express = require('express');
const User = require('../models/user.model');
const { withAuth } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/app/user', withAuth, async (req, res, next) => {
	res.render('app/user', req.session.user);
});

router.post('/app/user', withAuth, async (req, res, next) => {});

module.exports = router;
