const mongoose = require('mongoose');

const signageTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('SignageType', signageTypeSchema);
