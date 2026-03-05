import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="px-50">
      <h1 className="text-2xl font-bold mb-6 mt-40">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <h3>Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3>Total Products</h3>
          <p className="text-2xl">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3>Total Orders</h3>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
