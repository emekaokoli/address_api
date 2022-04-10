// @ts-check
const Address = require('../models/address.model');

exports.getAddress = async () => {
  const count = await Address.find({}).count();
  const results = await Address.find({});

  return {
    results,
    count,
  };
};
exports.postAddress = async (requestBody) => await Address.create(requestBody);
exports.getOneAddressById = async (id) => await Address.findById(id).exec();
exports.updateOneAddressById = async (id, requestBody) => await Address.findByIdAndUpdate(id, requestBody).exec();
exports.deleteOneAddressById = async (id) => await Address.findByIdAndDelete(id);
