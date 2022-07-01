// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Tutorial Schema
//= ===============================
const TutorialSchema = new Schema({
  title: {
    type    : String,
    unique  : true,
    required: true
  },
  owner: {
    type    : mongoose.ObjectId,
    required: true
  },
  content: {
    type    : String,
    required: true
  },
  tags: [{
    type: String
  }],
  comments: [{
    author: {
      type: mongoose.ObjectId
    },
    title: {
      type: String
    },
    content: {
      type: String
    }
  }],
  ratingStats: {
    avgRating: Number,
    star1    : Number,
    star2    : Number,
    star3    : Number,
    star4    : Number,
    star5    : Number
  },
  ratings: [{
    type: mongoose.ObjectId
  }]
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Tutorial', TutorialSchema);
