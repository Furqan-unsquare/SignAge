import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Package, Truck, User, Activity, BarChart2 } from "lucide-react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [counts, setCounts] = useState({
    totalOrders: 0,
    totalEnquiries: 0,
    totalProjects: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!token) {
          console.warn("No token found in localStorage");
          setError("Authentication token is missing. Please log in.");
          setIsLoading(false);
          return;
        }

         console.log("Fetching data with token:", token.substring(0, 10) + "...");

    const [ordersRes, enquiriesRes, projectsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_BASE_URL}/api/enquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_BASE_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

        // Check individual response status
        if (!ordersRes.ok) throw new Error(`Orders API failed: ${ordersRes.status}`);
        if (!enquiriesRes.ok) throw new Error(`Enquiries API failed: ${enquiriesRes.status}`);
        if (!projectsRes.ok) throw new Error(`Projects API failed: ${projectsRes.status}`);

        const [ordersData, enquiriesData, projectsData] = await Promise.all([
          ordersRes.json(),
          enquiriesRes.json(),
          projectsRes.json(),
        ]);

        console.log("Orders Data:", ordersData);
        console.log("Enquiries Data:", enquiriesData);
        console.log("Projects Data:", projectsData);

        // Validate and set counts
        setCounts({
          totalOrders: Array.isArray(ordersData) ? ordersData.length : 0,
          totalEnquiries: Array.isArray(enquiriesData) ? enquiriesData.length : 0,
          totalProjects: Array.isArray(projectsData) ? projectsData.length : 0,
        });

        // Normalize recent orders data with amount
        const normalizedOrders = Array.isArray(ordersData)
          ? ordersData.map((order) => ({
              _id: order.orderId || "N/A",
              date: order.createdAt || new Date().toISOString(),
              status: order.isPaid ? "completed" : "pending",
              type: order.type || "N/A",
              mobile: order.mobile || "N/A",
              inputText: order.inputText || "N/A",
              amount: order.totalPrice || 0, // Added back to enable chart data
            }))
          : [];

        setRecentOrders(normalizedOrders.slice(0, 5));

      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(
          `Failed to fetch data: ${err.message}. Check if all APIs (orders, enquiries, projects) are running.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);
  
const transactionChartData = useMemo(() => {
  const reversed = [...recentOrders].reverse(); // 👈 Reverse the order

  return {
    labels: reversed.map((o) => new Date(o.date).toLocaleDateString()),
    datasets: [
      {
        label: "Recent Orders",
        data: reversed.map((o) => o.amount),
        fill: false,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#10B981",
      },
    ],
  };
}, [recentOrders]);


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", labels: { color: "#374151" } },
    tooltip: {
      backgroundColor: "#1F2937",
      titleColor: "#F9FAFB",
      bodyColor: "#F9FAFB",
      borderColor: "#10B981",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#6B7280" },
    },
    y: {
      beginAtZero: true,
      grid: { color: "#E5E7EB" },
      ticks: {
        color: "#6B7280",
        stepSize: 1000, // 👈 This sets the gap between y-axis ticks
      },
    },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6 md:mt-0">
          Hi, {name || "User"}
        </h1>

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
                <p className="text-gray-600 text-sm">Uploaded Images</p>
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b">
            <div className="flex items-center mb-3 sm:mb-0">
              <Truck className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            </div>
            <div className="text-sm text-gray-500">
              Showing {recentOrders.length} {recentOrders.length === 1 ? "order" : "orders"}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300 mb-2" />
                        <p>No recent orders found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{order._id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {order.inputText || "Unknown"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.mobile || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.type === "Premium"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.type || "Regular"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            order.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {recentOrders.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => navigate("/orders")}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View all orders →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;