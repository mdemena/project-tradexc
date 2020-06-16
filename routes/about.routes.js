const express = require('express');
const router  = express.Router();

/* GET About */
router.get('/about', (req, res, next) => {
  res.render('about');
});

module.exports = router;