const express = require('express');
const router = express.Router();
const Type = require('../../model/price/type');

router.post('/', async (req, res) => {
  try {
    const type = new Type(req.body);
    await type.save();
    res.status(201).json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const types = await Type.find().populate('color');
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Type.findByIdAndDelete(req.params.id);
    res.json({ message: 'Type deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
