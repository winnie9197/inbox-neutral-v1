const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/IN-prototype',
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || 'id',
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || 'client_secret',
  AUTH_REDIRECT_URL: process.env.REACT_APP_AUTH_REDIRECT_URL || 'url',
  SESSION_SECRET: process.env.SESSION_SECRET || 'session_secret',
//   JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
//   accessKeyId: process.env.accessKeyId || 'accessKeyId',
//   secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};