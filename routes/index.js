var express = require('express');
var router = express.Router();

let text = require('../DB/content').index

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { text });
});

module.exports = router;
