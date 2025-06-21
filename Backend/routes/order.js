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
            phoneNumber,
            totalPrice,
            orderId,
            isPaid
        } = req.body;

        // Validate required fields
        if (!inputText || !color || !size || !type || !font || !phoneNumber || totalPrice == null) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if orderId is unique if provided
        if (orderId) {
            const existingOrder = await UserOrder.findOne({ orderId });
            if (existingOrder) {
                return res.status(400).json({ error: 'Order ID already exists' });
            }
        }

        const order = new UserOrder({
            inputText,
            color,
            size,
            type,
            font,
            mobile: phoneNumber,
            totalPrice: parseFloat(totalPrice),
            orderId: orderId || undefined, // Allow MongoDB to generate _id if orderId is not provided
            isPaid: !!isPaid
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
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update Order
router.put('/:id', async (req, res) => {
    try {
        const orderId = req.params.id; // Use id from URL
        const updatedOrder = await UserOrder.findOneAndUpdate(
            { orderId }, // Find by orderId field
            {
                $set: {
                    inputText: req.body.inputText,
                    color: req.body.color,
                    size: req.body.size,
                    type: req.body.type,
                    font: req.body.font,
                    mobile: req.body.mobile,
                    totalPrice: parseFloat(req.body.totalPrice) || 0,
                    isPaid: !!req.body.isPaid
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(400).json({ error: err.message });
    }
});

// ✅ Delete Order
router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id; // Use id from URL
        const deletedOrder = await UserOrder.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;