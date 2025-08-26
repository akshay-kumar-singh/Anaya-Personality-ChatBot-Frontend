import React from "react";
import { Heart, MessageCircle, Sparkles, Shield } from "lucide-react";

const LandingPage = ({ onLogin, onRegister }) => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Anaya</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
            >
              Welcome back
            </button>
            <button
              onClick={onRegister}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 
                       font-medium transition-all transform hover:scale-105"
            >
              Meet Anaya
            </button>
          </div>
        </div>
      </header>

      <main
        className="px-6 pt-8 pb-12 h-full flex items-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Discover Your True Self with
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Anaya
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                I'm Anaya, and I'm here to help you understand yourself better.
                Through thoughtful conversations and personalized insights,
                we'll uncover what makes you uniquely you.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={onRegister}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 
                           font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Your Journey
                </button>
                <button
                  onClick={onLogin}
                  className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl 
                           hover:border-pink-400 hover:text-pink-400 font-semibold text-lg transition-colors"
                >
                  Continue Our Chat
                </button>
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageCircle size={24} className="text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">
                    Personal
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Heart-to-heart conversations
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles size={24} className="text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">
                    Insightful
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Personalized reports
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">
                    Private
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Safe & confidential
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      Chat with Anaya
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 h-80 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-2xl rounded-bl-md max-w-sm">
                      Hi there! I'm Anaya. I'd love to help you discover more
                      about yourself. What brings you here today? ✨
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-sm">
                      I'd like to understand myself better
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-2xl rounded-bl-md max-w-sm">
                      That's wonderful! Let's start with something simple - what
                      energizes you most in your daily life? I'm curious to
                      learn what makes you feel most like yourself 💫
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-sm">
                      Probably connecting with people and creative projects
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-2xl rounded-bl-md max-w-sm animate-pulse">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          Anaya is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Anaya. Your journey to self-discovery starts here.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
