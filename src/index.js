const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const consola = require('consola');

const address = require('./routes/address.routes');
const { connectDB } = require('./utils/connect.mongoose.utils');

connectDB()
  .then(() => consola.info(`database connected!!!`))
  .catch((error) => consola.error(error.message));

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/address', address);
app.use(
  '/api/v1/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(404);
});

app.use((err, req, res, next) =>
  res.status(err.statusCode || 500).send({
    success: false,
    message: err.message,
  })
);

module.exports = app;
