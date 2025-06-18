const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true, maxlength: 1 }, // Assuming char like 'S', 'M', 'L'
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Size', SizeSchema);
