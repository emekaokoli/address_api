const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const BodySchema = joi.object().keys({
  country: joi.string().required().messages({
    'string.base': 'Country Code is required',
    'string.empty': 'Country is required',
    'string.required': 'Country is required',
  }).min(2).max(2).uppercase(),
  city: joi.string().required().messages({
    'string.base': 'city must be a string',
    'string.empty': 'city is required',
    'string.required': 'city is required',
  }),
  street: joi.string().required().messages({
    'string.base': 'street must be a string',
    'string.empty': 'street is required',
    'string.required': 'street is required',
  }),
  postalcode: joi.string().required().messages({
    'string.base': 'postalcode must be a string',
    'string.empty': 'postalcode is required',
    'string.required': 'postalcode is required',
  }),
  number: joi.number().required().messages({
    'number.base': 'number must be a number',
    'number.empty': 'number is required',
    'number.required': 'number is required',
  }),
  numberAddition: joi.string().optional(),
  status: joi.string().optional(),
  name: joi.string().optional(),
  email: joi.string().email().optional(),
});
const idSchema = joi.objectId().required().messages({
  'objectid.base': 'id must be a valid ObjectId',
  'objectid.empty': 'id is required',
  'objectid.required': 'id is required',
});

module.exports = { BodySchema, idSchema };