const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RatingSchema = new Schema({
  owner: {
    type:     mongoose.ObjectId,
    required: true,
    ref:      'User'
  },
  score: {
    type:     Number,
    required: true
  },
  tutorial: {
    type:     mongoose.ObjectId,
    required: true,
    ref:      'Tutorial'
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Rating', RatingSchema);