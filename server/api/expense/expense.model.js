const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: false },
  amount: { type: Number, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
