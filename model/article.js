const mongoose = require('mongoose')

var articleSchema = new mongoose.Schema({
  title: String,
  up: Number,
  comment: Number,
  view: Number,
  author: String,
  publish_time: Date
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article