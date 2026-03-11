import { apiGet } from "./apiHandler";

export const getDashboardStatsApi = () => {
  return apiGet("/dashboard",);
};