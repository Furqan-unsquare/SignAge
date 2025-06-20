import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { Eye, Trash, CheckCircle, XCircle, Edit, Calendar, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import authHeader from '../utils/authHeader';

const backendUrl = 'http://localhost:5000';

// Helper function to format text, including buffers
const formatText = (value) => {
  if (value == null) return 'N/A';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'buffer' in value) {
    try {
      return Buffer.from(value.buffer).toString('utf8'); // Decode buffer to string
    } catch {
      return 'Invalid Buffer';
    }
  }
  if (typeof value === 'object' && 'name' in value) return value.name;
  if (typeof value === 'object' && 'size' in value) return value.size;
  return String(value);
};

// Helper function to format add-ons array
const formatAddOns = (addOns) => {
  return Array.isArray(addOns) ? addOns.join(', ') : 'N/A';
};

const OrderListPage = () => {
  const [originalOrders, setOriginalOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/orders`, { headers: authHeader() });
      const formattedOrders = res.data.map((order) => ({
        ...order,
        inputText: formatText(order.inputText),
        color: formatText(order.color),
        size: formatText(order.size),
        type: formatText(order.type),
        font: formatText(order.font),
        totalPrice: parseFloat(order.totalPrice) || 0,
        addOns: order.addOns || [], // Use addOns from DB
        isPaid: !!order.isPaid,
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
      }));
      console.log('Formatted Orders:', formattedOrders); // Debug
      setOriginalOrders(formattedOrders);
      setOrders(formattedOrders);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setErrorMessage('Failed to fetch orders. Please try again.');
      setShowErrorModal(true);
      setOriginalOrders([]);
      setOrders([]);
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/orders/${id}`, { headers: authHeader() });
      setOrders(orders.filter((o) => o._id !== id));
      setOriginalOrders(originalOrders.filter((o) => o._id !== id));
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Delete failed:', err);
      setErrorMessage('Failed to delete order. Please try again.');
      setShowErrorModal(true);
    }
  };

  const togglePaid = async (id, current) => {
    if (current) return; // Prevent toggling if already paid
    try {
      await axios.put(
        `${backendUrl}/api/orders/${id}`,
        { isPaid: true },
        { headers: authHeader() }
      );
      fetchOrders();
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Toggle paid failed:', err);
      setErrorMessage('Failed to update payment status. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder({ ...order });
    setShowEditModal(true);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${backendUrl}/api/orders/${selectedOrder._id}`,
        {
          inputText: selectedOrder.inputText,
          color: selectedOrder.color,
          size: selectedOrder.size,
          type: selectedOrder.type,
          font: selectedOrder.font,
          totalPrice: parseFloat(selectedOrder.totalPrice),
          addOns: selectedOrder.addOns, // Include addOns in update
          isPaid: selectedOrder.isPaid,
        },
        { headers: authHeader() }
      );
      setShowEditModal(false);
      setSelectedOrder(null);
      fetchOrders();
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Update failed:', err);
      setErrorMessage('Failed to update order. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sorted = [...orders].sort((a, b) => {
      const aValue = a[field] || '';
      const bValue = b[field] || '';
      return order === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    setOrders(sorted);
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
      end.setHours(23, 59, 59, 999); // Include entire end date
      return orderDate >= start && orderDate <= end;
    });
    setOrders(filtered);
  };

  const resetDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setOrders(originalOrders); // Reset to original orders
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar className="w-64" />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white overflow-x-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User Orders</h2>
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base bg-white rounded-lg shadow">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left text-gray-600">Name</th>
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
                  <th className="p-3 text-left text-gray-600">AddOns</th>
                  <th className="p-3 text-left text-gray-600">Total (₹)</th>
                  <th className="p-3 text-left text-gray-600">Status</th>
                  <th className="p-3 text-left text-gray-600">Date</th>
                  <th className="p-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-200 transition-colors">
                    <td className="p-3 truncate max-w-xs text-gray-800">{order.inputText}</td>
                    <td className="p-3 text-gray-800">{order.color}</td>
                    <td className="p-3 text-gray-800">{order.size}</td>
                    <td className="p-3 text-gray-800">{order.type}</td>
                    <td className="p-3 text-gray-800">{order.font}</td>
                    <td className="p-3 text-gray-800" title={formatAddOns(order.addOns)}>
                      {formatAddOns(order.addOns).length > 20
                        ? formatAddOns(order.addOns).slice(0, 20) + '...'
                        : formatAddOns(order.addOns)}
                    </td>

                    <td className="p-3 text-gray-800">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.isPaid ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" /> Paid
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1" /> Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleString().length > 20
                        ? new Date(order.createdAt).toLocaleString().slice(0, 20) + '...'
                        : new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteOrderId(order._id);
                          setShowDeleteModal(true);
                        }}
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

        {/* Edit Modal */}
        {showEditModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-gray-800 p-6 rounded-lg w-full max-w-md mx-4 sm:mx-0">
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
                  <label className="block text-sm font-medium text-gray-700">AddOns</label>
                  <input
                    type="text"
                    value={selectedOrder.addOns.join(', ') || ''}
                    onChange={(e) =>
                      setSelectedOrder({ ...selectedOrder, addOns: e.target.value.split(', ').filter(Boolean) })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Waterproof IP67 Rated, Smart Wireless Controller"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedOrder.isPaid ? "Paid" : "Pending"}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "Pending" && selectedOrder.isPaid) return; // Prevent undo
                      setSelectedOrder({ ...selectedOrder, isPaid: value === "Paid" });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                  {selectedOrder.isPaid && (
                    <p className="text-xs text-gray-500 mt-1">Paid status not reversible.</p>
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-4 sm:mx-0">
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
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-4 sm:mx-0">
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
            <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-4 sm:mx-0">
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
