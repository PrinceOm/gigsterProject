const u = require('../../util');
const { signToken } = require('./../auth/auth.service');
const User = require('./user.model');

const controller = {};

controller.create = function create(req, res) {
  const { username, password, accountType } = req.body;
  return User.create({ username, password, accountType })
    .then(user => signToken(user._id))
    .then(token => ({ token }))
    .then(u.respondWithResult(res))
    .catch(u.validationError(res, 422));
};

controller.me = function create(req, res) {
  return res.json(req.user);
};

module.exports = controller;
