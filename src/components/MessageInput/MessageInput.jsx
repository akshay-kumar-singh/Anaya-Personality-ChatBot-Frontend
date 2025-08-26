import { Send, Mic, Paperclip, Sparkles } from "lucide-react";

const MessageInput = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  textareaRef,
}) => {
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-3 ml-0.5">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative flex items-end gap-3 bg-gray-850 rounded-2xl border border-gray-700 
          p-3 shadow-lg transition-all focus-within:border-pink-500 focus-within:shadow-pink-500/20"
        >
          <button className="text-gray-400 hover:text-pink-400 p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Paperclip size={18} />
          </button>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyPress}
            onInput={handleInput}
            placeholder="Share what’s on your mind..."
            className="flex-1 resize-none bg-transparent border-none outline-none max-h-32 min-h-[28px] py-2 
                       text-gray-200 placeholder-gray-500 text-sm"
            rows="1"
            style={{
              height: "auto",
              minHeight: "28px",
            }}
          />

          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-pink-400 p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Mic size={18} />
            </button>
            <button
              onClick={onSendMessage}
              disabled={!message.trim()}
              className={`p-3 rounded-full transition-all ${
                message.trim()
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              {message.trim() ? <Sparkles size={16} /> : <Send size={16} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3 italic">
          Anaya isn’t perfect — sometimes she may be wrong.
          <span className="ml-1 text-pink-400">
            Trust your own wisdom too ✨
          </span>
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
