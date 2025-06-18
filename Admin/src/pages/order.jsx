// src/pages/OrderListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { Eye, Trash, CheckCircle, XCircle } from 'lucide-react';
import authHeader from '../utils/authHeader';

const backendUrl = 'http://localhost:5000';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/orders`, authHeader());
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch orders', err);
      setLoading(false); // Ensure loading stops even on error
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`${backendUrl}/api/orders/${id}`, authHeader());
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const togglePaid = async (id, current) => {
    try {
      await axios.put(`${backendUrl}/api/orders/${id}`, { isPaid: !current }, authHeader());
      fetchOrders();
    } catch (err) {
      console.error('Toggle paid failed', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-white">
      {/* Sidebar always visible */}
      <Sidebar className="w-64" />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white overflow-x-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">User Orders</h2>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base bg-white rounded-lg shadow">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 text-left text-gray-600">Input</th>
                  <th className="p-3 text-left text-gray-600">Color</th>
                  <th className="p-3 text-left text-gray-600">Size</th>
                  <th className="p-3 text-left text-gray-600">Type</th>
                  <th className="p-3 text-left text-gray-600">Font</th>
                  <th className="p-3 text-left text-gray-600">Total (₹)</th>
                  <th className="p-3 text-left text-gray-600">Discount (₹)</th>
                  <th className="p-3 text-left text-gray-600">Paid</th>
                  <th className="p-3 text-left text-gray-600">Date</th>
                  <th className="p-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-200 transition-colors">
                    <td className="p-3 truncate max-w-xs text-gray-800">{order.inputText}</td>
                    <td className="p-3 text-gray-800">{order.color?.name || 'N/A'}</td>
                    <td className="p-3 text-gray-800">{order.size?.size || 'N/A'}</td>
                    <td className="p-3 text-gray-800">{order.type?.name || 'N/A'}</td>
                    <td className="p-3 text-gray-800">{order.font?.name || 'N/A'}</td>
                    <td className="p-3 text-gray-800">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="p-3 text-gray-800">₹{order.discount.toFixed(2)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => togglePaid(order._id, order.isPaid)}
                        className={`px-2 py-1 rounded text-white ${
                          order.isPaid ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                        } transition-colors`}
                      >
                        {order.isPaid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-3 text-gray-600">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => deleteOrder(order._id)}
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
      </main>
    </div>
  );
};

export default OrderListPage;