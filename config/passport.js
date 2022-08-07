const passport      = require('passport');
const User          = require('../models/user');
const LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'username'
};

// Strategy to check/verify login credentials.
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err)   { return done(err); }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, (err, isMatch) => {
      if (err)      { return done(err); }
      if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

      return done(null, user);
    });
  });
});

passport.use(localLogin);
const authLogin = passport.authenticate('local', { session: false });

module.exports = { authLogin };