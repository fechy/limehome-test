const result = require('dotenv').config();
if (result.error) {
  throw result.error
}

module.exports = {
  port: process.env.PORT || 3000,
  places: {
    baseURL: 'https://maps.googleapis.com/maps/api/place/',
    api_key: process.env.GOOGLE_PLACES_API_KEY || null,
    hardcoded_user_location: process.env.HARDCODED_USER_LOCATION || null
  },
  db: {
    conn: process.env.MONGO_DB_CONNECTION || null
  }
};