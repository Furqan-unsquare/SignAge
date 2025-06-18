const express = require('express');
const router = express.Router();
const Size = require('../../model/price/size');

router.post('/', async (req, res) => {
  try {
    const size = new Size(req.body);
    await size.save();
    res.status(201).json(size);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find();
    res.json(sizes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Size.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Size.findByIdAndDelete(req.params.id);
    res.json({ message: 'Size deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
