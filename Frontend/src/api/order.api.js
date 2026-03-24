import { apiGet, apiPost, apiPut } from "./apiHandler";

export const createOrderApi = (data) =>
  apiPost("/orders", { body: data });

export const getMyOrdersApi = (page = 1, limit = 5) =>
  apiGet(`/orders?page=${page}&limit=${limit}`);

export const getOrderByIdApi = (id) =>
  apiGet(`/orders/${id}`);

export const updateOrderStatusApi = (id, status) => {
  return apiPut(`/orders/${id}`, {
    body: { status }
  });
};