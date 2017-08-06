var express = require('express');
var router = express.Router();

var teams = require('../DB/db')
var marketlvls = require('../DB/marketlvl')
let text = require('../DB/content').marketing
let DB = require('../DB/sequel')
let marketLvls = DB.marketing
let uni = DB.university

/* GET marketing page. */
router.get('/', function(req, res, next) {
  res.render('marketing', { teams, marketlvls, text });
});

router.post('/', (req, res) => {
  let university, marketLevel;
  uni.findOne({
    where: {
      name: req.body.university
    }
  })
  .then(univ => {
    console.log(univ)
    university = univ
    let maxLevel = univ.marketlvl + 3
    let buyLevel = req.body.buyMarketLvl > maxLevel ? maxLevel : req.body.buyMarketLvl
    return marketLvls.findOne({
      where: {
        level: buyLevel
      }
    })
  })
  .then((mktLvl) => {
    marketLevel = mktLvl
    if(university.totalmoney < marketLevel.price){
      res.send("You do not have sufficient funds. Boo")
    } else {
      university.totalmoney -= marketLevel.price
      return university.save()
      .then((updatedUni) => {
        university = updatedUni
        console.log("rows affected", university.get())
        res.send(`Congrats you bought market level ${marketLevel.level} for $${marketLevel.price} and have $${university.totalmoney} left`)
      })
    }
  })
})

module.exports = router;