import { apiGet, apiDelete, apiPost, apiPut } from "./apiHandler";

export const getCategoriesApi = (page = 1, limit = 10, parentId = null) => {
  let url = `/categories?page=${page}&limit=${limit}`;

  // only add parentId if it exists
  if (parentId !== null) {
    url += `&parentId=${parentId}`;
  }

  return apiGet(url);
};

export const getCategoryByIdApi = (id) => {
  return apiGet(`/categories/${id}`);
};

export const deleteCategoryApi = (id) => {
  return apiDelete(`/categories/${id}`);
};

export const createCategoryApi = (formData) => {
  return apiPost("/categories", {
    body: formData
  });
};


export const updateCategoryApi = (id, formData) => {
  return apiPut(`/categories/${id}`, {
    body: formData
  });
};