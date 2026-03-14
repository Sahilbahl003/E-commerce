import {
  getCategoriesApi,
  deleteCategoryApi,
  createCategoryApi,
  updateCategoryApi,
  getCategoryByIdApi
} from "../api/categories.api";

export const getCategoriesService = async (page = 1, limit = 5) => {
  return await getCategoriesApi(page,limit);
};

export const getCategoryByIdService = async (id) => {
  return await getCategoryByIdApi(id);
};

export const deleteCategoryService = async (id) => {
  return await deleteCategoryApi(id);
};



export const createCategoryService = async (formData) => {
  return await createCategoryApi(formData);
};



export const updateCategoryService = async (id, formData) => {
  return await updateCategoryApi(id, formData);
};