import { Sparkles, User } from "lucide-react";

const Message = ({ message }) => {
  const isUser = message.type === "user";
  const isAssistant = message.type === "assistant";

  return (
    <div className={`flex gap-4 mb-8 ${isUser ? "justify-end" : ""}`}>
      {isAssistant && (
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <Sparkles size={16} className="text-white" />
        </div>
      )}

      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-3xl`}
      >
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-12"
              : "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 border border-gray-700"
          }`}
        >
          {message.content}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Message;
