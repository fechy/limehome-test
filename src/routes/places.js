const Bookings = require('../models/bookings');

const simplifyResults = function (rawResults) {
  return rawResults.reduce((acc, row) => {
    const {
      name: property_name,
      place_id: property_id,
      vicinity: address
    } = row;
    acc.push({ property_id, property_name, address });
    return acc;
  }, []);
};

module.exports = async (ctx) => {
  try {
    const { data, status } = await ctx.places.get('hotel');
    ctx.response.statusCode = status;

    const userBookings = await Bookings.find({}, 'property_id');
    const allBookings = userBookings.reduce((res, { property_id }) => {
      res.push(property_id);
      return res;
    }, []);

    const formattedResults = simplifyResults(data.results);
    formattedResults.forEach(result => {
      result.booked = allBookings.includes(result.property_id)
    });

    ctx.body = JSON.stringify(formattedResults);
  } catch (e) {
    console.error(e);
    ctx.statusCode = 400;
    ctx.body = e.toString();
  }
};