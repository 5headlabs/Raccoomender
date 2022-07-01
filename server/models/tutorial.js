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
    required: true,
    ref     : 'User'
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
      type: mongoose.ObjectId,
      required: true,
      ref : 'User'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    published: {
      type: Date,
      required: true
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
    type: mongoose.ObjectId,
    ref : 'Rating'
  }]
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Tutorial', TutorialSchema);
