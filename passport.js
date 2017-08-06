var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var login = require('./DB/sequel').login

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    login.findById(id)
    .then(user => {
        done(null, user.get())
    })
    .catch(err => done(err))
})

passport.use(new LocalStrategy((username, password, done) => {
    login.findOne({ where: {
        username,
        password
    }})
    .then(user => {
        if (!user)
            return done(null, false) // no user or not right password 
        console.log('user', user.get('username'))
        return done(null, user.get()) // authenticated
    })
    .catch(err => {
        console.log('err', err)
        return done(err)
    })
}))

module.exports = passport