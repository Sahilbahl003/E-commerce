import {
  sendRegisterOtpApi,
  verifyRegisterOtpApi,
  loginUserApi
} from "../api/auth.api";

import { mergeCartApi } from "../api/cart.api";
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

    // get guest cart from localStorage
    const guestCart = JSON.parse(localStorage.getItem("cartItems"));

    // merge guest cart with DB cart
    if (guestCart && guestCart.length > 0) {
      await mergeCartApi(guestCart);
      localStorage.removeItem("cartItems");
    }
  }

  return data;
};