const development = require('./development');
const version = require('./version');
const optimize = require('./optimize');

module.exports = [
  development,
  optimize,
  version
];
