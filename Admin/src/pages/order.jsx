import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:5000';
import authHeader from '../utils/authHeader';

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

    if (loading) return <p className="p-4">Loading orders...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Input</th>
                            <th className="text-left p-3">Color</th>
                            <th className="text-left p-3">Size</th>
                            <th className="text-left p-3">Type</th>
                            <th className="text-left p-3">Font</th>
                            <th className="text-left p-3">Total</th>
                            <th className="text-left p-3">Discount</th>
                            <th className="text-left p-3">Paid</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{order.inputText}</td>
                                <td className="p-3">{order.color?.name}</td>
                                <td className="p-3">{order.size?.size}</td>
                                <td className="p-3">{order.type?.name}</td>
                                <td className="p-3">{order.font?.name}</td>
                                <td className="p-3">₹{order.totalPrice}</td>
                                <td className="p-3">₹{order.discount}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => togglePaid(order._id, order.isPaid)}
                                        className={`px-3 py-1 rounded text-white ${order.isPaid ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    >
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </button>
                                </td>
                                <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderListPage;
