import { User, Settings, LogOut } from "lucide-react";

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-900">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <User size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-400">{user?.plan || "Free Plan"}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg 
                     hover:bg-gray-800 text-sm transition-colors"
        >
          <Settings size={14} />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg 
                     text-sm transition-colors 
                     hover:bg-red-700 hover:text-white"
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
