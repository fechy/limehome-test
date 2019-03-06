const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  place_id: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  bookedAt: {
    type: Date
  }
});

const Bookings = mongoose.model('Bookings', schema);

module.exports = Bookings;
