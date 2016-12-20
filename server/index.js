/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');

const config = require('./config');
const db = require('./db');

const app = express();
config(app);

const startListening = function startListening() {
  app.listen(app.get('port'), app.get('ip'), () => {
    console.info(chalk.cyan(`Listening on port ${app.get('port')}`));
  });
};

db.connect()
  .then(() => console.info(chalk.white('\nMongoose connection established...')))
  .then(startListening)
  .catch(console.error);

// http://theholmesoffice.com/mongoose-connection-best-practice/
const shutdown = function shutdown(msg, cb) {
  return function gracefulShutdown() {
    db.connection.close(() => {
      console.info(chalk.yellow(`\nMongoose disconnected through ${msg}`));
      cb();
    });
  };
};

process.once('SIGUSR2', shutdown('Nodemon Restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', shutdown('App Termination', () => process.exit(0)));
process.on('SIGTERM', shutdown('Deployment App Termination', () => process.exit(0)));
