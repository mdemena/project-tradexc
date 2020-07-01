const express = require('express');
const router = express.Router();
const SupportController = require('../controllers/support.controller');
const LogController = require('../controllers/log.controller');

/* GET home page */
router.get('/', async (req, res, next) => {
	const support = await SupportController.listByUser(req.session.user._id);
	const logRegistry = await LogController.listByUser(req.session.user._id);
	res.render('app/logs/index', {
		layout: 'app/layout',
		user: req.session.user,
		supportCount: tickets.length + 1,
		supports: support,
		logs: logRegistry,
	});
});

module.exports = router;
