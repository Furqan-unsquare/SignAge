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

module.exports = { createBlog, getBlogs };