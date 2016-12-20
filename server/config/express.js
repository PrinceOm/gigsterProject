const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./environment');

module.exports = (app) => {
  app.set('port', config.port);
  app.set('ip', config.ip);
  app.set('clientPath', `${config.root}/client`);
  app.use(express.static(app.get('clientPath')));
  app.use(morgan('dev'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());

  if (app.get('env') === 'development' || app.get('env') === 'test') {
    /* eslint-disable global-require */
    app.use(require('errorhandler')());
    /* eslint-enable global-require */
  }
};
