import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateField, validateForm } from "../../utils/validation";
import { IoAlertCircleOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPasswordService, sendResetOtpService, verifyResetOtpService } from "../../services/password.service";
import { formatTime } from "../../utils/formatTime";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword1: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    let finalValue = value;

    if (name === "otp") {
      finalValue = value.replace(/\D/g, "").slice(0, 6);
    }

    const updated = { ...formData, [name]: finalValue };
    setFormData(updated);

    const error = validateField(name, finalValue, updated);

    let confirmError = errors.confirmPassword1;
    if (name === "newPassword" && updated.confirmPassword1) {
      confirmError = validateField(
        "confirmPassword1",
        updated.confirmPassword1,
        updated
      );
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
      ...(name === "newPassword"
        ? { confirmPassword1: confirmError }
        : {}),
    }));
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async () => {
  const error = validateField("email", formData.email, formData);

  if (error) {
    setErrors({ email: error });
    return;
  }

  setLoadingSend(true);
  setFormError("");

  try {
    const data = await sendResetOtpService(formData.email || "");

    toast.success(data.msg);
    setStep(2);
    setTimer(900);
  } catch (err) {
    setFormError(err.msg || "Something went wrong");
  } finally {
    setLoadingSend(false);
  }
};

  const verifyOtp = async () => {
  const error = validateField("otp", formData.otp, formData);

  if (error) {
    setErrors({ otp: error });
    return;
  }

  setLoadingVerify(true);
  setFormError("");

  try {
    const data = await verifyResetOtpService(
      formData.email,
      formData.otp
    );

    toast.success(data.msg);
    setStep(3);
  } catch (err) {
    setFormError(err.message || "Verification failed");
  } finally {
    setLoadingVerify(false);
  }
};

  const resetPassword = async () => {
  const validationErrors = validateForm(formData);

  if (
    validationErrors.newPassword ||
    validationErrors.confirmPassword1
  ) {
    setErrors(validationErrors);
    return;
  }

  setLoadingReset(true);
  setFormError("");

  try {
    const data = await resetPasswordService(formData);

    toast.success(data.msg);
    setTimeout(() => navigate("/login"), 1200);
  } catch (err) {
    setFormError(err.message || "Reset failed");
  } finally {
    setLoadingReset(false);
  }
};

  // const formatTime = () => {
  //   const m = Math.floor(timer / 60);
  //   const s = timer % 60;
  //   return `${m}:${s < 10 ? "0" : ""}${s}`;
  // };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50 ">
      <div className="bg-white shadow-xl px-10 py-8 w-[420px] rounded-xl flex flex-col gap-4 mb-35">
        <h2 className="text-2xl font-bold text-purple-500 text-center">
          Forgot Password?
        </h2>

        {step === 1 && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                onBlur={blurHandler}
                placeholder="Enter your email"
                className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email}</p>
              )}
            </div>

            {formError && (
              <p className="text-red-600 text-sm text-center">{formError}</p>
            )}

            <button
              disabled={loadingSend}
              onClick={sendOtp}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-md h-10 transition flex justify-center items-center cursor-pointer"
            >
              {loadingSend ? (
                <div className="flex gap-1 items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p>loading...</p>
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-1">
              <input
                name="otp"
                value={formData.otp}
                placeholder="Enter OTP"
                inputMode="numeric"
                maxLength={6}
                onChange={changeHandler}
                onBlur={blurHandler}
                className="shadow-sm shadow-zinc-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.otp && (
                <p className="text-red-600 text-xs">{errors.otp}</p>
              )}
            </div>

            <p className="text-sm text-gray-500 text-center">
              OTP expires in: {formatTime(timer)}
            </p>

            {formError && (
              <p className="text-red-600 text-sm text-center">{formError}</p>
            )}

            <button
              disabled={loadingVerify}
              onClick={verifyOtp}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-md h-10 transition flex justify-center items-center cursor-pointer"
            >
              {loadingVerify ? (
                <div className="flex gap-1 items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p>loading...</p>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="text-sm font-medium relative">
              New Password
              <div className="absolute right-3 top-0 group cursor-pointer">
                <IoAlertCircleOutline className="text-gray-400 text-lg" />
                <div className="absolute hidden group-hover:block right-0 -top-20 w-64 bg-black text-white text-xs rounded-md p-2 shadow-lg">
                  Must include uppercase, number, special character
                  <br />
                  Password must be at least 8 characters
                </div>
              </div>
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={changeHandler}
                onBlur={blurHandler}
                placeholder="New Password"
                className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiOutlineEyeInvisible className="text-gray-400 text-lg" /> : <AiOutlineEye className="text-gray-400 text-lg" />}
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-red-600 text-xs">{errors.newPassword}</p>
            )}

            <label className="text-sm font-medium relative">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword1"
                value={formData.confirmPassword1}
                onChange={changeHandler}
                onBlur={blurHandler}
                placeholder="Confirm Password"
                className="shadow-sm shadow-zinc-300 px-4 py-2 pr-10 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible className="text-gray-400 text-lg" /> : <AiOutlineEye className="text-gray-400 text-lg" />}
              </div>
            </div>
            {errors.confirmPassword1 && (
              <p className="text-red-600 text-xs">
                {errors.confirmPassword1}
              </p>
            )}

            {formError && (
              <p className="text-red-600 text-sm text-center">{formError}</p>
            )}

            <button
              disabled={loadingReset}
              onClick={resetPassword}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-md h-10 transition flex justify-center items-center cursor-pointer"
            >
              {loadingReset ? (
                <div className="flex gap-1 items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p>loading...</p>
                </div>
              ) : (
                "Update Password"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;