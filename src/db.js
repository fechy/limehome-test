const mongoose = require('mongoose');

module.exports = async (uri) => {
  mongoose.Promise = global.Promise;

  await mongoose.connect(uri, { useNewUrlParser: true });
  process.once('SIGUSR2', () => mongoose.connection.close(() => process.kill(process.pid, 'SIGUSR2')));

  return mongoose.connection.close.bind(mongoose.connection);
};