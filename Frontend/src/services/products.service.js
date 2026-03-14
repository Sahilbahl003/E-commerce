import {
getProductsApi,
createProductApi,
updateProductApi,
deleteProductApi,
getProductByIdApi,
searchProductsApi
} from "../api/products.api";

export const getProductsService = async (params)=>{
return await getProductsApi(params);
};

export const getProductByIdService = async (id)=>{
return await getProductByIdApi(id);
};

export const createProductService = async (formData)=>{
return await createProductApi(formData);
};

export const updateProductService = async (id,formData)=>{
return await updateProductApi(id,formData);
};

export const deleteProductService = async (id)=>{
return await deleteProductApi(id);
};

export const searchProductsService = async (keyword)=>{
return await searchProductsApi(keyword);
};