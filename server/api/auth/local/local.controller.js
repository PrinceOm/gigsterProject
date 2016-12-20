const passport = require('passport');

require('./passport');

const controller = {};

controller.auth = function auth(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    req.user = user;  // eslint-disable-line no-param-reassign
    return next();
  })(req, res, next);
};

module.exports = controller;
