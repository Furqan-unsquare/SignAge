// src/pages/PricingPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:5000';
const tabs = ['Color', 'Font', 'Size', 'Type'];
import authHeader from '../utils/authHeader';
import Menu from '../component/menu';

const PricingPage = () => {
    const [activeTab, setActiveTab] = useState('Color');
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/${activeTab.toLowerCase()}s`, authHeader());
            setData(res.data);
            setForm({});
            setEditId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${backendUrl}/api/${activeTab.toLowerCase()}s/${editId}`, form, authHeader());
            } else {
                await axios.post(`${backendUrl}/api/${activeTab.toLowerCase()}s`, form, authHeader());
            }
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/${activeTab.toLowerCase()}s/${id}`, authHeader());
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditId(item._id);
    };

    const renderFields = () => {
        switch (activeTab) {
            case 'Color':
                return (
                    <>
                        <input
                            placeholder="Name"
                            value={form.name || ''}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border p-2"
                        />
                        <input
                            placeholder="Price"
                            type="number"
                            value={form.price || ''}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="border p-2"
                        />
                    </>
                );
            case 'Font':
                return (
                    <>
                        <input
                            placeholder="Name"
                            value={form.name || ''}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border p-2"
                        />
                        <input
                            placeholder="Color ID"
                            value={form.color || ''}
                            onChange={(e) => setForm({ ...form, color: e.target.value })}
                            className="border p-2"
                        />
                    </>
                );
            case 'Size':
                return (
                    <>
                        <input
                            placeholder="Size (S/M/L)"
                            maxLength={1}
                            value={form.size || ''}
                            onChange={(e) => setForm({ ...form, size: e.target.value })}
                            className="border p-2"
                        />
                        <input
                            placeholder="Price"
                            type="number"
                            value={form.price || ''}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="border p-2"
                        />
                    </>
                );
            case 'Type':
                return (
                    <>
                        <input
                            placeholder="Name"
                            value={form.name || ''}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border p-2"
                        />
                        <input
                            placeholder="Price"
                            type="number"
                            value={form.price || ''}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="border p-2"
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8">
            <Menu />
            <h1 className="text-3xl font-bold mb-4">Pricing Management</h1>

            <div className="flex space-x-4 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-x-4 mb-6">
                {renderFields()}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    {editId ? 'Update' : 'Add'}
                </button>
                {editId && (
                    <button
                        onClick={() => {
                            setForm({});
                            setEditId(null);
                        }}
                        type="button"
                        className="ml-2 text-red-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        {Object.keys(data[0] || {})
                            .filter((key) => key !== '__v' && key !== '_id')
                            .map((key) => (
                                <th key={key} className="p-2 border">
                                    {key}
                                </th>
                            ))}
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="text-center">
                            {Object.entries(item)
                                .filter(([key]) => key !== '__v' && key !== '_id')
                                .map(([key, val]) => (
                                    <td key={key} className="p-2 border">
                                        {typeof val === 'object' && val?.name
                                            ? val.name
                                            : val?.toString()}
                                    </td>
                                ))}
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricingPage;
