module.exports.handleError = function handleError(res, statusCode) {
  const code = statusCode || 500;
  return (err) => {
    console.error(err); // eslint-disable-line no-console
    res.status(code).send(err);
    return null;
  };
};

module.exports.handleEntityNotFound = function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
      res.sendStatus(404);
      return null;
    }
    return entity;
  };
};

module.exports.validationError = function validationError(res, statusCode) {
  const code = statusCode || 422;
  return (err) => {
    console.error(err); // eslint-disable-line no-console
    let error;
    switch (err.code) {
      case 11000:
        error = {
          code: 11000,
          message: 'already exist...',
        };
        break;
      default:
        error = err;
        break;
    }
    res.status(code).json(error);
    return null;
  };
};

module.exports.decorateRequest = function decorateRequest(req, name, next) {
  if (!name) {
    throw Error('decorateRequest requires name argument');
  }
  return (entity) => {
    if (entity) {
      req[name] = entity;  // eslint-disable-line no-param-reassign
      next();
    }
    return null;
  };
};

module.exports.respondWithResult = function respondWithResult(res, statusCode) {
  const code = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(code).json(entity);
    }
    return null;
  };
};

module.exports.sanitizedUpdate = function sanitizedUpdate(update, fields) {
  const sanitized = Object.assign({}, update);
  fields.forEach(field => delete sanitized[field]);
  return sanitized;
};
