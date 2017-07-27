var express = require('express');
var router = express.Router();

var teams = require('../DB/db')
var marketlvls = require('../DB/marketlvl')
let text = require('../DB/content').marketing

/* GET marketing page. */
router.get('/', function(req, res, next) {
  res.render('marketing', { teams, marketlvls, text });
});

module.exports = router;