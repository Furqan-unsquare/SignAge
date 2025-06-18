const mongoose = require('mongoose');

const FontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true }
});

module.exports = mongoose.model('Font', FontSchema);
