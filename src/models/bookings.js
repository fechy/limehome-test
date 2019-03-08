const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  property_id: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  property_name: {
    type: String,
    required: true,
  },
  city: {
    type: String
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
