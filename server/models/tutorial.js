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
    type: mongoose.ObjectId
  }],
  ratings: [{
    type: mongoose.ObjectId
  }]
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Tutorial', TutorialSchema);
