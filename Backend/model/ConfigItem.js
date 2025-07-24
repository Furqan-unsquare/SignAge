const mongoose = require('mongoose');

// Font Schema
const fontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Color Schema
const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Size Schema
const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 },
  width: { type: Number },
  height: { type: Number }
}, { timestamps: true });

// Letter Charge Schema
const letterChargeSchema = new mongoose.Schema({
  initialCharge: { type: Number, required: true, min: 0, default: 1000 },
  subsequentCharge: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Export Models
module.exports = {
  Font: mongoose.model('Font', fontSchema),
  Color: mongoose.model('Color', colorSchema),
  Size: mongoose.model('Size', sizeSchema),
  LetterCharge: mongoose.model('LetterCharge', letterChargeSchema)
};