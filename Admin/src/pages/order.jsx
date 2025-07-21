"use client";
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Eye, Trash, CheckCircle, XCircle, Edit, Calendar, ChevronUp, ChevronDown, RefreshCw, Search } from 'lucide-react';
import authHeader from '../utils/authHeader';
import PreviewModal from '../components/PreviewModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function to format text, including buffers
const formatText = (value) => {
  if (value == null) return 'N/A';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'buffer' in value) {
    try {
      return Buffer.from(value.buffer).toString('utf8');
    } catch {
      return 'Invalid Buffer';
    }
  }
  if (typeof value === 'object' && 'name' in value) return value.name; 
  if (typeof value === 'object' && 'size' in value) return value.size;
  return String(value);
};

// Helper function to truncate text with hover
const truncateText = (text, maxLength = 10) => {
  if (!text) return { display: 'N/A', full: 'N/A' };
  if (text.length <= maxLength) return { display: text, full: text };
  return { display: text.slice(0, maxLength) + '...', full: text };
};

const OrderListPage = () => {
  const [originalOrders, setOriginalOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const paginationData = useMemo(() => {
    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    
    return {
      currentItems,
      totalPages,
      totalItems
    };
  }, [orders, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const goToPage = (page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/orders`, { headers: authHeader() });
      const formattedOrders = res.data.map((order) => ({
        ...order,
        orderId: order.orderId,
        inputText: formatText(order.inputText),
        color: formatText(order.color),
        size: formatText(order.size),
        type: formatText(order.type),
        font: formatText(order.font),
        totalPrice: parseFloat(order.totalPrice) || 0,
        mobile: formatText(order.phoneNumber || order.mobile) || 'N/A',
        status: order.isPaid ? 'Completed' : (order.status === 'Manufacturing' ? 'Manufacturing' : 'Pending'),
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
      }));
      setOriginalOrders(formattedOrders);
      setOrders(formattedOrders);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch orders:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to fetch orders. Please check your connection or login status.');
      setShowErrorModal(true);
      setOriginalOrders([]);
      setOrders([]);
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!id) {
      setErrorMessage('Invalid order ID.');
      setShowErrorModal(true);
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/api/orders/${id}`, { headers: authHeader() });
      setOrders(orders.filter((o) => o.orderId !== id));
      setOriginalOrders(originalOrders.filter((o) => o.orderId !== id));
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to delete order. Please try again.');
      setShowErrorModal(true);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    if (currentStatus === 'Completed') return; // Prevent toggling if already Completed
    if (!id) {
      setErrorMessage('Invalid order ID.');
      setShowErrorModal(true);
      return;
    }
    try {
      const newStatus = currentStatus === 'Pending' ? 'Manufacturing' : 'Completed';
      await axios.put(
        `${API_BASE_URL}/api/orders/${id}`,
        { status: newStatus, isPaid: newStatus === 'Completed' },
        { headers: authHeader() }
      );
      await fetchOrders();
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Toggle status failed:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to update status. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleEdit = (order) => {
    if (!order.orderId) {
      setErrorMessage('Invalid order ID for editing.');
      setShowErrorModal(true);
      return;
    }
    setSelectedOrder({ ...order });
    setShowEditModal(true);
  };

  const handlePreview = (order) => {
    setSelectedOrder({ ...order });
    setShowPreviewModal(true);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (!selectedOrder?.orderId) {
      setErrorMessage('Invalid order ID for updating.');
      setShowErrorModal(true);
      return;
    }
    try {
      await axios.put(
        `${API_BASE_URL}/api/orders/${selectedOrder.orderId}`,
        {
          inputText: selectedOrder.inputText,
          color: selectedOrder.color,
          size: selectedOrder.size,
          type: selectedOrder.type,
          font: selectedOrder.font,
          totalPrice: parseFloat(selectedOrder.totalPrice) || 0,
          mobile: selectedOrder.mobile,
          status: selectedOrder.status,
          isPaid: selectedOrder.status === 'Completed',
        },
        { headers: authHeader() }
      );
      setShowEditModal(false);
      setSelectedOrder(null);
      await fetchOrders();
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to update order. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sorted = [...orders].sort((a, b) => {
      const aValue = field === 'status' ? a[field] : a[field] || '';
      const bValue = field === 'status' ? b[field] : b[field] || '';
      if (field === 'status') {
        const statusOrder = { 'Pending': 1, 'Manufacturing': 2, 'Completed': 3 };
        return order === 'asc'
          ? statusOrder[aValue] - statusOrder[bValue]
          : statusOrder[bValue] - statusOrder[aValue];
      }
      return order === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    setOrders(sorted);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setOrders(originalOrders);
      return;
    }
    const filtered = originalOrders.filter((order) =>
      (order.orderId || '').toLowerCase().includes(query) ||
      (order.inputText || '').toLowerCase().includes(query) ||
      (order.mobile || '').toLowerCase().includes(query) ||
      order.createdAt.toLocaleDateString().toLowerCase().includes(query)
    );
    setOrders(filtered);
  };

  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    const filtered = originalOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      return orderDate >= start && orderDate <= end;
    });
    setOrders(filtered);
  };

  const resetDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
    setOrders(originalOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-screen flex">
      <Sidebar className="w-64" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-x-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-6 md:mt-0">Customer Orders</h2>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ID, Name, Mobile, or Date"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg text-gray-600"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 text-gray-600 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 text-gray-600 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleDateFilter}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
            >
              <Calendar className="w-5 h-5 mr-1" /> Filter
            </button>
            <button
              onClick={resetDateFilter}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600">No orders found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base bg-white rounded-xl shadow">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('orderId')}>
                      <div className="flex items-center">
                        Order ID
                        {sortField === 'orderId' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600">
                      <div className="flex items-center">
                        Name
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('color')}>
                      <div className="flex items-center">
                        Color
                        {sortField === 'color' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('size')}>
                      <div className="flex items-center">
                        Size
                        {sortField === 'size' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('type')}>
                      <div className="flex items-center">
                        Type
                        {sortField === 'type' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('font')}>
                      <div className="flex items-center">
                        Font
                        {sortField === 'font' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600">
                      <div className="flex items-center">
                        Mobile
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600">
                      <div className="flex items-center">
                        Total (₹)
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
                          sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600">
                      <div className="flex items-center">
                        Date
                      </div>
                    </th>
                    <th className="p-3 text-left text-gray-600">
                      <div className="flex items-center">
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginationData.currentItems.map((order) => {
                    const idText = truncateText(order.orderId);
                    const mobileText = truncateText(order.mobile);
                    const dateText = truncateText(order.createdAt.toLocaleDateString(), 10);
                    return (
                      <tr key={order.orderId} className="border-t hover:bg-gray-200 transition-colors">
                        <td className="p-3 truncate max-w-xs text-gray-800" title={idText.full}>
                          {idText.display}
                        </td>
                        <td className="p-3 truncate max-w-xs text-gray-800">{order.inputText}</td>
                        <td className="p-3 text-gray-800">{order.color}</td>
                        <td className="p-3 text-gray-800">{order.size}</td>
                        <td className="p-3 text-gray-800">{order.type}</td>
                        <td className="p-3 text-gray-800">{order.font}</td>
                        <td className="p-3 truncate max-w-xs text-gray-800" title={mobileText.full}>
                          {mobileText.display}
                        </td>
                        <td className="p-3 text-gray-800">₹{order.totalPrice.toFixed(2)}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-medium cursor-pointer ${
                              order.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Manufacturing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                            onClick={() => toggleStatus(order.orderId, order.status)}
                          >
                            {order.status === 'Completed' ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" /> Completed
                              </>
                            ) : order.status === 'Manufacturing' ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" /> Manufacturing
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 mr-1" /> Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td className="p-3 truncate max-w-xs text-gray-600" title={order.createdAt.toLocaleString()}>
                          {dateText.display}
                        </td>
                        <td className="p-3 flex items-center space-x">
                          <button
                            onClick={() => handleEdit(order)}
                            title="Edit Order"
                            className="p-2 text-blue-600 hover:text-blue-200 transition-colors duration-200"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteOrderId(order.orderId);
                              setShowDeleteModal(true);
                            }}
                            title="Delete Order"
                            className="p-2 text-red-600 text-hover-red-800 transition-colors duration-200"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handlePreview(order)}
                            title="Preview Order"
                            className="p-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, paginationData.totalItems)} 
                - {Math.min(currentPage * itemsPerPage, paginationData.totalItems)} 
                of {paginationData.totalItems} orders
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-200 cursor-not-allowed' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  ‹
                </button>
                
                {Array.from({ length: Math.min(5, paginationData.totalPages) }, (_, i) => {
                  let pageNum;
                  if (paginationData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= paginationData.totalPages - 2) {
                    pageNum = paginationData.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === paginationData.totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === paginationData.totalPages 
                      ? 'bg-gray-200 cursor-not-allowed' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  ›
                </button>
              </div>
            </div>
          </>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5 md:px-0">
            <div className="bg-white text-gray-800 p-6 rounded-lg w-full max-w-md mx-auto">
              <h3 className="text-lg text-gray-800 font-bold mb-4">Edit Order</h3>
              <form onSubmit={handleUpdateOrder} className="space-y-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Input Text</label>
                  <input
                    type="text"
                    value={selectedOrder.inputText || ''}
                    onChange={(e) =>
                      setSelectedOrder({ ...selectedOrder, inputText: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div> 
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="text"
                    value={selectedOrder.color || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, color: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <input
                    type="text"
                    value={selectedOrder.size || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, size: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={selectedOrder.type || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Font</label>
                  <input
                    type="text"
                    value={selectedOrder.font || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, font: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <input
                    type="text"
                    value={selectedOrder.mobile || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, mobile: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedOrder.totalPrice || 0}
                    onChange={(e) =>
                      setSelectedOrder({ ...selectedOrder, totalPrice: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'Pending' && selectedOrder.status === 'Completed') return;
                      if (value === 'Manufacturing' && selectedOrder.status === 'Completed') return;
                      setSelectedOrder({ ...selectedOrder, status: value });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Completed">Completed</option>
                  </select>
                  {selectedOrder.status === 'Completed' && (
                    <p className="text-xs text-gray-500 mt-1">Completed status is not reversible.</p>
                  )}
                </div>
                <div className="flex justify-left space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        <PreviewModal
          show={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          order={selectedOrder}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
              <h3 className="text-lg text-gray-800 font-bold mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to delete this order?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteOrder(deleteOrderId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
              <h3 className="text-lg font-bold mb-4 text-green-600">Success</h3>
              <p className="text-gray-600 mb-4">Operation completed successfully!</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
              <h3 className="text-lg font-bold mb-4 text-red-600">Error</h3>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderListPage;