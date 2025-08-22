const Blog = require('../model/blog');
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL || 'http://localhost:5000' : 'https://api.acrylicsignboards.in';

// CREATE: New Blog
const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!image || !title || !description) {
      return res.status(400).json({ message: 'Image, title, and description are required' });
    }

    // Extract base64 data
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    const contentType = matches[1]; // e.g., image/png
    const buffer = Buffer.from(matches[2], 'base64');

    const blog = new Blog({
      title,
      description,
      image: {
        data: buffer,
        contentType,
      },
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', data: blog });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// READ: Get All Blogs
const getBlogs = async (req, res) => {
   try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    const formattedBlogs = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      createdAt: blog.createdAt,
      image: blog.image?.data
        ? `data:${blog.image.contentType};base64,${blog.image.data.toString('base64')}`
        : null,
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error while fetching blogs' });
  }
};

// READ: Get Blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const formattedBlog = {
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      createdAt: blog.createdAt,
      image: blog.image?.data
        ? `data:${blog.image.contentType};base64,${blog.image.data.toString('base64')}`
        : null,
    };

    res.json(formattedBlog);
  } catch (err) {
    console.error('Error fetching blog by ID:', err);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE: Blog by ID
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


// DELETE: Blog by ID
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

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
