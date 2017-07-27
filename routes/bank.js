var express = require('express');
var router = express.Router();

var teams = require('../DB/db')

let text = require('../DB/content').bank

/* GET bank page. */
router.get('/', function(req, res, next) {
  res.render('bank', {teams, text});
});

module.exports = router;