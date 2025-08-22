import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Loader } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Blogpanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Initial visible count
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  
 const [formData, setFormData] = useState({
  title: '',
  description: '',
});
// const [imageFile, setImageFile] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL; // Vite
  

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`);
      const data = await response.json(); 
       // Sort newest first
    const sorted = data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
      setBlogs(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchBlogs();
}, []);

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // ✅ base64 string
      }));
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select an image smaller than 2MB");
  }
};


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) {
    setImageFile(file);
  } else {
    alert("Please select an image smaller than 2MB");
  }
};


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form (create or update)
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      image: formData.image, // ✅ base64 image string
    };

    const url = currentBlog
      ? `${API_BASE_URL}/api/blogs/${currentBlog._id}`
      : `${API_BASE_URL}/api/blogs`;

    const method = currentBlog ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to save blog');

    await fetchBlogs();

    // Reset
    setShowForm(false);
    setCurrentBlog(null);
    setFormData({ title: '', description: '', image: '' });
    setImageFile(null);
  } catch (error) {
    console.error('Error saving blog:', error);
  } finally {
    setLoading(false);
  }
};



  // Edit blog
  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      image: blog.image,
      title: blog.title,
      description: blog.description
    });
    setShowForm(true);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Add token if required
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Delete failed: ${response.status} - ${errorText}`);
      }

      // Refresh data without page reload
      await fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
         {loading ? (
        // Loader only for main content
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <div className="w-12 h-12 border-4 border-emerald-500 border-dashed rounded-full animate-spin" />
        </div>
      ) : (
        <>
        <div className="flex justify-between items-center mb-4 mt-6 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Blog Management</h1>
          <button
            onClick={() => {
              setCurrentBlog(null);
              setFormData({
                image: '',
                title: '',
                description: ''
              });
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
        
        {/* Blog List */}
       {blogs.length === 0 && !loading ? (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">No blog posts found. Create your first post!</p>
  </div>
) : (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.slice(0, visibleCount).map(blog => (
        <BlogCard 
          key={blog._id}
          blog={blog}
          onEdit={() => handleEdit(blog)}
          onDelete={() => handleDelete(blog._id)}
        />
      ))}
    </div>
  

    {/* Load More Button */}
    {visibleCount < blogs.length && (
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Load More
        </button>
      </div>
    )}
  </>
)}
        </>
      )}

      </main>

      {/* Blog Form Modal - Now outside main content */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image<span className="text-red-500">*</span>
                  </label>
<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
/>
{formData.image && (
  <img
    src={formData.image}
    alt="Preview"
    className="mt-2 rounded-lg max-h-40 object-contain border"
  />
)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                    placeholder="Blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                    placeholder="Write your blog content here..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader className="animate-spin h-5 w-5" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    {currentBlog ? 'Update' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
};

// Blog Card Component
const BlogCard = ({ blog, onEdit, onDelete }) => {
  const imageUrl = blog.image;


  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col border border-gray-100">
      <img
  src={imageUrl || 'https://i.pinimg.com/736x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg'}
  alt={blog.title}
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.target.src = 'https://i.pinimg.com/736x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg';
  }}
/>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {blog.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-emerald-600 hover:text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Edit"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Blogpanel;