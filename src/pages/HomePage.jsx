import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import MessagesArea from "../components/MessagesArea/MessagesArea";
import MessageInput from "../components/MessageInput/MessageInput";
import SuggestionChips from "../components/SuggestionChips/SuggestionChips";
import PersonalityReport from "../components/PersonalityReport/PersonalityReport";
import ReportHistoryModal from "../components/ReportHistoryModal/ReportHistoryModal";
import { useAuth } from "../context/AuthContext";
import { conversationsAPI } from "../api/conversations";
import { aiService } from "../api/aiServices";
import { APP_CONSTANTS, MESSAGE_TYPES } from "../utils/constants";

const HomePage = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [personalityReport, setPersonalityReport] = useState(null);
  const [userMessageCount, setUserMessageCount] = useState(0);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedConversationForReport, setSelectedConversationForReport] =
    useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { logout } = useAuth();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < APP_CONSTANTS.MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatConversations = (data) => {
    return data.map((conv, index) => ({
      id: conv._id,
      title: conv.title,
      active: index === 0,
      createdAt: conv.createdAt,
      hasReports: conv.hasReports,
      reportCount: conv.reportCount,
    }));
  };

  const formatMessages = (messages) => {
    return messages.map((msg, index) => ({
      id: index + 1,
      type: msg.type,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
  };

  const loadConversations = async () => {
    try {
      const data = await conversationsAPI.getAll();
      const formattedConversations = formatConversations(data);
      setConversations(formattedConversations);

      if (formattedConversations.length > 0) {
        loadConversation(formattedConversations[0].id);
      } else {
        const initialMessage = {
          id: 1,
          type: MESSAGE_TYPES.ASSISTANT,
          content:
            "Hi there! I'm Anaya, and I'm so excited to get to know you better. I'd love to understand what makes you uniquely you. Could you start by telling me a little about yourself? ✨",
        };
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadConversation = async (conversationId) => {
    try {
      const conversation = await conversationsAPI.getById(conversationId);
      setCurrentConversation(conversation);

      const formattedMessages = formatMessages(conversation.messages);
      setMessages(formattedMessages);

      const userMsgCount = conversation.messages.filter(
        (msg) => msg.type === MESSAGE_TYPES.USER
      ).length;
      setUserMessageCount(userMsgCount);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const getAIResponse = async (userMessage, isFirstMessage = false) => {
    try {
      const aiMessages = messages.map((msg) => ({
        role: msg.type === MESSAGE_TYPES.USER ? "user" : "assistant",
        content: msg.content,
      }));

      aiMessages.push({ role: "user", content: userMessage });

      const response = await aiService.sendMessage(aiMessages, {
        isFirstMessage,
      });
      return response.message;
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "I'm having a little trouble connecting right now. Could you try sharing that with me again? I really want to hear what you have to say! 💫";
    }
  };

  const getQuestion = async (userMessage) => {
    try {
      const conversationHistory = messages.map((msg) => ({
        type: msg.type,
        content: msg.content,
      }));

      const response = await aiService.generateQuestion(
        userMessage,
        conversationHistory
      );
      return response;
    } catch (error) {
      console.error("Error getting question:", error);
      return {
        question: "I'm curious - how are you feeling in this moment? 💭",
        options: ["Really happy", "Pretty good", "Just okay", "A bit down"],
      };
    }
  };

  const generatePersonalityReport = async () => {
    try {
      const conversationHistory = messages.map((msg) => ({
        type: msg.type,
        content: msg.content,
      }));

      const report = await aiService.analyzePersonality(
        conversationHistory,
        currentConversation?._id,
        userMessageCount
      );

      if (report.reportId && currentConversation) {
        setConversations(
          conversations.map((conv) =>
            conv.id === currentConversation._id
              ? { ...conv, hasReports: true, reportCount: report.version || 1 }
              : conv
          )
        );
      }

      return report;
    } catch (error) {
      console.error("Error generating personality report:", error);
      return null;
    }
  };

  const handleViewReport = async (conversationId) => {
    try {
      const conversation = conversations.find((c) => c.id === conversationId);
      setSelectedConversationForReport(conversation);
      setReportModalOpen(true);
    } catch (error) {
      console.error("Error viewing report:", error);
    }
  };

  const handleEditConversation = async (conversationId, newTitle) => {
    try {
      await conversationsAPI.update(conversationId, newTitle);

      setConversations(
        conversations.map((conv) =>
          conv.id === conversationId ? { ...conv, title: newTitle } : conv
        )
      );

      if (currentConversation && currentConversation._id === conversationId) {
        setCurrentConversation({ ...currentConversation, title: newTitle });
      }
    } catch (error) {
      console.error("Failed to update conversation:", error);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await conversationsAPI.delete(conversationId);

      const updatedConversations = conversations.filter(
        (conv) => conv.id !== conversationId
      );
      setConversations(updatedConversations);

      if (currentConversation && currentConversation._id === conversationId) {
        if (updatedConversations.length > 0) {
          const firstConv = updatedConversations[0];
          setConversations(
            updatedConversations.map((conv) => ({
              ...conv,
              active: conv.id === firstConv.id,
            }))
          );
          loadConversation(firstConv.id);
        } else {
          createNewChat();
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: MESSAGE_TYPES.USER,
      content: message,
    };

    setMessages([...messages, userMessage]);
    const currentMessage = message;
    setMessage("");
    setLoading(true);
    setSuggestions([]);

    try {
      let conversationId = currentConversation?._id;
      const isFirstMessage = messages.length === 0;

      if (!conversationId) {
        const title =
          currentMessage.slice(
            0,
            APP_CONSTANTS.DEFAULT_CONVERSATION_TITLE_LENGTH
          ) +
          (currentMessage.length >
          APP_CONSTANTS.DEFAULT_CONVERSATION_TITLE_LENGTH
            ? "..."
            : "");

        const newConv = await conversationsAPI.create(title, currentMessage);
        conversationId = newConv._id;
        setCurrentConversation(newConv);

        const newConvItem = {
          id: newConv._id,
          title: newConv.title,
          active: true,
          hasReports: false,
          reportCount: 0,
        };
        setConversations((prev) => [
          newConvItem,
          ...prev.map((c) => ({ ...c, active: false })),
        ]);
      } else {
        await conversationsAPI.addMessage(
          conversationId,
          currentMessage,
          MESSAGE_TYPES.USER
        );
      }

      const aiContent = await getAIResponse(currentMessage, isFirstMessage);
      const aiResponse = {
        id: messages.length + 2,
        type: MESSAGE_TYPES.ASSISTANT,
        content: aiContent,
      };

      setMessages((prev) => [...prev, aiResponse]);

      if (conversationId) {
        await conversationsAPI.addMessage(
          conversationId,
          aiContent,
          MESSAGE_TYPES.ASSISTANT
        );
      }

      const questionData = await getQuestion(currentMessage);
      const questionMessage = {
        id: messages.length + 3,
        type: MESSAGE_TYPES.ASSISTANT,
        content: questionData.question,
        options: questionData.options,
      };

      setMessages((prev) => [...prev, questionMessage]);
      setSuggestions(questionData.options);

      if (conversationId) {
        await conversationsAPI.addMessage(
          conversationId,
          questionData.question,
          MESSAGE_TYPES.ASSISTANT
        );
      }

      const newUserMessageCount = userMessageCount + 1;
      setUserMessageCount(newUserMessageCount);

      if (newUserMessageCount >= 20 && newUserMessageCount % 5 === 0) {
        const report = await generatePersonalityReport();
        if (report) {
          setPersonalityReport(report);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      setLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setMessage(suggestion);
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const closeSidebar = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const selectConversation = (id) => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        active: conv.id === id,
      }))
    );
    loadConversation(id);
    setPersonalityReport(null);
  };

  const createNewChat = () => {
    setCurrentConversation(null);
    setMessages([
      {
        id: 1,
        type: MESSAGE_TYPES.ASSISTANT,
        content:
          "Hi there! I'm Anaya, and I'm so excited to get to know you better. I'd love to understand what makes you uniquely you. Could you start by telling me a little about yourself? ✨",
      },
    ]);
    setSuggestions([]);
    setPersonalityReport(null);
    setUserMessageCount(0);
    setConversations(conversations.map((c) => ({ ...c, active: false })));
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleStartOver = () => {
    createNewChat();
  };

  const handleGenerateMore = () => {
    setPersonalityReport(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
        conversations={conversations}
        onSelectConversation={selectConversation}
        onViewReport={handleViewReport}
        onEditConversation={handleEditConversation}
        onDeleteConversation={handleDeleteConversation}
        onNewChat={createNewChat}
        onLogout={handleLogout}
        user={user}
        isMobile={isMobile}
      />
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <div className="flex flex-col flex-1 min-w-0 bg-gray-950 z-50">
        <ChatHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        {personalityReport ? (
          <PersonalityReport
            report={personalityReport}
            onStartOver={handleStartOver}
            onGenerateMore={handleGenerateMore}
          />
        ) : (
          <>
            <MessagesArea
              messages={messages}
              messagesEndRef={messagesEndRef}
              loading={loading}
            />

            {suggestions.length > 0 && (
              <div className="bg-gray-500">
                <SuggestionChips
                  suggestions={suggestions}
                  onSelectSuggestion={handleSuggestionSelect}
                  loading={loading}
                />
              </div>
            )}

            <MessageInput
              message={message}
              setMessage={setMessage}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
              textareaRef={textareaRef}
              disabled={loading}
            />
          </>
        )}
      </div>
      <ReportHistoryModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        conversationId={selectedConversationForReport?.id}
        conversationTitle={selectedConversationForReport?.title}
      />
    </div>
  );
};

export default HomePage;
