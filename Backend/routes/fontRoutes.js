const express = require('express');
const router = express.Router();
const { getAllFontsWithFileInfo, createFont, updateFont, deleteFont } = require('../controllers/fontFiles');

router.get("/files", getAllFontsWithFileInfo);
router.post("/files", createFont); // Create
router.put("/files/:id", updateFont); // Update
router.delete("/files/:id", deleteFont); // Delete

module.exports = router;