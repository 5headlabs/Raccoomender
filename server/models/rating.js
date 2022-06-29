// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Rating Schema
//= ===============================
const RatingSchema = new Schema({
  owner: {
    type    : mongoose.ObjectId,
    unique  : true,
    required: true
  },
  score: {
    type    : Number,
    required: true
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Rating', RatingSchema);