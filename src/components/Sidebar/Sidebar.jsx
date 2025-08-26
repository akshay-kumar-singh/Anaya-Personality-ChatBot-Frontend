import { PlusCircle, X, ChevronLeft } from "lucide-react";
import ConversationItem from "../ConversationItem/ConversationItem";
import SearchBar from "../SearchBar/SearchBar";
import UserProfile from "../UserProfile/UserProfile";

const Sidebar = ({
  isOpen,
  onClose,
  onToggle,
  conversations,
  onSelectConversation,
  onViewReport,
  onEditConversation,
  onDeleteConversation,
  onNewChat,
  onLogout,
  user,
  isMobile,
}) => {
  return (
    <div
      className={`${isOpen ? "w-72" : "w-0"} ${
        isMobile ? "absolute z-50 h-full" : "relative"
      } 
        transition-all duration-300 bg-gray-900 text-white overflow-hidden shadow-lg`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-950">
          <h1 className="text-lg font-bold tracking-wide">✨ Anaya Chat</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-800 transition"
            >
              <X size={18} />
            </button>
            <button
              onClick={onToggle}
              className="hidden md:block p-1.5 rounded-lg hover:bg-gray-800 transition"
              title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        <div className="px-4 py-3">
          <button
            onClick={onNewChat}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border border-gray-700 
                       bg-gray-800/50 hover:bg-gray-800 transition-all text-sm font-medium shadow-sm"
          >
            <PlusCircle size={18} className="text-blue-400" />
            <span>New Chat</span>
          </button>
        </div>

        <SearchBar />

        <div className="flex-1 overflow-y-auto px-3 pb-2">
          <div className="space-y-1">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  onSelect={onSelectConversation}
                  onViewReport={onViewReport}
                  onEdit={onEditConversation}
                  onDelete={onDeleteConversation}
                  isActive={conv.active}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat to begin</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 bg-gray-950">
          <UserProfile user={user} onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
