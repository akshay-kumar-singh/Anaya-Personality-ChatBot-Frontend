import { API_CONFIG, getFetchOptions } from "./config.js";

const AUTH_ENDPOINTS = {
  LOGIN: `${API_CONFIG.BASE_URL}/auth/login`,
  REGISTER: `${API_CONFIG.BASE_URL}/auth/register`,
  LOGOUT: `${API_CONFIG.BASE_URL}/auth/logout`,
  ME: `${API_CONFIG.BASE_URL}/auth/me`,
};

export const authAPI = {
  checkAuth: async () => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.ME, getFetchOptions());
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Not authenticated");
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear any stale localStorage data if you're using it
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      if (typeof document !== "undefined") {
        document.cookie =
          "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      const response = await fetch(
        AUTH_ENDPOINTS.LOGIN,
        getFetchOptions("POST", { email, password })
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);

      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error(
          "Unable to connect to server. Please check your connection and try again."
        );
      }

      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      if (typeof document !== "undefined") {
        document.cookie =
          "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      const response = await fetch(
        AUTH_ENDPOINTS.REGISTER,
        getFetchOptions("POST", { name, email, password })
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);

      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error(
          "Unable to connect to server. Please check your connection and try again."
        );
      }

      throw error;
    }
  },

  logout: async () => {
    try {
      await fetch(AUTH_ENDPOINTS.LOGOUT, getFetchOptions("POST"));

      if (typeof document !== "undefined") {
        document.cookie =
          "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Logout error:", error);

      if (typeof document !== "undefined") {
        document.cookie =
          "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      throw error;
    }
  },
};
