const express = require('express');
const router = express.Router();
const Color = require('../../model/price/color');

// Create
router.post('/', async (req, res) => {
    try {
        const color = new Color(req.body);
        await color.save();
        res.status(201).json(color);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all
router.get('/', async (req, res) => {
    try {
        const colors = await Color.find();
        res.json(colors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedColor = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedColor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Color.findByIdAndDelete(req.params.id);
        res.json({ message: 'Color deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
