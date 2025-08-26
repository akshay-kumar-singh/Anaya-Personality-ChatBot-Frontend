import { Sparkles } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
        <Sparkles size={32} className="text-white" />
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-white">
        Ready to Begin?
      </h3>
      <p className="text-gray-300 max-w-md">
        I'm Anaya 🌸 — here to share heart-to-heart conversations, explore your
        thoughts, and help you discover new insights about yourself.
      </p>
    </div>
  );
};

export default EmptyState;
