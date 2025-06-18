const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema({
    inputText: {
        type: String,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size',
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    font: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Font',
        required: true
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
