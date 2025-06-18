const express = require('express');
const router = express.Router();
const UserOrder = require('../model/order'); // Make sure model path is correct

// Create Order
router.post('/', async (req, res) => {
    try {
        const {
            inputText,
            color,
            size,
            type,
            font,
            totalPrice,
            discount,
            isPaid
        } = req.body;

        const order = new UserOrder({
            inputText,
            color,
            size,
            type,
            font,
            totalPrice,
            discount,
            isPaid
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await UserOrder.find()
            .populate('color')
            .populate('size')
            .populate('type')
            .populate('font')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Order (edit any field including payment status)
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await UserOrder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await UserOrder.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
