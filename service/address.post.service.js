// @ts-check
const Address = require('../models/address.model');

exports.addressPost = async (requestBody) => {
  try {
    return await Address.create(requestBody);
  } catch (error) {
    throw error;
  }
};
