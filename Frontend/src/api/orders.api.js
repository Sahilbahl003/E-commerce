import { apiGet, apiPut } from "./apiHandler";

export const getOrdersApi = () => {
  return apiGet("/orders", );
};

export const updateOrderStatusApi = (id, status) => {
  return apiPut(`/orders/${id}`, {
    body: { status }
  });
};