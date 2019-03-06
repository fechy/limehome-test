const places = require('./places');
const book = require('./book');
const cancelBooking = require('./cancel-booking');
const bookings = require('./bookings');

// API endpoints
module.exports = function (router) {

  // - List of places
  router.get('/api/places', places);

  // - Book a place
  router.post('/api/book/:id', book);

  // - Cancel a booking
  router.post('/api/book/:id/cancel', cancelBooking);

  // - List of bookings
  router.get('/api/bookings', bookings);

  // Redirect all others NOT API to root
  router.redirect('/*', '/');
};