import {
  forgotPasswordApi,
  sendResetOtpApi,
  verifyResetOtpApi,
  resetPasswordApi,
  changePasswordApi
} from "../api/password.api";

export const forgotPasswordService = (email) =>
  forgotPasswordApi(email);

export const sendResetOtpService = (email) =>
  sendResetOtpApi(email);

export const verifyResetOtpService = (email, otp) =>
  verifyResetOtpApi(email, otp);

export const resetPasswordService = (formData) =>
  resetPasswordApi(formData);



export const changePasswordService = async (formData) => {
  return await changePasswordApi(formData);
};