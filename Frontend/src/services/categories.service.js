import {
  getCategoriesApi,
  deleteCategoryApi,
  createCategoryApi,
  updateCategoryApi
} from "../api/categories.api";

export const getCategoriesService = async () => {
  return await getCategoriesApi();
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