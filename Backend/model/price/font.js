const mongoose = require('mongoose');

const FontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});


module.exports = mongoose.model('Font', FontSchema);
