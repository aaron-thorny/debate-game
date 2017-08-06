var express = require('express');
var router = express.Router();

var teams = require('../DB/db')

let text = require('../DB/content').government

let loans = require('../DB/sequel').loan
let uni = require('../DB/sequel').university

/* GET government page. */
router.get('/', function(req, res, next) {
  loans.findAll({ 
    where: { interest: 1 },
    // include: [
    //   {
    //     model: uni,
    //     include: [marketinglvl]
    //   }
    // ]
  }).then(loans => {
    loans.forEach(function(loan) {
      console.log(loan.get())
    }, this);
  })
  res.render('government', {teams, text});
});

module.exports = router;