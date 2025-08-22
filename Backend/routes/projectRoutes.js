const express = require('express');
const router = express.Router();
const { getProjects, createProject, deleteProject } = require('../controllers/projectController');
const upload = require('../config/multer');

// GET: Fetch all projects
router.get('/', getProjects);

// POST: Create a project with optional image upload
router.post('/', upload.single('image'), createProject);

// DELETE: Delete a project by ID
router.delete('/:id', deleteProject);

module.exports = router; 