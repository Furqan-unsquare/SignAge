import React, { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../component/Sidebar';
import { Package, Truck, DollarSign, User, Clock, Activity, BarChart2 } from 'lucide-react';
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
import { Line, Bar } from 'react-chartjs-2';

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
  const [name, setName] = useState('');
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    conversionRate: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        if (token) {
          const decoded = jwtDecode(token);
          setName(decoded.name || '');
        }

        const [analyticsRes, ordersRes, transactionsRes, performanceRes] = await Promise.all([
          fetch('/api/analytics', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/orders/recent', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/transactions', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/performance', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const [
          analyticsData,
          ordersData,
          transactionsData,
          performanceData
        ] = await Promise.all([
          analyticsRes.json(),
          ordersRes.json(),
          transactionsRes.json(),
          performanceRes.json()
        ]);

        setAnalytics({
          totalOrders: analyticsData.totalOrders || 0,
          totalRevenue: analyticsData.totalRevenue || 0,
          activeUsers: analyticsData.activeUsers || 0,
          conversionRate: analyticsData.conversionRate || 0,
        });

        setRecentOrders(ordersData.slice(0, 5));
        setTransactionData(transactionsData);
        setPerformanceData(performanceData);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Memoize chart data to prevent unnecessary re-renders
  const transactionChartData = useMemo(() => ({
    labels: transactionData.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [{
      label: 'Transactions',
      data: transactionData.map(t => t.amount),
      fill: false,
      borderColor: '#059669', // Emerald-600
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#059669',
    }]
  }), [transactionData]);

  const performanceChartData = useMemo(() => ({
    labels: performanceData.map(p => p.month),
    datasets: [{
      label: 'Performance',
      data: performanceData.map(p => p.value),
      backgroundColor: 'rgba(5, 150, 105, 0.7)',
      borderColor: 'rgba(5, 150, 105, 1)',
      borderWidth: 1,
    }]
  }), [performanceData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#374151' } },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#059669',
        borderWidth: 1,
      }
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { color: '#6B7280' } 
      },
      y: { 
        grid: { color: '#E5E7EB' },
        ticks: { color: '#6B7280' },
        beginAtZero: true 
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex bg-white">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-emerald-200 rounded-full mb-4"></div>
            <div className="h-4 bg-emerald-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-emerald-200 rounded w-24"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-x-hidden">
        {/* Greeting */}
        <h1 className="text-2xl sm:text-xl text-end md:text-start font-bold text-gray-800 mb-6">Hi, {name || 'User'}</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <Package className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-xl font-semibold text-gray-800">{analytics.totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-xl font-semibold text-gray-800">${analytics.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <User className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-xl font-semibold text-gray-800">{analytics.activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-xl font-semibold text-gray-800">{analytics.conversionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Transaction Graph */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <BarChart2 className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="font-medium text-gray-800">Transaction History</h3>
            </div>
            <div className="h-64">
              <Line data={transactionChartData} options={chartOptions} />
            </div>
          </div>

          {/* Performance Graph */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="font-medium text-gray-800">Monthly Performance</h3>
            </div>
            <div className="h-64">
              <Bar data={performanceChartData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: false }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Truck className="w-5 h-5 text-emerald-600 mr-2" />
            <h3 className="font-medium text-gray-800">Recent Orders</h3>
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
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-3 flex items-center">
                      <Clock className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{order._id}</span>
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
                        <Truck className="w-3 h-3 mr-1" />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">${order.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;   