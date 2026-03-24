import {
  createOrderApi,
  getMyOrdersApi,
  getOrderByIdApi,
  updateOrderStatusApi
} from "../api/order.api";

export const createOrderService = (data) =>
  createOrderApi(data);

export const getMyOrdersService = (page = 1, limit = 5) =>
  getMyOrdersApi(page, limit);

export const getOrderByIdService = (id) =>
  getOrderByIdApi(id);

export const updateOrderStatusService = async (id, status) => {
  return await updateOrderStatusApi(id, status);
};