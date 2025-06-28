const Blog = require('../model/blog');

// POST: Create a new blog
const createBlog = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    if (!image || !title || !description) {
      return res.status(400).json({ message: 'Image, title, and description are required' });
    }

    const blog = new Blog({ image, title, description });
    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Fetch all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: Fetch single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT: Update a blog
const updateBlog = async (req, res) => {
  try {
    const { image, title, description } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.image = image || blog.image;
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    
    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE: Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };