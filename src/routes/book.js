const ObjectId = require('mongoose').Types.ObjectId;
const Bookings = require('../models/bookings');

function extractCityFromAddress(formattedAddress) {
  const cleaned = formattedAddress.split(',')
    .map(v => v.trim());

  const city = cleaned[cleaned.length - 2].match(/([a-z\u00F0-\u02AF\s]{1,})$/i);
  if (city.length > 0) {
    return city[0].trim();
  }

  return formattedAddress;
}

module.exports = async (ctx) => {
  const { id } = ctx.params;
  let statusCode = 400;
  try {
    const { data, status } = await ctx.places.getPlaceDetails(id);

    if (status !== 200) {
      statusCode = 404;
      throw new Error(`Cannot find details for given place. Error No: ${status}`);
    }

    if (await Bookings.count({ property_id: id, user: ctx.user.id }) > 0) {
      throw new Error(`You already have a booking for the given place`);
    }

    const { result: { name, formatted_address } } = data;

    const modelData = {
      property_id: id,
      property_name: name,
      address: formatted_address,
      city: extractCityFromAddress(formatted_address),
      user: ObjectId(ctx.user.id),
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