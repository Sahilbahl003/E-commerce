import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await ("/auth/login", { email, password });

    if (res.data.role !== "admin") {
      alert("Not an admin");
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate("/admin/dashboard");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-xl mb-4 font-bold">Admin Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;