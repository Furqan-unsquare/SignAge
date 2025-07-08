const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const upload = require('../config/multer'); // your multer config

// With upload middleware
router.post('/', createBlog); // ✅ no upload middleware
router.get('/', getBlogs);
router.get('/:id/image', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || !blog.image || !blog.image.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', blog.image.contentType);
    res.send(blog.image.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', getBlogById);
router.put('/:id', updateBlog); // ✅ no upload middleware
router.delete('/:id', deleteBlog);

module.exports = router;
