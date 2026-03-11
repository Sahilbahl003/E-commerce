import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);

    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-zinc-200 z-50 flex justify-center">
      
      {/* Container */}
      <div className="w-full max-w-[1200px] px-4 py-4 flex justify-between items-center text-zinc-700 font-semibold">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-400 text-2xl font-bold cursor-pointer"
        >
          <span className="text-zinc-500 text-3xl">
            <BsCart4 />
          </span>
          E-comzy
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <div onClick={() => navigate("/men")} className="cursor-pointer hover:text-blue-400">Men</div>
          <div onClick={() => navigate("/women")} className="cursor-pointer hover:text-blue-400">Women</div>
          <div onClick={() => navigate("/children")} className="cursor-pointer hover:text-blue-400">Children</div>
          <div onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-400">All</div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          <FiSearch className="text-xl cursor-pointer" />

          <PiShoppingCartSimple className="text-xl cursor-pointer" />

          {(!token || user?.role === "admin") && (
            <button
              onClick={() => navigate("/login")}
              className="border border-blue-400 text-blue-400 px-4 py-2 rounded hover:bg-blue-400 hover:text-white transition"
            >
              Login
            </button>
          )}

         {token && user?.role === "user" && (
            <div
              onClick={() => navigate("/profile")}
              className="cursor-pointer"
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center">
                  {user.name?.[0]}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;