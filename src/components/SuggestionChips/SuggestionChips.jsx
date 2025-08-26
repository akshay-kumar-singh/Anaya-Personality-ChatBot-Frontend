import React from "react";

const SuggestionChips = ({ suggestions, onSelectSuggestion, loading }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectSuggestion(suggestion)}
            disabled={loading}
            className="px-5 mt-3 py-2 
            px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 
                         transition-all text-sm font-medium shadow-md hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
