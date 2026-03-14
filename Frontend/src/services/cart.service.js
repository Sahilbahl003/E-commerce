import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  removeCartItemApi,
  mergeCartApi,
} from "../api/cart.api";

// add item to cart
export const addToCartService = async (data) => {
  const response = await addToCartApi(data);
  return response;
};

// get user cart
export const getCartService = async () => {
  const response = await getCartApi();
  return response;
};

// update quantity
export const updateCartService = async (data) => {
  const response = await updateCartApi(data);
  return response;
};

// remove item
export const removeCartItemService = async (productId) => {
  const response = await removeCartItemApi(productId);
  return response;
};

// merge guest cart after login
export const mergeCartService = async (cart) => {
  const response = await mergeCartApi(cart);
  return response;
};