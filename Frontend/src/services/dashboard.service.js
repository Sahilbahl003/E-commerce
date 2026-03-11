import { getDashboardStatsApi } from "../api/dashboard.api";

export const getDashboardStatsService = async () => {
  return await getDashboardStatsApi();
};