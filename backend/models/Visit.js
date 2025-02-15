const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  visitors: {
    type: Number,
    default: 0
  },
  pageViews: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    enum: ['direct', 'search', 'referral', 'social'],
    default: 'direct'
  }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);