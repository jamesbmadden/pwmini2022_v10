const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');

module.exports = token => {
  try {
    const decodedToken = jwt.verify(token, functions.config().jwt.secret);
    return true;
  } catch (error) {
    throw error;
  }
};