const mongoose = require('mongoose');

// Font Schema
const fontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 },
  preview: { type: String }
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

// AddOn Schema
const addOnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Letter Charge Schema
const letterChargeSchema = new mongoose.Schema({
  charge: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Export Models
module.exports = {
  Font: mongoose.model('Font', fontSchema),
  Color: mongoose.model('Color', colorSchema),
  Size: mongoose.model('Size', sizeSchema),
  AddOn: mongoose.model('AddOn', addOnSchema),
  LetterCharge: mongoose.model('LetterCharge', letterChargeSchema)
};
