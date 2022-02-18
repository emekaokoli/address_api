// @ts-check
const mongoosose = require('mongoose');
const createError = require('http-errors');

const { successMessage } = require('../utils/reponse');
const { statusTypes } = require('../utils/constants/statusTypes');
const { addressFetch } = require('../service/address.fetch.services');
const { addressPost } = require('../service/address.post.service');
const { addressFetchOne } = require('../service/address.fetchOne.service');
const { addressDeleteOne } = require('../service/address.delete.service');
const { addressUpdateOne } = require('../service/address.update.service');

/**
 * @description gets all data in the database
 * @memberof GET
 * @param req
 * @param res
 * @returns {json} json
 */
exports.getAllAddress = async (req, res, next) => {
  try {
    const { results, count } = await addressFetch();
    successMessage(res, 200, results, 'success', count);
  } catch (error) {
    next(error);
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
    const results = await addressPost({
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
    successMessage(res, 201, results, 'Success');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(createError(422, error.message));
    }
    next(error);
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
    const results = await addressFetchOne(id);

    if (!results) {
      return next(createError(404, 'this record does not exist'));
    }

    successMessage(res, 200, results, 'success');
  } catch (error) {
    if (error instanceof mongoosose.CastError) {
      next(createError(500, error.message));
      return;
    }
    next(error);
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
    const deletedItem = await addressDeleteOne(id);

    if (!deletedItem) {
      throw createError(404, `${id} does not exist`);
    }

    successMessage(res, 204);
  } catch (error) {
    if (error instanceof mongoosose.CastError) {
      return next(createError(500, error.message));
    }
    next(createError(409, error.message));
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
    let addressResults = await addressFetchOne(id);
    if (!addressResults) return next(createError(404, 'Record not found'));

    const { status } = addressResults;

    const transFormedStatus = status.toLowerCase();

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
      addressResults = await addressUpdateOne(
        id,
        {
          $set: {
            name,
            email,
            status: statuses,
          },
        },
        { new: true },
      );
    }
    await addressResults.save();
    if (!result) return next(createError(404, 'Record not found'));

    return successMessage(res, 200, '', 'update success');
  } catch (error) {
    if (error instanceof mongoosose.CastError) {
      return next(createError(404, error.message));
    }
    next(createError(422, `${error.message}`));
  }
};

exports.Destroy = async (req, res, next) => {
  next(createError(403, 'Update operation not supported without ID'));
};

exports.Put = async (req, res, next) => {
  next(createError(403, 'Update operation not supported without ID'));
};

exports.Post = async (req, res, next) => {
  next(
    createError(
      403,
      `Update operation not supported, please remove ${req.params.id} before posting new data`,
    ),
  );
};
