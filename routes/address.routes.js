const express = require('express');
const {
  getAllAddress,
  createOneAddress,
  createNewAddress,
  updateOneAddress,
  deleteOneAddress,
  Put,
  Destroy,
  getOneAddress,
  Post,
} = require('../controller/address.controller');
const { validateRequests, validateReqBody } = require('../utils/validateReqBody');
const validate = require('../utils/validation');
const router = express.Router();

router
  .route('/')
  .get(getAllAddress)
  .post(validateReqBody(), validateRequests, validate, createNewAddress)
  .delete(Destroy)
  .put(Put);

router
  .route('/:id')
  .get(getOneAddress)
  .post(Post)
  .delete(deleteOneAddress)
  .patch(validateReqBody(),updateOneAddress);

module.exports = router;
