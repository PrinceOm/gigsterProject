const Expense = require('./expense.model');
const { handleError, handleEntityNotFound } = require('../../util');

const auth = {};

auth.decorateWithExpense = (req, res, next) => {
  Expense.findById(req.params.expenseId)
    .then(handleEntityNotFound(res))
    .then((expense) => {
      if (expense) {
        req.expense = expense; // eslint-disable-line no-param-reassign
        next();
      }
    })
    .catch(handleError(res));
};

auth.isOwner = (req, res, next) => {
  if (req.expense.owner.toString() === req.headers.id.toString()) {
    return next();
  }
  return res.status(403).send('Not expense owner');
};

auth.isExpenseOwner = [auth.decorateWithExpense, auth.isOwner];

module.exports = auth;
