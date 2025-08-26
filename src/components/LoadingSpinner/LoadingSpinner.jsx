import React from "react";
import { Sparkles, Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles size={32} className="text-white animate-pulse" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Loader2 size={20} className="animate-spin text-pink-400" />
          <span className="text-lg text-gray-200">Preparing your space...</span>
        </div>
        <p className="text-sm text-gray-400">
          Anaya is getting ready for our next conversation ✨
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
