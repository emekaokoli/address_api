const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const consola = require('console');

const connect = mongoose.connect(process.env.DB_URL);

exports.connectDB = async () =>  await connect;
 

