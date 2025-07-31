const Project = require('../model/Project');

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL || 'http://localhost:5000' : 'https://api.acrylicsignboards.in';

// GET: Fetch all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json( projects );
  } catch (error) {
    console.error('Error fetching projects:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

// POST: Create a new project
const createProject = async (req, res) => {
  try {
    const { title, category, featured, image } = req.body;

    let imageUrl = image;

    if (req.file) {
      imageUrl = `${baseUrl}/images/${req.file.filename}`;
    }

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ message: 'Title, category, and image are required' });
    }

    const project = new Project({
      title,
      category,
      featured: featured === 'true' || featured === true,
      image: imageUrl,
    });

    await project.save();

    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// DELETE: Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProjects, createProject, deleteProject };