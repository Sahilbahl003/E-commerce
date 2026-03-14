import { apiGet, apiPost, apiPut, apiDelete } from "./apiHandler";
export const getProductsApi = (params = {}) => {const query = new URLSearchParams(params).toString();return apiGet(`/products?${query}`);};
export const getProductByIdApi = (id) => {return apiGet(`/products/${id}`);};
export const createProductApi = (formData) => {return apiPost("/products",{ body:formData });};
export const updateProductApi = (id,formData) => {return apiPut(`/products/${id}`,{ body:formData });};
export const deleteProductApi = (id) => {return apiDelete(`/products/${id}`);};
export const searchProductsApi = (keyword="") => {return apiGet(`/search?keyword=${encodeURIComponent(keyword)}`);};