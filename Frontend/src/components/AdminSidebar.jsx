import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-900 text-white p-5 h-screen">
      <h2 className="text-xl font-bold mb-6 mt-5">Admin Panel</h2>
      <ul className="space-y-3">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;