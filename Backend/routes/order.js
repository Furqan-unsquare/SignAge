const express = require('express');
const router = express.Router();
const UserOrder = require('../model/order'); // Ensure path is correct

// ✅ Create Order
router.post('/', async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const {
            inputText,
            color,
            size,
            type,
            font,
            addOns, // ✅ make sure it's included
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
            addOns,
            totalPrice,
            discount,
            isPaid
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error("Error saving order:", err);
        res.status(400).json({ error: err.message });
    }
});

// ✅ Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await UserOrder.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update Order
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

// ✅ Delete Order
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
