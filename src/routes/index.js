const places = require('./places');
const book = require('./book');

// API endpoints
module.exports = function (router) {

  // - List of places
  router.get('places', '/api/places', places);

  // - Book a place
  router.post('book_place', '/api/book/:id', book);

  // Redirect all others NOT API to root
  router.redirect('/*', '/');
};