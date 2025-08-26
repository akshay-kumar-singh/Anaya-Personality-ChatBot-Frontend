import { API_CONFIG, getFetchOptions } from "../api/config.js";

const AI_SERVICE_ENDPOINTS = {
  CHAT: `${API_CONFIG.BASE_URL}/ai/chat`,
  ANALYZE_PERSONALITY: `${API_CONFIG.BASE_URL}/ai/analyze-personality`,
  GENERATE_QUESTION: `${API_CONFIG.BASE_URL}/ai/generate-question`,
};

export const aiService = {
  sendMessage: async (messages, context = {}) => {
    try {
      const response = await fetch(
        AI_SERVICE_ENDPOINTS.CHAT,
        getFetchOptions("POST", { messages, context })
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      return await response.json();
    } catch (error) {
      console.error("AI Chat API Error:", error);
      throw error;
    }
  },

  analyzePersonality: async (
    conversationHistory,
    conversationId = null,
    messageCount = 0
  ) => {
    try {
      const response = await fetch(
        AI_SERVICE_ENDPOINTS.ANALYZE_PERSONALITY,
        getFetchOptions("POST", {
          conversationHistory,
          conversationId,
          messageCount,
        })
      );

      if (!response.ok) {
        throw new Error("Failed to analyze personality");
      }

      return await response.json();
    } catch (error) {
      console.error("Personality Analysis Error:", error);
      throw error;
    }
  },

  generateQuestion: async (userMessage, conversationHistory) => {
    try {
      const response = await fetch(
        AI_SERVICE_ENDPOINTS.GENERATE_QUESTION,
        getFetchOptions("POST", { userMessage, conversationHistory })
      );

      if (!response.ok) {
        throw new Error("Failed to generate question");
      }

      return await response.json();
    } catch (error) {
      console.error("Question Generation Error:", error);
      throw error;
    }
  },
};
