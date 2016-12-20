const authRouter = require('../api/auth');
const userRouter = require('../api/user');
const expenseRouter = require('../api/expense');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/expense', expenseRouter);
};
