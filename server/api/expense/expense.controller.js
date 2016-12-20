const Expense = require('./expense.model');
const u = require('../../util');
const { handleError } = require('../../util');

const controller = {};

controller.create = (req, res) => {
  const sanitized = u.sanitizedUpdate(req.body, ['_id']);
  Expense.create(sanitized)
    .then(u.respondWithResult(res))
    .catch(handleError(res));
};

controller.delete = (req, res) => {
  Expense.findByIdAndRemove(req.params.expenseId)
    .then(() => res.sendStatus(204))
    .catch(handleError(res));
};

controller.update = (req, res) => {
  Expense.findByIdAndUpdate(req.params.expenseId, { $set: req.body })
    .then(u.respondWithResult(res))
    .catch(handleError(res));
};

controller.all = (req, res) => {
  if (req.headers.accounttype === 'Admin') {
    Expense.find({})
      .then(u.respondWithResult(res))
      .catch(u.handleError(res));
  } else {
    Expense.find({ owner: req.headers.id })
      .then(u.respondWithResult(res))
      .catch(u.handleError(res));
  }
};

module.exports = controller;
