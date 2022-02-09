const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connect = mongoose.connect(process.env.DB_URL);

exports.connectDB = () => {
  connect.then(
    (db) => {
      console.log('db connected correctly');
    },
    (err) => {
      console.log(err);
    },
  );
};
