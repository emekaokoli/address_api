// @ts-check
const validator = require('validator');
const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const addressSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Country is required'],
    unique: false,
    trim: true,
    uppercase: true,
    validate: [
      validator.isISO31661Alpha2,
      '{VALUE} is an Invalid country Code, Please enter a valid country code in CAPS',
    ],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    unique: false,
  },
  street: {
    type: String,
    required: [true, 'Street is required'],
    unique: false,
  },
  postalcode: {
    type: Number,
    required: [true, 'Postalcode is required'],
    unique: false,
    min: 5,
    // max: 6,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    unique: false,
    min: 11,
    max: 14,
    // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
  numberAddition: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: false,
    default: null,
    unique: false,
  },
  name: {
    type: String,
    required: false,
    default: null,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    default: null,
    unique: false,
  },
});

const Address = Mongoose.model('address', addressSchema);

module.exports = Address;
