const passport = require('passport');
const User = require('../../db/models/users.js');

passport.deserializeUser((user, done) => {
  User.find({ where: { id: user.id } }).success((user) => {
    done(null, user);
  }).error((err) => {
    done(err, null);
  });
});
