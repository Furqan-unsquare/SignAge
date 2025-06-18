const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Color', ColorSchema);
