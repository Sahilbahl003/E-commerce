import { apiGet, apiDelete, apiPost, apiPut } from "./apiHandler";

export const getCategoriesApi = () => {
  return apiGet("/categories");
};

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