var express = require('express');
var router = express.Router();

var teams = require('../DB/db')

let text = require('../DB/content').mafia

/* GET mafia page. */
router.get('/', function(req, res, next) {
  res.render('mafia', {teams, text});
});

module.exports = router;