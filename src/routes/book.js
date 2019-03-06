const Bookings = require('../models/bookings');

module.exports = async (ctx) => {
  const { id } = ctx.params;
  let statusCode = 400;
  try {
    const { data, status } = await ctx.places.getPlaceDetails(id);

    if (status !== 200) {
      statusCode = 404;
      throw new Error(`Cannot find details for given place. Error No: ${status}`);
    }

    if (await Bookings.count({ place_id: id }) > 0) {
      throw new Error(`You already have a booking for the given place`);
    }

    const { result: { name, formatted_address } } = data;

    const modelData = {
      place_id: id,
      name,
      address: formatted_address,
      bookedAt: new Date().toDateString()
    };

    const booking = await Bookings.create(modelData);

    ctx.response.statusCode = 200;
    ctx.body = JSON.stringify({ ok: true, booking });
  } catch (e) {
    ctx.response.statusCode = statusCode;
    ctx.body = JSON.stringify({
      ok: false,
      error: e.errors || e.errmsg || e.message || e
    });
  }
};