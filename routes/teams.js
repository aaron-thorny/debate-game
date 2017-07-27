var express = require('express');
var router = express.Router();

/* GET teams page. */
router.get('/', function(req, res, next) {
  res.render('teams');
});

module.exports = router;