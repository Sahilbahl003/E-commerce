import AdminSidebar from "./AdminSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";

const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  }, [location.pathname]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <div>

      {/* NAVBAR */}
      <div className="w-full bg-gray-900 h-[60px] flex items-center justify-between px-6">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-400 text-xl font-bold cursor-pointer"
        >
          <BsCart4 className="text-2xl" />
          E-comzy
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-500 px-4 py-1 rounded"
            >
              Login
            </button>
          )}

          {token && user && (
            <div ref={menuRef} className="relative">

              {/* Profile Avatar */}
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold">
                    {user.name?.[0]}
                  </div>
                )}
              </div>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md">

                  <button
                    onClick={() => {
                      navigate("/admin/profile");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 p-6 min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;