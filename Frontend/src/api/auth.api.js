import { apiPost } from "./apiHandler";

export const sendRegisterOtpApi = (formData) => {
  return apiPost("/register-otp", { body: formData });
};

export const verifyRegisterOtpApi = (data) => {
  return apiPost("/verify-register", {
    body: data,
  });
};

export const loginUserApi = (formData) => {
  return apiPost("/login", { body: formData });
};