const _ = require('lodash');
const path = require('path');

const baseSettings = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: process.env.APP_SECRET || 'expenseTracker-secret',
  },
};

let environmentSettings;
/* eslint-disable global-require */
switch (baseSettings.env) {
  case 'production':
    environmentSettings = _.merge(baseSettings, require('./production'));
    break;
  case 'development':
  default:
    environmentSettings = _.merge(baseSettings, require('./development'));
    break;
}
/* eslint-enable */

module.exports = environmentSettings;
