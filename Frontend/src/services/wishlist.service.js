import {
  getWishlistApi,
  toggleWishlistApi
} from "../api/wishlist.api";

export const getWishlistService = async () => {
  return await getWishlistApi();
};

export const toggleWishlistService = async (productId) => {
  return await toggleWishlistApi(productId);
};