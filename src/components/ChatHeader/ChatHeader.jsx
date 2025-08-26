import { Menu, ChevronRight, Heart } from "lucide-react";

const ChatHeader = ({ sidebarOpen, onToggleSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900">
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title="Open sidebar"
          >
            <Menu size={20} className="md:hidden text-gray-300" />
            <ChevronRight size={20} className="hidden md:block text-gray-300" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">Anaya</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 
                         transition-all text-sm font-medium shadow-md hover:scale-105"
        >
          My Journey
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
