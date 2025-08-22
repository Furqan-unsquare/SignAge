const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    // trim: true,
  },
 category: { 
  type: String,
  required: true,
  enum: [
    "Neon",
    "acrylic",
    "aluminium",
    "3d-steel",
    "laser-router",
    "glow-sign",
    "acp",
    "photos",
    "office-name",
    "led-scrolling",
    "featured"
  ],
},

  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);