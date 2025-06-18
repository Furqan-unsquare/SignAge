// src/components/Menu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
            <nav className="space-y-2">
                <a href="#" className="block hover:bg-gray-700 px-4 py-2 rounded">Dashboard</a>
                <a href="#" className="block hover:bg-gray-700 px-4 py-2 rounded">Pricing</a>
                <a href="#" className="block hover:bg-gray-700 px-4 py-2 rounded">Order</a>
                <a href="#" className="block hover:bg-gray-700 px-4 py-2 rounded">Enquiry</a>
            </nav>
            <button
                onClick={handleLogout}
                className="mt-8 bg-red-600 hover:bg-red-700 w-full py-2 rounded text-white"
            >
                Logout
            </button>
        </aside>
    );
};

export default Menu;
