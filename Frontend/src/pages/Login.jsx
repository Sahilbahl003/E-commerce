import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateField, validateForm } from "../utils/validation";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    const error = validateField(name, value, updated);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("Invalid email or password");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Invalid email or password");
        toast.error(data.message || "Invalid email or password");
        return;
      }

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/products");
    } catch {
      setFormError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[800px] h-[480px] mb-25 flex shadow-xl rounded-xl">
        <div className="w-1/2 relative">
          <img src="image.png" className="h-[480px]" />
          <div className="text-purple-500 text-3xl absolute top-[20%] left-[5%]">
            Welcome Back
          </div>
          <div className="text-purple-500 text-xl absolute top-[27%] left-[27%]">
            Shop Now !!
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white px-10 py-8 w-[420px] flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-purple-900 text-center mb-2">
            Login
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={changeHandler}
              onBlur={blurHandler}
              className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={changeHandler}
                onBlur={blurHandler}
                className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-400"
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 text-lg" />
                ) : (
                  <AiOutlineEye className="text-gray-500 text-lg" />
                )}
              </div>
            </div>

            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password}</p>
            )}
          </div>

          <p
            className="text-purple-900 cursor-pointer pl-54 text-sm"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-md h-10 mt-2 transition flex justify-center items-center cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <div className="flex gap-1 items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white">loading...</p>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-sm text-center">
            New to Ecomzy?
            <span
              onClick={() => navigate("/register")}
              className="text-purple-900 cursor-pointer ml-1"
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;