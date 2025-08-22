
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, X, Filter } from "lucide-react";
import Sidebar from "../components/Sidebar";

const AdminGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "acrylic",
    featured: false,
    image: "", // Store base64 string
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const productTypes = [
    { name: "Neon Photos", id: "Neon", },
    { name: "Acrylic Letter/Signboard", id: "acrylic" },
    { name: "Aluminium Channel Letter", id: "aluminium" },
    { name: "3D Steel Letters", id: "3d-steel" },
    { name: "CNC Laser & Router Cutting (2D/3D)", id: "laser-router" },
    { name: "Glow Signboard Fabrix & Flex", id: "glow-sign" },
    { name: "ACP Signboard", id: "acp" },
    { name: "Mandir Design / Jali Cutting", id: "photos" },
    { name: "Office Name Plate", id: "office-name" },
    { name: "Custom LED Screen / Scrolling Board", id: "led-scrolling" },
  ];

  const filterCategories = [
    { name: "All Projects", id: "all" },
    ...productTypes,
    { name: "Featured Projects", id: "featured" },
  ];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const result = await response.json();
        const projectData = Array.isArray(result) ? result : result.data || [];
        // Sort newest first
        const sorted = projectData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProjects(sorted);
        setFilteredProjects(sorted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    setVisibleCount(selectedCategory === "all" ? 4 : 12);
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else if (selectedCategory === "featured") {
      setFilteredProjects(projects.filter((project) => project.featured));
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // Store base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image smaller than 2MB");
    }
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const { title, category, image } = formData;

  if (!title.trim() || !category.trim() || !image.trim()) {
    alert("Title, category, and image are required.");
    return;
  }

  setIsSubmitting(true);

  try {
    const payload = {
      title,
      category,
      featured: formData.featured,
      image, // base64
    };

    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to add project");

    const { data } = await response.json();
    setProjects([data, ...projects]);
    resetForm();
    setIsModalOpen(false);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle project deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({ title: "", category: "acrylic", featured: false, image: "" });
  };

  // Get category name for display
  const getCategoryName = (id) => {
    const category = productTypes.find((type) => type.id === id);
    return category ? category.name : "Featured Projects";
  };

  // Group projects by category when filtered by "all"
  const groupedProjects = selectedCategory === "all"
    ? productTypes
        .reduce((acc, type) => {
          const categoryProjects = projects.filter((p) => p.category === type.id);
          if (categoryProjects.length > 0) {
            acc.push({
              category: type.id,
              projects: categoryProjects.slice(0, visibleCount),
            });
          }
          return acc;
        }, [])
        .concat(
          projects.filter((p) => p.featured).length > 0
            ? { category: "featured", projects: projects.filter((p) => p.featured).slice(0, visibleCount) }
            : []
        )
    : [
        {
          category: selectedCategory,
          projects: filteredProjects.slice(0, visibleCount),
        },
      ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto mt-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Gallery Management</h2>
              <p className="text-gray-600 mt-2">Manage your project gallery</p>
            </div>
            <div className="relative mt-4 md:mt-0">
              <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm px-3 py-2 border">
                <Filter className="h-5 w-5 text-green-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 px-2 text-gray-700 focus:outline-none"
                >
                  {filterCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label="Add project"
          >
            <Plus className="h-6 w-6" /> 
          </motion.button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EA3C1F]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-600 py-8">No projects found. Add your first project!</div>
          ) : (
            <div className="space-y-8">
              {groupedProjects.map((group) => (
                <div key={group.category} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-green-600 via-green-300 to-gray-100 rounded-lg px-4 py-2 max-w-sm"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {getCategoryName(group.category)}
                      {group.category === "featured" && " ★"}
                    </h3>
                  </motion.div>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {group.projects.map((project) => (
                      <motion.div
                        key={project._id}
                        className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <Suspense fallback={<div className="w-full h-48 bg-gray-200 animate-pulse"></div>}>
                          <img
                            src={project.image || "https://i.pinimg.com/736x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg"}
                            alt={project.title}
                            className="w-full h-60 object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "https://i.pinimg.com/736x/d8/fe/c7/d8fec7801132a9a4f9c530b98396e295.jpg";
                            }}
                          />
                        </Suspense>
                        <div className="px-4 py-2 absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black/60">
                          <h4 className="text-lg font-semibold text-gray-50 truncate">{project.title}</h4>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-200 capitalize">{project.category}</span>
                            {project.featured && (
                              <span className="px-2 py-1 text-xs bg-[#FDCA07] text-gray-800 rounded-full">Featured</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          aria-label="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
              {visibleCount < filteredProjects.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Add New Project</h3>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border text-gray-800 rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                        placeholder="Project title"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:ring-2 focus:ring-[#EA3C1F] focus:border-[#EA3C1F]"
                      >
                        {productTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-[#EA3C1F] focus:ring-[#EA3C1F] border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                        Featured Project
                      </label>
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Image (max 2MB) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg file:mr-2 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        required
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="mt-2 rounded-lg max-h-40 object-contain border"
                        />
                      )}
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.image}
                        className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-md transition-all ${
                          isSubmitting || !formData.image ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Adding..." : "Add Project"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminGallery;
