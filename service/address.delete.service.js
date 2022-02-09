// @ts-check
const Address = require('../models/address.model');

exports.addressDeleteOne = async (id) => {
  try {
    return await Address.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
