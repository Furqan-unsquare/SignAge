const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema({
    inputText: {
        type: String,
        required: true
    },
    color: {
        type: String,
        ref: 'Color',
        required: true
    },
    size: {
        type: String,
        ref: 'Size',
        required: true
    },
    type: {
        type: String,
        ref: 'Type',
        required: true
    },
    font: {
        type: String,
        ref: 'Font',
        required: true
    },
    addOns: {
        type: [String], // 👈 NEW FIELD
        default: []
    },
    totalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserOrder', UserOrderSchema);
