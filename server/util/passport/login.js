const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../db/models/users.js');

passport.use('login', new LocalStrategy({
  passReqToCallback: true },
  (req, username, password, done) => {
    User.findOne({ where: { 'username' : username } }).success((err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false, req.flash('message', 'User Not found.'));                 
      }
      if (!User.isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false, req.flash('message', 'Invalid Password'));
      }
      return done(null, user);
    });
  },
));
