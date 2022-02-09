exports.successMessage = (res, statusCode, data, message, total) =>
  res.status(statusCode).send({
    data,
    status: message,
    total,
  });
