import {
  getOrdersApi,
  updateOrderStatusApi
} from "../api/orders.api";

export const getOrdersService = async () => {
  return await getOrdersApi();
};

export const updateOrderStatusService = async (id, status) => {
  return await updateOrderStatusApi(id, status);
};