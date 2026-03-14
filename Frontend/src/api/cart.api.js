import { apiPost,apiGet, apiPut, apiDelete } from "./apiHandler";

// add item to cart
export const addToCartApi = (data) => {
  return apiPost("/cart/add", {
    body: data,
  });
};

// get logged in user cart
export const getCartApi = () => {
  return apiGet("/cart");
};

// update cart quantity
export const updateCartApi = (data) => {
  return apiPut("/cart/update", {
    body: data,
  });
};

// remove item from cart
export const removeCartItemApi = (productId) => {
  return apiDelete(`/cart/${productId}`);
};

// merge guest cart after login
export const mergeCartApi = (cart) => {

  const formattedCart = cart.map((item) => ({
    productId: item._id,
    quantity: item.quantity
  }));

  return apiPost("/cart/merge", {
    body: { items: formattedCart },
  });

};