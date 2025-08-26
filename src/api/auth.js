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
      const response = await fetch(
        AUTH_ENDPOINTS.ME,
        getFetchOptions("GET", null, true)
      );
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Not authenticated");
    } catch (error) {
      console.error("Auth check failed:", error);
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }

      const response = await fetch(
        AUTH_ENDPOINTS.LOGIN,
        getFetchOptions("POST", { email, password }, false)
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
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
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }

      const response = await fetch(
        AUTH_ENDPOINTS.REGISTER,
        getFetchOptions("POST", { name, email, password }, false)
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
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
      await fetch(AUTH_ENDPOINTS.LOGOUT, getFetchOptions("POST", null, true));

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout error:", error);
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
  },
};
