import { getUsersApi, toggleUserStatusApi } from "../api/users.api";

export const getUsersService = async (page = 1, limit = 5) => {
  return await getUsersApi(page, limit);
};

export const toggleUserStatusService = async (id) => {
  return await toggleUserStatusApi(id);
};