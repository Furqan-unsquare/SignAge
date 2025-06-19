import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { User, Mail, Trash, ChevronUp, ChevronDown, Search } from 'lucide-react';
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
        entry.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEnquiries(filtered);
    setCurrentPage(1);
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

  // Handle delete
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

  // Truncate email before @
  const truncateEmail = (email) => {
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.substring(0, atIndex) + '@...' : email;
  };

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">User Enquiries</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Responsive Table */}
        {filteredEnquiries.length === 0 ? (
          <p className="text-gray-500">No enquiries found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {sortField === 'name' && (
                        sortOrder === 'asc' ? 
                        <ChevronUp className="ml-1 w-4 h-4" /> : 
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Email
                      {sortField === 'email' && (
                        sortOrder === 'asc' ? 
                        <ChevronUp className="ml-1 w-4 h-4" /> : 
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'createdAt' && (
                        sortOrder === 'asc' ? 
                        <ChevronUp className="ml-1 w-4 h-4" /> : 
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEnquiries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-900">
                      <div className="flex items-center">
                        <User className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
                        <span>{entry.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500 group relative">
                      <div className="flex items-center">
                        <Mail className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">
                          {truncateEmail(entry.email)}
                        </span>
                      </div>
                      <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {entry.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm sm:text-base text-gray-500 max-w-xs truncate">
                      {entry.message}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
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
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstEnquiry + 1} to {Math.min(indexOfLastEnquiry, filteredEnquiries.length)} of {filteredEnquiries.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnquiryListPage;