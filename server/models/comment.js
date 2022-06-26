// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Comment Schema
//= ===============================
const CommentSchema = new Schema({
  owner: {
    type: mongoose.ObjectId,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Comment', CommentSchema);