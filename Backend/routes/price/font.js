const express = require('express');
const router = express.Router();
const Font = require('../../model/price/font');

router.post('/', async (req, res) => {
  try {
    const font = new Font(req.body);
    await font.save();
    res.status(201).json(font);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const fonts = await Font.find().populate('color');
    res.json(fonts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Font.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Font.findByIdAndDelete(req.params.id);
    res.json({ message: 'Font deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
