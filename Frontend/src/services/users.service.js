import { getUsersApi, toggleUserStatusApi } from "../api/users.api";

export const getUsersService = async () => {
  return await getUsersApi();
};

export const toggleUserStatusService = async (id) => {
  return await toggleUserStatusApi(id);
};