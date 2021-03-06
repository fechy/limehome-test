const Bookings = require('../models/bookings');

module.exports = async (ctx) => {
  let bookings = [];
  let error = null;

  try {
    bookings = await Bookings.find()
      .populate('user')
      .exec();
  } catch (e) {
    console.error(e);
    error = e.errors || e.errmsg || e.message || e
  }

  ctx.body = JSON.stringify({ bookings, error });
};