import {
  getUserProfileApi,
  updateUserProfileApi,
  removeProfileImageApi,
} from "../api/profile.api";

import { setToken, setUser } from "../utils/auth";

export const getProfileService = async () => {
  const data = await getUserProfileApi();

  if (data.user) {
    setUser(data.user);
  }

  return data;
};

export const updateProfileService = async (formData) => {
  const data = await updateUserProfileApi(formData);

  if (data.token) {
    setToken(data.token);
  }

  if (data.user) {
    setUser(data.user);
  }

  return data;
};

export const removeProfileImageService = async () => {
  const data = await removeProfileImageApi();

  if (data.user) {
    setUser(data.user);
  }

  return data;
};