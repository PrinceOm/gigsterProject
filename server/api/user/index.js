const express = require('express');

const controller = require('./user.controller');
const { isAuthenticated } = require('../auth/auth.service');

const users = express.Router();

users.post('/', controller.create);

users.get('/me', isAuthenticated, controller.me);

module.exports = users;
