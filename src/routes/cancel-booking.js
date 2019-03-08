const Bookings = require('../models/bookings');

module.exports = async (ctx) => {
  const { id } = ctx.params;
  try {
    const booking = await Bookings.findOne({
      property_id: id,
      user: ctx.user.id
    });
    if (!booking) {
      throw new Error(`There is no booking for the given place`);
    }

    await booking.delete();

    ctx.body = JSON.stringify({ ok: true });
  } catch (e) {
    console.error(e);
    ctx.body = JSON.stringify({
      ok: false,
      error: e.errors || e.errmsg || e.message || e
    });
  }
};