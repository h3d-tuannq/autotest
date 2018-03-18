var passport = require('passport');
var Admin = require('../models/adminaccount');
var LocalStrategy = require('passport-local');

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function (req, email, password , done) {
    Admin.findOne({'user': email}, function (err, useradmin) {
        if(err)
            return done(err);
        if (!useradmin){
            return done(null, false, {message : 'User not found.'});
        }
        if (!useradmin.validPassword(password))
            return done(null, false , {message : 'Wrong password.'});
        return done(null, useradmin);
    });
   /*if(email === 'admin' && password==='anhtuan007') {
       var userAdmin = new Admin();
       userAdmin.user = 'admin';
       userAdmin.pass = 'anhtuan007';
       userAdmin.type = 'admin';
       return done(null, userAdmin);
   }
    else
       done(null, false , {message : 'Wrong password.'});*/

}));