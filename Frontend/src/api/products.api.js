import { apiGet, apiPost, apiPut, apiDelete } from "./apiHandler";

export const getProductsApi = () => {
  return apiGet("/products");
};

export const createProductApi = (formData) => {
  return apiPost("/products", {
    body: formData
  });
};

export const updateProductApi = (id, formData) => {
  return apiPut(`/products/${id}`, {
    body: formData
  });
};

export const deleteProductApi = (id) => {
  return apiDelete(`/products/${id}`, {
  });
};