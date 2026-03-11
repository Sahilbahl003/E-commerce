import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-5 min-h-screen">

      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">

        <li>
          <Link to="/admin/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/users" className="hover:text-blue-400">
            Users
          </Link>
        </li>

        <li>
          <Link to="/admin/products" className="hover:text-blue-400">
            Products
          </Link>
        </li>

        <li>
          <Link to="/admin/categories" className="hover:text-blue-400">
            Categories
          </Link>
        </li>

        <li>
          <Link to="/admin/orders" className="hover:text-blue-400">
            Orders
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default AdminSidebar;