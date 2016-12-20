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

module.exports.respondWithResult = function respondWithResult(res, statusCode) {
  const code = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(code).json(entity);
    }
    return null;
  };
};
