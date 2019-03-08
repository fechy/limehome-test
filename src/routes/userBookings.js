const Bookings = require('../models/bookings');

module.exports = async (ctx) => {
  let bookings = [];
  let error = null;

  try {
    const { user_id } = ctx.params;
    if (user_id !== ctx.session.user_id) {
      throw new Error('You dont have permission to access this resource');
    }

    bookings = await Bookings.find({ user: user_id })
      .populate('user')
      .exec();
  } catch (e) {
    console.error(e);
    error = e.errors || e.errmsg || e.message || e
  }

  ctx.body = JSON.stringify({ bookings, error });
};