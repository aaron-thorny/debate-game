var express = require('express');
var router = express.Router();

var teams = require('../DB/db')
var qualitylvls = require('../DB/qualitylvl')
let text = require('../DB/content').quality

/* GET quality page. */
router.get('/', function(req, res, next) {
  res.render('quality', {teams, qualitylvls, text});
});

module.exports = router;