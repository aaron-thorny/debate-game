var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sequelize = require('sequelize');

var passport = require('./passport');

var index = require('./routes/index');
var users = require('./routes/users');
var marketing = require('./routes/marketing');
var government = require('./routes/government');
var mafia = require('./routes/mafia');
var bank = require('./routes/bank');
var quality = require('./routes/quality');
var teams = require('./routes/teams');
var login = require('./DB/sequel').login


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'sekret'
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("logging in" + JSON.stringify(req.user.role))
  res.redirect(`/${req.user.role}`)
})

app.use((req, res, next) => {
  if (req.user){
    console.log(req.user.username)
    if (req.user.role.toLowerCase() == 'team') {
      var teamSite = encodeURI(`/teams/${req.user.username}`)
      if(req.path == teamSite)
        next()
      else
        res.redirect(teamSite)
    } 
    else if (`/${req.user.role}` == req.path)
      next()
    else
      res.redirect(`/${req.user.role}`)
  } else {
    if(req.path == '/')
      next()
    else
      res.redirect('/')
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/marketing', marketing);
app.use('/government', government);
app.use('/mafia', mafia);
app.use('/bank', bank);
app.use('/quality', quality);
app.use('/teams', teams);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
