const development = require('./development');
const version = require('./version');
const optimize = require('./optimize');
const style = require('./style');

module.exports = [
  development,
  optimize,
  version,
  style,
];
