import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#777770]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="ابحث عن اسم الفيلم بالإنجليزية، المخرج، أو التصنيف..."
        className="w-full pr-11 pl-10 py-3 bg-[#111111] border border-[#222222] text-[#E8E8E6] placeholder-[#666660] text-xs sm:text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#777770] hover:text-[#E8E8E6] transition-colors"
          aria-label="مسح البحث"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
