const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

exports.validateReqBody = () => [
  body('country')
    .notEmpty()
    .trim()
    .isISO31661Alpha2()
    .withMessage('country is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('city is required'),
  body('street').trim().notEmpty().withMessage('street is required'),
  body('postalcode').trim().notEmpty().withMessage('postalcode is required'),
  body('number')
    .notEmpty()
    .isNumeric({ min: 11, max: 14 })
    .trim()
    .withMessage('phone number must be less than 11 or equal 14'),
  body('numberAddition').trim().optional({ checkFalsy: true }),
  body('status').trim().optional({ checkFalsy: true }),
  body('email')
    .trim()
    .normalizeEmail()
    .optional({ checkFalsy: true })
    .isEmail(),
  body('name').trim().optional({ checkFalsy: true }),
];
exports.validateRequests = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return next(createError(422, extractedErrors));
};
