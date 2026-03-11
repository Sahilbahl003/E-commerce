import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStatsService } from "../../services/dashboard.service";

const Dashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    categories: 0,
    revenue: 0
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const data = await getDashboardStatsService();

        if (data.success) {
          setStats(data.stats || {
            users: 0,
            products: 0,
            orders: 0,
            categories: 0,
            revenue: 0
          });
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchStats();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-5 gap-6">

        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-gray-600">Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div
          onClick={() => navigate("/admin/products")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-gray-600">Products</h3>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>

        <div
          onClick={() => navigate("/admin/categories")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-gray-600">Categories</h3>
          <p className="text-3xl font-bold">{stats.categories}</p>
        </div>

        <div
          onClick={() => navigate("/admin/orders")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-gray-600">Orders</h3>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold">₹{stats.revenue}</p>
        </div>

      </div>

    </div>

  );

};

export default Dashboard;