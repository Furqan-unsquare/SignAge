
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Package, Truck, User, Activity, BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [counts, setCounts] = useState({
    totalOrders: 0,
    totalEnquiries: 0,
    totalProjects: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!token) {
          console.warn('No token found in localStorage');
          setError('Authentication token is missing. Please log in.');
          setIsLoading(false);
          return;
        }

        console.log('Fetching data with token:', token.substring(0, 10) + '...');
        const [ordersRes, enquiriesRes, projectsRes] = await Promise.all([
          fetch('http://localhost:5000/api/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/enquiries', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!ordersRes.ok || !enquiriesRes.ok || !projectsRes.ok) {
          throw new Error(`HTTP error! Status: ${ordersRes.status}, ${enquiriesRes.status}, ${projectsRes.status}`);
        }

        const [ordersData, enquiriesData, projectsData] = await Promise.all([
          ordersRes.json(),
          enquiriesRes.json(),
          projectsRes.json(),
        ]);

        console.log('Raw Orders Data:', ordersData);
        console.log('Raw Enquiries Data:', enquiriesData);
        console.log('Raw Projects Data:', projectsData);

        setCounts({
          totalOrders: ordersData.length || 0,
          totalEnquiries: enquiriesData.length || 0,
          totalProjects: projectsData.length || 0,
        });

        // Normalize recent orders data
        const normalizedOrders = ordersData.map(order => ({
          _id: order._id || order.id || 'N/A',
          date: order.createdAt || order.date || new Date().toISOString(),
          status: order.status || 'unknown',
          amount: order.amount || order.totalPrice || 0,
        }));
        setRecentOrders(normalizedOrders.slice(0, 5));

      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError(`Failed to fetch data: ${err.message}. Check console for details.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const transactionChartData = useMemo(() => ({
    labels: recentOrders.map(o => new Date(o.date).toLocaleDateString()),
    datasets: [{
      label: 'Recent Orders',
      data: recentOrders.map(o => o.amount),
      fill: false,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#10B981',
    }]
  }), [recentOrders]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#374151' } },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#10B981',
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#6B7280' } },
      y: { grid: { color: '#E5E7EB' }, ticks: { color: '#6B7280' }, beginAtZero: true },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-emerald-200 rounded-full mb-4"></div>
            <div className="h-4 bg-emerald-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-emerald-200 rounded w-24"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen flex bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
        {/* Greeting */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-right sm:text-left">Hi, {name || 'User'}</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <Package className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-800">{counts.totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <User className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Enquiries</p>
                <p className="text-2xl font-semibold text-gray-800">{counts.totalEnquiries}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-800">{counts.totalProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <BarChart2 className="w-6 h-6 text-emerald-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-800">Recent Orders Trend</h3>
            </div>
            <div className="h-64">
              <Line data={transactionChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 text-emerald-600 mr-3" />
            <h3 className="text-lg font-medium text-gray-800">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500">No recent orders available.</td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate('/orders')}
                    >
                      <td className="p-3 flex items-center">
                        <span className="truncate max-w-[120px] sm:max-w-none">{order._inputText}</span>
                      </td>
                      <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : order.status === 'processing' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-200 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      {/* <td className="p-3">${order.amount.toFixed(2)}</td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
