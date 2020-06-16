const express = require('express');
const withAuth = require('../middleware/authenticate');
const router = express.Router();

/* GET home page */
router.get('/', withAuth, (req, res, next) => {
	res.render('app/index');
});

module.exports = router;
