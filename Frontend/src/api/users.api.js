import { apiGet, apiPut } from "./apiHandler";

export const getUsersApi = () => {
  return apiGet("/users");
};

export const toggleUserStatusApi = (id) => {
  return apiPut(`/users/${id}/toggle-status`);
};