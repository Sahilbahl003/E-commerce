import { apiPost, apiPut } from "./apiHandler";

export const forgotPasswordApi = (email) => {
  return apiPost("/forgot-password", {
    body: { email },
  });
};

export const sendResetOtpApi = (email) => {
  return apiPost("/send-otp", {
    body: { email },
  });
};

export const verifyResetOtpApi = (email, otp) => {
  return apiPost("/verify-otp", {
    body: { email, otp },
  });
};

export const resetPasswordApi = (formData) => {
  return apiPost("/reset-password", {
    body: formData,
  });
};



export const changePasswordApi = (formData) => {
  return apiPut("/changePassword", {
    body: formData,
  });
};