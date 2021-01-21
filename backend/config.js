const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/IN-prototype',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'somethingsecret',
//   JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
//   accessKeyId: process.env.accessKeyId || 'accessKeyId',
//   secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};