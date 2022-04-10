const express = require('express');
const router = express.Router();

const {
  getAllAddress,
  createOneAddress,
  createNewAddress,
  updateOneAddress,
  deleteOneAddress,
  getOneAddress,
} = require('../controller/address.controller');

const {
  validateRequestBody,
  validateContentType,
  validateId,
} = require('../middleware/validation');

router
  .route('/')
  .get(getAllAddress)
  .post(validateRequestBody, validateContentType, createNewAddress);

router
  .route('/:id')
  .get(validateId, getOneAddress)
  .delete(validateId, deleteOneAddress)
  .patch(validateId, updateOneAddress);

module.exports = router;
