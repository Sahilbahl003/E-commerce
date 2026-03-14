import { apiGet, apiPost } from "./apiHandler";

export const getWishlistApi = () => {
  return apiGet("/wishlist");
};

export const toggleWishlistApi = (productId) => {
  return apiPost("/wishlist/toggle", {
    body: { productId }
  });
};