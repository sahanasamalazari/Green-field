const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  contact: String,
  workType: String,
  wage: Number,
  workDate: {
    type: Date,
    required: true,
  },
  crop: {
    type: String,
    required: true,
  },
  season: String,
  balance: Number,
  status: {
    type: String,
    enum: ['current', 'old', 'deleted'],
    default: 'current',
  },
}, { timestamps: true });

module.exports = mongoose.model('Labour', labourSchema);
