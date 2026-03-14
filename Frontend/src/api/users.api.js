import { apiGet, apiPut } from "./apiHandler";

export const getUsersApi = (page = 1, limit = 5) => {
  return apiGet(`/users?page=${page}&limit=${limit}`);
};

export const toggleUserStatusApi = (id) => {
  return apiPut(`/users/${id}/toggle-status`);
};