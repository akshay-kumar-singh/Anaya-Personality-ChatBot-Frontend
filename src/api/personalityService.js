import { API_CONFIG, getFetchOptions } from "./config.js";

const PERSONALITY_ENDPOINTS = {
  BASE: `${API_CONFIG.BASE_URL}/personality-reports`,
  byConversation: (id) =>
    `${API_CONFIG.BASE_URL}/personality-reports/conversation/${id}`,
  latest: (id) =>
    `${API_CONFIG.BASE_URL}/personality-reports/conversation/${id}/latest`,
  byId: (id) => `${API_CONFIG.BASE_URL}/personality-reports/${id}`,
};

export const personalityService = {
  getAllReports: async () => {
    try {
      const response = await fetch(
        PERSONALITY_ENDPOINTS.BASE,
        getFetchOptions()
      );

      if (!response.ok) {
        throw new Error("Failed to load personality reports");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to load personality reports:", error);
      throw error;
    }
  },

  getReportsByConversation: async (conversationId) => {
    try {
      const response = await fetch(
        PERSONALITY_ENDPOINTS.byConversation(conversationId),
        getFetchOptions()
      );

      if (!response.ok) {
        throw new Error("Failed to load conversation reports");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to load conversation reports:", error);
      throw error;
    }
  },

  getLatestReport: async (conversationId) => {
    try {
      const response = await fetch(
        PERSONALITY_ENDPOINTS.latest(conversationId),
        getFetchOptions()
      );

      if (!response.ok) {
        throw new Error("Failed to load latest report");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to load latest report:", error);
      throw error;
    }
  },

  saveReport: async (reportData) => {
    try {
      const response = await fetch(
        PERSONALITY_ENDPOINTS.BASE,
        getFetchOptions("POST", reportData)
      );

      if (!response.ok) {
        throw new Error("Failed to save personality report");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to save personality report:", error);
      throw error;
    }
  },

  deleteReport: async (reportId) => {
    try {
      const response = await fetch(
        PERSONALITY_ENDPOINTS.byId(reportId),
        getFetchOptions("DELETE")
      );

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to delete report:", error);
      throw error;
    }
  },
};
