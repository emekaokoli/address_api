// @ts-check
const mongoosose = require('mongoose');
const createError = require('http-errors');

const statusTypes = require('../constants/statusTypes');
const {
  getAddress,
  postAddress,
  getOneAddressById,
  deleteOneAddressById,
  updateOneAddressById,
} = require('../service/address.service');

/**
 * @description gets all data in the database
 * @memberof GET
 * @param req
 * @param res
 * @returns {json} json
 */
exports.getAllAddress = async (req, res, next) => {
  try {
    const { results, count } = await getAddress();
    return res.status(200).send({
      success: true,
      count,
      results,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @description posts data to the database
 * @memberof Create
 * @param req
 * @param res
 * @returns {json} json
 */
exports.createNewAddress = async (req, res, next) => {
  const {
    country,
    city,
    street,
    postalcode,
    number,
    numberAddition,
    status,
    name,
    email,
  } = req.body;
  try {
    const results = await postAddress({
      country,
      city,
      street,
      postalcode,
      number,
      numberAddition,
      status,
      name,
      email,
    });

    res.location(`/api/v1/address/${results.id}`);
    return res.status(201).send({
      success: true,
      results,
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * @description gets one data in the database by id
 * @memberof get/:id
 * @param req
 * @param res
 * @returns {json} json
 */
exports.getOneAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await getOneAddressById(id);

    if (!results) {
      return next(createError(404, 'this record does not exist'));
    }

    return res.status(200).send({
      success: true,
      results,
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * @description Deletes one data in the database by id
 * @memberof Delete/:id
 * @param req
 * @param res
 * @returns {json} json
 */
exports.deleteOneAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedItem = await deleteOneAddressById(id);

    if (!deletedItem) {
      throw createError(404, 'id does not exist');
    }

    return res.status(200).send({
      success: true,
      message: 'address deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * @description updates one data in the database by id
 * @memberof Update/:id
 * @param req
 * @param res
 * @returns {json} json
 */
exports.updateOneAddress = async (req, res, next) => {
  const { id } = req.params;

  const { name, email, status: statuses } = req.body;

  try {
    let addressResults = await getOneAddressById(id);
    if (!addressResults)
      return next(createError(404, 'Record not found'));

    const { status } = addressResults;

    const transFormedStatus = status?.toLowerCase();

    if (transFormedStatus === statusTypes.notInterested) {
      return next(createError(403, 'user is not interested'));
    }
    if (transFormedStatus === statusTypes.interested) {
      return next(createError(403, 'user is already interested'));
    }
    if (
      transFormedStatus === statusTypes.notAtHome ||
      transFormedStatus === statusTypes.none
    ) {
      addressResults = await updateOneAddressById(
        id,
        {
          $set: {
            name,
            email,
            status: statuses,
          },
        },
        { new: true }
      );
    }
    await addressResults.save();
    if (!addressResults)
      return next(createError(404, 'Record not found'));

    return res.status(200).send({
      success: true,
      results: addressResults,
    });
  } catch (error) {
    return next(error);
  };
};
