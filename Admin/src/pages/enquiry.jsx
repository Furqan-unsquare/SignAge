import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { User, Mail, Trash, ChevronUp, ChevronDown, Search, MessageSquare, MailIcon } from 'lucide-react';
import authHeader from '../utils/authHeader';

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EnquiryListPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage] = useState(10);
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/enquiry`, authHeader());
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
        entry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        ? a[field]?.localeCompare(b[field])
        : b[field]?.localeCompare(a[field]);
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
        await axios.delete(`${API_BASE_URL}/api/enquiry/${id}`, authHeader());
        setEnquiries(enquiries.filter((entry) => entry._id !== id));
        setFilteredEnquiries(filteredEnquiries.filter((entry) => entry._id !== id));
      } catch (err) {
        console.error('Failed to delete enquiry:', err);
      }
    }
  };

  // Truncate text
  const truncateText = (text, length = 20) => {
    return text?.length > length ? text.substring(0, length) + '...' : text;
  };

  // Toggle message expansion
  const toggleMessageExpansion = (id) => {
    setExpandedMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle email click
  const handleEmail = (email, name) => {
    const subject = `Re: Your enquiry with SignCraft`;
    const body = `Dear ${name},\n\nThank you for reaching out to SignCraft regarding your signage needs. We've received your message and our team will get back to you shortly with more information.\n\nIn the meantime, feel free to browse our portfolio at [website link] to see examples of our work.\n\nBest regards,\nThe SignCraft Team`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // Handle WhatsApp click
  const handleWhatsApp = (phone) => {
    const message = `Hi, thank you for contacting SignCraft. We've received your enquiry and will get back to you soon. Could you please let us know if you have any specific requirements or deadlines for your signage project?`;
    const formattedPhone = phone.replace(/[^\d]/g, ''); // Remove non-numeric characters
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 ">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 mt-6 md:mt-0">User Enquiries</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
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
              <thead className="bg-gray-white">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <User className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
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
                      <Mail className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
                      Email
                      {sortField === 'email' && (
                        sortOrder === 'asc' ? 
                        <ChevronUp className="ml-1 w-4 h-4" /> : 
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  
                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Mobile No
                  </th>

                  <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Feedback <br /><span className="text-xs text-gray-400">(click to expand)</span>
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-900 group relative">
                      <div className="flex items-center">
                        <span className="truncate max-w-[120px]">
                          {truncateText(entry.name)}
                        </span>
                      </div>
                      <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {entry.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500 group relative">
                      <div className="flex items-center">
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">
                          {truncateText(entry.email)}
                        </span>
                      </div>
                      <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {entry.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-2">{entry.phone}</span>
                      </div>
                    </td>
                    <td 
                      className="px-4 py-3 text-sm sm:text-base text-gray-500 max-w-xs cursor-pointer"
                      onClick={() => toggleMessageExpansion(entry._id)}
                    >
                      {expandedMessages[entry._id] ? (
                        <div className="whitespace-pre-wrap">{entry.message}</div>
                      ) : (
                        <div className="truncate">{truncateText(entry.message, 30)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEmail(entry.email, entry.name)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Reply via Email"
                        >
                          <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        {entry.phone && (
                          <button
                            onClick={() => handleWhatsApp(entry.phone)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Message on WhatsApp"
                          >
                            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
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
            <div className="flex gap-2 text-gray-500">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-50">
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