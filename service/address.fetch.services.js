// @ts-check
const Address = require('../models/address.model');

exports.addressFetch = async () => {
  try {
    const count = await Address.find({}).count();
    const results = await Address.find({});

    return {
      results,
      count,
    };
  } catch (error) {
    throw error;
  }
};
