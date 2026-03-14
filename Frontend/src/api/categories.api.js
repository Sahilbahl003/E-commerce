import { apiGet, apiDelete, apiPost, apiPut } from "./apiHandler";

export const getCategoriesApi = (page = 1, limit = 5) => {
  return apiGet(`/categories?page=${page}&limit=${limit}`);
};

export const getCategoryByIdApi = (id) => {
  return apiGet(`/categories/${id}`);
} ;

export const deleteCategoryApi = (id) => {
  return apiDelete(`/categories/${id}`);
};



export const createCategoryApi = (formData) => {
  return apiPost("/categories", {
    body: formData
  });
};



export const updateCategoryApi = (token, id, formData) => {
  return apiPut(`/categories/${id}`, {
    headers: { token },
    body: formData
  });
};