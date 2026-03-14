import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateField, validateForm } from "../../utils/validation";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../../services/auth.service";
import ConfirmModal from "../../components/ui/ConfirmModal";

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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      toast.error("Invalid email or password");
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      toast.success(data.message);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      const message = error.message || "Login failed";

      if (message.toLowerCase().includes("inactive")) {

        setModalMessage(message);
        setShowModal(true);

      } else {

        toast.error(message);
        setFormError("Something went wrong");

      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center pt-10 pb-10">
      <div className="w-[800px] flex shadow-xl rounded-xl overflow-hidden">

        {/* Left Image */}
        <div className="w-1/2 relative">
          <img src="image.png" className="h-full w-full object-cover" />

          <div className="text-blue-500 text-3xl absolute top-[20%] left-[5%]">
            Welcome Back
          </div>

          <div className="text-blue-500 text-xl absolute top-[27%] left-[27%]">
            Shop Now !!
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="bg-white px-10 py-8 w-[420px] flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-blue-500 text-center mb-2">
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
              className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
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
                className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-400"
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
            className="text-blue-500 cursor-pointer text-sm text-right"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 mt-2 transition flex justify-center items-center cursor-pointer disabled:opacity-70"
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
              className="text-blue-500 cursor-pointer ml-1"
            >
              Create an account
            </span>
          </p>
        </form>
      </div>

      {/* Inactive User Modal */}
      {showModal && (
        <ConfirmModal
          title="Account Inactive"
          message={modalMessage}
          cancelText="Back"
          hideConfirm={true}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Login;