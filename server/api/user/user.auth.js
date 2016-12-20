const { handleError } = require('../../util');
const User = require('./user.model');

const auth = {};

auth.populateReqUser = function populateReqUser(req, res, next) {
  return User.findById(req.user._id, { password: false })
    .then((user) => {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user; // eslint-disable-line no-param-reassign
      next();
      return null;
    })
    .catch(handleError(res));
};

module.exports = auth;
