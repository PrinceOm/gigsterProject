const LocalStrategy = require('passport-local');
const passport = require('passport');

const User = require('../../user/user.model');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  User.findOne({ username })
    .select('+password')
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'No user with that name... Need to sign up?',
        });
      }
      return user.authenticate(password)
        .then((authenticated) => {
          if (!authenticated) {
            return done(null, false, {
              message: 'Wrong password... Try again!',
            });
          }
          return done(null, user);
        });
    })
    .catch(err => done(err));
}));
