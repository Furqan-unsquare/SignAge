const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true // optional, only if you want each ID to be unique
    },
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
    totalPrice: {
        type: Number,
        required: true
    },
    mobile: {
    type: String,
    required: true
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
