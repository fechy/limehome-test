const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  property_id: {
    type: String,
    required: true,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  bookedAt: {
    type: Date
  }
}, { versionKey: false });

const Bookings = mongoose.model('Bookings', schema);

module.exports = Bookings;
