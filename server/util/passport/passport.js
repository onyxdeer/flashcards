const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../../../db/models/users.js');
const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL} = require('../../../config/config.js');

// https://scotch.io/tutorials/easy-node-authentication-facebook#configuring-passports-facebook-strategy-configpassportjs
module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((err, user) => {
      done(err, user);
    });
  });  

  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
    
  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(() => {
      // find the user in the database based on their facebook id
      User.findOne({where: {'facebook.id': profile.id}})
      .then((err, user) => {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          return done(err);
        }

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create it
          // set all of the facebook information in our user model
          // save our user to the database
          User.create({
            facebookId: profile.id, // set the users facebook id   
            facebookToken: token, // we will save the token that facebook provides to the user
            facebookName: profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
            facebookEmail: profile.emails[0].value // facebook can return multiple emails so we'll take the first
          })
          .then((newUser) => {
            // if successful, return the new user
            return done(null, newUser);
          })
          .catch((err) => console.log('Error creating new Facebook user: ', err));
        }
      });
    });
  }));
};