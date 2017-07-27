var express = require('express');
var router = express.Router();

var teams = require('../DB/db')

let text = require('../DB/content').government

/* GET government page. */
router.get('/', function(req, res, next) {
  res.render('government', {teams, text});
});

module.exports = router;