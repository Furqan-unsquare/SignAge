import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:5000';
import authHeader from '../utils/authHeader';

const EnquiryListPage = () => {
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/enquiry`, authHeader());
                setEnquiries(res.data);
            } catch (err) {
                console.error('Failed to fetch enquiries:', err);
            }
        };

        fetchEnquiries();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">User Feedbacks</h2>

            {enquiries.length === 0 ? (
                <p className="text-gray-500">No enquiries yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {enquiries.map((entry) => (
                        <div key={entry._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-semibold mb-1">{entry.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{entry.email}</p>
                            <p className="text-gray-800 mb-3 italic">"{entry.feedback}"</p>
                            <p className="text-xs text-gray-400">Submitted on {new Date(entry.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnquiryListPage;
