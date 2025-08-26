export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const getHeaders = (includeAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return headers;
};

export const getFetchOptions = (method = "GET", body = null) => ({
  method,
  headers: getHeaders(),
  credentials: "include",
  ...(body && { body: JSON.stringify(body) }),
});
