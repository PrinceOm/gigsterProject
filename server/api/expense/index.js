const express = require('express');

const { isAuthenticated } = require('../auth/auth.service');
const controller = require('./expense.controller');
const { isExpenseOwner } = require('./expense.auth');

const expenses = express.Router();

expenses.use(isAuthenticated);

expenses.post('/', controller.create);

expenses.get('/', controller.all);

expenses.delete('/:expenseId', isExpenseOwner, controller.delete);

expenses.put('/:expenseId', isExpenseOwner, controller.update);

module.exports = expenses;
