// @ts-check
const Address = require('../models/address.model');

exports.addressFetchOne = async (id) => {
  try {
    return await Address.findById(id).exec();
  } catch (error) {
    throw error;
  }
};
