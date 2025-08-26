import { API_CONFIG, getFetchOptions } from "./config.js";

const CONVERSATION_ENDPOINTS = {
  BASE: `${API_CONFIG.BASE_URL}/conversations`,
  byId: (id) => `${API_CONFIG.BASE_URL}/conversations/${id}`,
  messages: (id) => `${API_CONFIG.BASE_URL}/conversations/${id}/messages`,
};

export const conversationsAPI = {
  getAll: async () => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.BASE,
        getFetchOptions()
      );

      if (!response.ok) {
        throw new Error("Failed to load conversations");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to load conversations:", error);
      throw error;
    }
  },

  getById: async (conversationId) => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.byId(conversationId),
        getFetchOptions()
      );

      if (!response.ok) {
        throw new Error("Failed to load conversation");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to load conversation:", error);
      throw error;
    }
  },

  create: async (title, message) => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.BASE,
        getFetchOptions("POST", { title, message })
      );

      if (!response.ok) {
        throw new Error("Failed to create conversation");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create conversation:", error);
      throw error;
    }
  },

  update: async (conversationId, title) => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.byId(conversationId),
        getFetchOptions("PUT", { title })
      );

      if (!response.ok) {
        throw new Error("Failed to update conversation");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update conversation:", error);
      throw error;
    }
  },

  delete: async (conversationId) => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.byId(conversationId),
        getFetchOptions("DELETE")
      );

      if (!response.ok) {
        throw new Error("Failed to delete conversation");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      throw error;
    }
  },

  addMessage: async (conversationId, content, type = "user") => {
    try {
      const response = await fetch(
        CONVERSATION_ENDPOINTS.messages(conversationId),
        getFetchOptions("POST", { content, type })
      );

      if (!response.ok) {
        throw new Error("Failed to add message");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to add message:", error);
      throw error;
    }
  },
};
