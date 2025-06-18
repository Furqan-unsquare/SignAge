// src/pages/EnquiryListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import {
  User,
  Mail,
  Eye,
  Edit,
  Trash,
  ChevronUp,
  ChevronDown,
  Search,
} from 'lucide-react';
import authHeader from '../utils/authHeader';

const backendUrl = 'http://localhost:5000';

const EnquiryListPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage] = useState(5);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/enquiry`, authHeader());
        setEnquiries(res.data);
        setFilteredEnquiries(res.data);
      } catch (err) {
        console.error('Failed to fetch enquiries:', err);
      }
    };
    fetchEnquiries();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = enquiries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, enquiries]);

  // Handle sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sorted = [...filteredEnquiries].sort((a, b) => {
      if (field === 'createdAt') {
        return order === 'asc'
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      }
      return order === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });
    setFilteredEnquiries(sorted);
  };

  // Pagination
  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);
  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);

  // Handle actions
  const handleView = (id) => {
    console.log(`Viewing enquiry ${id}`);
    // Implement view logic (e.g., navigate to details page)
  };

  const handleEdit = (id) => {
    console.log(`Editing enquiry ${id}`);
    // Implement edit logic (e.g., navigate to edit page)
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await axios.delete(`${backendUrl}/api/enquiry/${id}`, authHeader());
        setEnquiries(enquiries.filter((entry) => entry._id !== id));
        setFilteredEnquiries(filteredEnquiries.filter((entry) => entry._id !== id));
      } catch (err) {
        console.error('Failed to delete enquiry:', err);
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-x-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">User Feedbacks</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-96 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Enquiry Table */}
        {filteredEnquiries.length === 0 ? (
          <p className="text-gray-500">No enquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base bg-white rounded-lg shadow">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                  </th>
                  <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                  </th>
                  <th className="p-3 text-left text-gray-600">Feedback</th>
                  <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Date {sortField === 'createdAt' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                  </th>
                  <th className="p-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEnquiries.map((entry) => (
                  <tr key={entry._id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-3 flex items-center">
                      <User className="w-5 h-5 text-gray-500 mr-2" />
                      {entry.name}
                    </td>
                    <td className="p-3 flex items-center">
                      <Mail className="w-5 h-5 text-gray-500 mr-2" />
                      {entry.email}
                    </td>
                    <td className="p-3 italic text-gray-800 max-w-xs truncate">{entry.feedback}</td>
                    <td className="p-3 text-gray-600">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleView(entry._id)}
                        className="p-2 text-[#059669] hover:text-emerald-800 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(entry._id)}
                        className="p-2 text-[#059669] hover:text-emerald-800 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredEnquiries.length > enquiriesPerPage && (
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnquiryListPage;