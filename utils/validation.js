const  createError  = require('http-errors');

const validate = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    return next();
  }
  next(createError(415, 'invalid content type'));
};

module.exports = validate;
