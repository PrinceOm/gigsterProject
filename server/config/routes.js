const authRouter = require('../api/auth');
const userRouter = require('../api/user');
const expenseRouter = require('../api/expense');

module.exports = (app) => {
  // build these routes!
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/expense', expenseRouter);
};
