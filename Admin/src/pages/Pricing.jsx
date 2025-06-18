// src/pages/PricingPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/Sidebar';
import { Eye, Edit, Trash, Plus } from 'lucide-react';
import authHeader from '../utils/authHeader';

const backendUrl = 'http://localhost:5000';
const tabs = ['Color', 'Font', 'Size', 'Type'];

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
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price || ''}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
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
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <input
              placeholder="Color ID"
              value={form.color || ''}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
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
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price || ''}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
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
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price || ''}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#059669] text-gray-800"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-x-hidden">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Pricing Management</h1>

        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? 'bg-[#059669] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } transition-colors`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded-lg shadow">
          {renderFields()}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editId ? 'Update' : 'Add'}
            </button>
            {editId && (
              <button
                onClick={() => {
                  setForm({});
                  setEditId(null);
                }}
                type="button"
                className="flex items-center text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash className="w-4 h-4 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base bg-white rounded-lg shadow">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {Object.keys(data[0] || {})
                  .filter((key) => key !== '__v' && key !== '_id')
                  .map((key) => (
                    <th key={key} className="p-3 text-left text-gray-600">
                      {key}
                    </th>
                  ))}
                <th className="p-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition-colors">
                  {Object.entries(item)
                    .filter(([key]) => key !== '__v' && key !== '_id')
                    .map(([key, val]) => (
                      <td key={key} className="p-3 text-gray-800">
                        {typeof val === 'object' && val?.name ? val.name : val?.toString()}
                      </td>
                    ))}
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-[#059669] hover:text-emerald-800 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      </main>
    </div>
  );
};

export default PricingPage;