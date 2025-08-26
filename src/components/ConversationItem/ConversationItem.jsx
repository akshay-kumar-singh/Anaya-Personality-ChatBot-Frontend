import {
  MessageSquare,
  Edit3,
  Trash2,
  FileText,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";

const ConversationItem = ({
  conversation,
  onSelect,
  onViewReport,
  onEdit,
  onDelete,
  isActive,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditStart = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditTitle(conversation.title);
  };

  const handleEditSave = (e) => {
    e.stopPropagation();
    if (editTitle.trim() && editTitle.trim() !== conversation.title) {
      onEdit(conversation.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = (e) => {
    e.stopPropagation();
    setEditTitle(conversation.title);
    setIsEditing(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = (e) => {
    e.stopPropagation();
    onDelete(conversation.id);
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEditSave(e);
    } else if (e.key === "Escape") {
      handleEditCancel(e);
    }
  };

  return (
    <div
      onClick={() => !isEditing && onSelect(conversation.id)}
      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer
                 transition-all duration-200 hover:bg-gray-700/50 ${
                   isActive
                     ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-l-2 border-pink-400"
                     : ""
                 }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
            isActive
              ? "bg-gradient-to-br from-pink-500 to-purple-600"
              : "bg-gray-700"
          }`}
        >
          <MessageSquare size={12} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-pink-400"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate text-sm block text-white">
              {conversation.title}
            </span>
          )}
          {conversation.hasReports && !isEditing && (
            <span className="text-xs text-pink-300 flex items-center gap-1 mt-1">
              <Sparkles size={10} />
              {conversation.reportCount} insight
              {conversation.reportCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg hover:bg-green-500/20 text-green-300 transition-colors"
              title="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors"
              title="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        ) : showDeleteConfirm ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleDeleteConfirm}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors text-xs"
              title="Confirm Delete"
            >
              Yes
            </button>
            <button
              onClick={handleDeleteCancel}
              className="p-1.5 rounded-lg hover:bg-gray-500/20 text-gray-300 transition-colors text-xs"
              title="Cancel Delete"
            >
              No
            </button>
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
            {conversation.hasReports && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewReport(conversation.id);
                }}
                className="p-1.5 rounded-lg hover:bg-pink-500/20 text-pink-300 transition-colors"
                title="View Insights"
              >
                <FileText size={14} />
              </button>
            )}

            <button
              onClick={handleEditStart}
              className="p-1.5 rounded-lg hover:bg-purple-500/20 text-purple-300 transition-colors"
              title="Edit Title"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors"
              title="Delete Conversation"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
