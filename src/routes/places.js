const Bookings = require('../models/bookings');

const simplifyResults = function (rawResults) {
  return rawResults.reduce((acc, row) => {
    const { name, place_id, vicinity: address } = row;
    acc.push({ place_id, name, address });
    return acc;
  }, []);
};

module.exports = async (ctx) => {
  try {
    const { data, status } = await ctx.places.get('hotel');
    ctx.response.statusCode = status;

    const userBookings = await Bookings.find({}, 'place_id');
    const allBookings = userBookings.reduce((res, { place_id }) => {
      res.push(place_id);
      return res;
    }, []);

    const formattedResults = simplifyResults(data.results);
    formattedResults.forEach(result => {
      result.booked = allBookings.includes(result.place_id)
    });

    ctx.body = JSON.stringify(formattedResults);
  } catch (e) {
    console.log(e);
    ctx.statusCode = 400;
    ctx.body = e.toString();
  }
};