const API = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {}, url } = options;

  const requestUrl = url || `${API}${endpoint}`;

  const isFormData = body instanceof FormData;
  const token = localStorage.getItem("token");

  const response = await fetch(requestUrl, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { "token": token } : {}),
      ...headers,
    },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  const data = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const apiGet = (endpoint, options = {}) =>
  apiRequest(endpoint, { method: "GET", ...options });

export const apiPost = (endpoint, options = {}) =>
  apiRequest(endpoint, { method: "POST", ...options });

export const apiPut = (endpoint, options = {}) =>
  apiRequest(endpoint, { method: "PUT", ...options });

export const apiDelete = (endpoint, options = {}) =>
  apiRequest(endpoint, { method: "DELETE", ...options });