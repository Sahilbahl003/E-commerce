import {
  sendRegisterOtpApi,
  verifyRegisterOtpApi,
  loginUserApi
} from "../api/auth.api";
import { setToken, setUser } from "../utils/auth";

export const sendRegisterOtp = async (formData) => {
  return await sendRegisterOtpApi(formData);
};

export const verifyRegisterOtp = async (data) => {
  return await verifyRegisterOtpApi(data);
};

export const loginUser = async (formData) => {
  const data = await loginUserApi(formData);

  if (data.token) {
    setToken(data.token);
    setUser(data.user);
  }

  return data;
};