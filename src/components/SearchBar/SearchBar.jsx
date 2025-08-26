import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="px-4 mb-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
          size={18}
        />

        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl 
                     text-gray-200 placeholder-gray-500 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;
