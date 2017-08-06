var express = require('express');
var router = express.Router();
var university = require('../DB/sequel').university

router.param('name', (req, res, next, name) => {
  req.params.name = decodeURI(name)
  next()
})

/* GET teams page. */
router.get('/:name', function(req, res, next) {
  var teamName = req.params.name
  console.log("route", teamName)
  university.findOne({
    where: {
      name: teamName
    }
  })
  .then(team => {
    console.log(team.get())
    res.render('teams', { team: team.get() });
  })
});

module.exports = router;