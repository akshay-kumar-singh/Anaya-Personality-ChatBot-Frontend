import React from "react";
import {
  User,
  FileText,
  RefreshCw,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const PersonalityReport = ({ report, onStartOver, onGenerateMore }) => {
  if (!report) return null;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-20"></div>
            <div className="relative flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-md">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Your Personality Profile
                </h2>
                <p className="text-blue-100 text-sm">
                  Discover what makes you unique ✨
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-6">
            <div className="text-center pb-5 border-b border-gray-200">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-3 shadow-sm">
                <Sparkles className="text-blue-600" size={18} />
                <span className="text-gray-700 font-medium text-sm">
                  Personality Type
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {report.personalityType}
              </h3>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-green-100 rounded-lg shadow-sm">
                  <ThumbsUp className="text-green-600" size={18} />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Pros</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {report.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-green-50 rounded-xl border border-green-100 text-sm text-gray-700 hover:shadow transition-all"
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-red-100 rounded-lg shadow-sm">
                  <ThumbsDown className="text-red-600" size={18} />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Cons</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {report.growthAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-red-50 rounded-xl border border-red-100 text-sm text-gray-700 hover:shadow transition-all"
                  >
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-blue-100 rounded-lg shadow-sm">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Profile</h4>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border-l-4 border-blue-500 text-sm text-gray-700 shadow-inner whitespace-pre-line leading-relaxed">
                {report.profile}
              </div>
            </div>
          </div>

          <div className="p-5 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onStartOver}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-xl border border-gray-300 hover:shadow-md hover:border-gray-400 transition-all text-sm font-medium"
              >
                <RefreshCw size={16} />
                Start New Chat
              </button>
              <button
                onClick={onGenerateMore}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 hover:ring-2 hover:ring-purple-300 transition-all text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <Sparkles size={16} />
                Continue Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityReport;
