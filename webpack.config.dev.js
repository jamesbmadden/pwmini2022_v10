const path = require('path');

module.exports = [
  {...require('./webpack.config')[0], mode: 'development'},
  {...require('./webpack.config')[1], mode: 'development'}
];