const places = require('./places');
const book = require('./book');
const cancelBooking = require('./cancel-booking');
const bookings = require('./bookings');
const userBookings = require('./userBookings');
const userSessionMiddleware = require('./middlewares/user-session');

// API endpoints
module.exports = function (router) {

  // - List of places
  router.get('/api/places', userSessionMiddleware, places);

  // - Book a place
  router.post('/api/book/:id', userSessionMiddleware, book);

  // - Cancel a booking
  router.post('/api/book/:id/cancel', userSessionMiddleware, cancelBooking);

  // - List of bookings
  router.get('/api/bookings', userSessionMiddleware, bookings);

  // - List of current user's bookings
  router.get('/api/user/:user_id/bookings', userSessionMiddleware, userBookings);

  // Redirect all others NOT API to root
  router.redirect('/*', '/');
};