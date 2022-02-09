// @ts-check
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const apicache = require('apicache');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const address = require('./routes/address.routes');
const { connectDB } = require('./service/address.mongoose.service');

connectDB();
//const cache = apicache.middleware;
const app = express();
app.use(cors());
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use(cache('5 minutes'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// });

app.use('/api/v1/address', address);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(404);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  return err.statusCode
    ? res.status(err.statusCode).send({
        Error: {
          status: err.statusCode,
          message: err.message,
        },
      })
    : res.status(500).send({
        Error: {
          status: 500,
          message: err.message,
        },
      });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`[address-api] Listening on ${port}`);
});

module.exports = app;
