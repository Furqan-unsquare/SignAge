const express = require('express');
const router = express.Router();
const { Font, Color, Size, LetterCharge } = require('../model/ConfigItem');

const setupCrudRoutes = (model, path) => {
  router.get(`/${path}`, async (req, res) => {
    const items = await model.find({ signageTypeId: req.query.signageTypeId });
    res.json(items);
  });

  router.post(`/${path}`, async (req, res) => {
    const item = new model({ ...req.body, signageTypeId: req.body.signageTypeId });
    await item.save();
    res.status(201).json(item);
  });

  router.get(`/${path}/:id`, async (req, res) => {
    const item = await model.findById(req.params.id);
    res.json(item || {});
  });

  router.put(`/${path}/:id`, async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  });

  router.delete(`/${path}/:id`, async (req, res) => {
    await model.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });
};

setupCrudRoutes(LetterCharge, 'letter-charges');
setupCrudRoutes(Font, 'fonts');
setupCrudRoutes(Color, 'colors');
setupCrudRoutes(Size, 'sizes');

module.exports = router;
