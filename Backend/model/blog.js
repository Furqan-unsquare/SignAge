const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema); 