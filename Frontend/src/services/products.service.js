import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi
} from "../api/products.api";

export const getProductsService = async () => {
  return await getProductsApi();
};

export const createProductService = async (formData) => {
  return await createProductApi(formData);
};

export const updateProductService = async (id, formData) => {
  return await updateProductApi(id, formData);
};

export const deleteProductService = async (id) => {
  return await deleteProductApi(id);
};