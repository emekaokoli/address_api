// @ts-check
const Address = require('../models/address.model');

exports.addressUpdateOne = async (id, requestBody) => {
  try {
    return await Address.findByIdAndUpdate(id, requestBody).exec();
  } catch (error) {
    throw error;
  }
};
