const express = require('express');
const router = express.Router();
const SignageType = require('../model/SignageType');

router.get('/', async (req, res) => {
  const types = await SignageType.find();
  res.json(types);
});

router.post('/', async (req, res) => {
  const type = new SignageType(req.body);
  await type.save();
  res.status(201).json(type);
});

module.exports = router;
