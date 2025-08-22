const express = require('express');
const router = express.Router();
const Enquiry = require('../model/enquiry');

// 🔸 Submit an enquiry (Create)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const enquiry = new Enquiry({ name, email, phone, message });
        await enquiry.save();

        res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔹 Get all enquiries (Admin use)
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ❌ Delete an enquiry
router.delete('/:id', async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Enquiry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
