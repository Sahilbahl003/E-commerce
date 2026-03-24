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

  const loadUser = () => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  };

  useEffect(() => {
    loadUser();
  }, [location.pathname]);


  // 🔥 listen for profile update event
  useEffect(() => {

    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };

  }, []);


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

      <div className="w-full fixed left-0 top-0 bg-gray-900 h-[60px] z-20 flex items-center justify-between px-6">

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-400 text-xl font-bold cursor-pointer"
        >
          <BsCart4 className="text-2xl" />
          E-comzy
        </div>

        <div className="flex items-center gap-6">

          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-500 px-4 py-1 rounded cursor-pointer"
            >
              Login
            </button>
          )}

          {token && user && (

            <div ref={menuRef} className="relative">

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

              {showMenu && (

                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md">

                  <button
                    onClick={() => {
                      navigate("/admin/profile");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </button>

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 ml-70 mt-20 p-6 min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>

  );

};

export default AdminLayout;