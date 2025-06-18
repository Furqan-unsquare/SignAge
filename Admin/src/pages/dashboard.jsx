// src/pages/DashboardPage.jsx
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Menu from '../component/menu';

const DashboardPage = () => {
    const token = localStorage.getItem('token');
    let name = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            name = decoded.name || '';
        } catch (err) {
            console.error('Invalid token');
        }
    }

    return (
        <div className="min-h-screen flex">
            <Menu />

            <main className="flex-1 p-8 bg-gray-50">
                <h1 className="text-3xl font-bold mb-4">Hi, {name}</h1>
                <p className="text-gray-600">Welcome to your dashboard.</p>
            </main>
        </div>
    );
};

export default DashboardPage;
