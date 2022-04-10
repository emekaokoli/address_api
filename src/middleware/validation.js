const createError = require('http-errors');
const {
  BodySchema,
  idSchema,
} = require('../schema/validateReq.schema');

const validateContentType = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    return next();
  }
  return next(createError(415, 'invalid content type'));
};

const validateRequestBody = (req, res, next) => {
  const results = BodySchema.validate(req.body);
  if (results.error) {
    return next(createError(400, results.error.details[0].message));
  }
  return next();
};

const validateId = (req, res, next) => {
  const results = idSchema.validate(req.params.id);
  if (results.error) {
    return next(createError(400, results.error.details[0].message));
  }
  return next();
};

module.exports = {
  validateContentType,
  validateRequestBody,
  validateId,
};


