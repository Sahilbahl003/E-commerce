import { apiGet, apiPut } from "./apiHandler";

export const getUserProfileApi = () => {
  return apiGet("/profile");
};

export const updateUserProfileApi = (formData) => {
  return apiPut("/updateProfile", {   
    body: formData
  });
};

export const removeProfileImageApi = () => {
  return apiPut("/removeProfileImage");
};