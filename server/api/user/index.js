const express = require('express');

const controller = require('./user.controller');

const users = express.Router();

users.post('/', controller.create);

module.exports = users;
