/* eslint no-var: 0 */
const config = require('./webpack/webpack.config');
const result = config();
module.exports = result;