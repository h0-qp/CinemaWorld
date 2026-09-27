import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center bg-[#131722] border border-[#1E2536] focus-within:border-[#E50914] rounded-xl transition-all shadow-sm">
        <div className="p-3.5 text-[#64748B]">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن فيلم، مخرج (نولان، تارانتينو...)، أو تصنيف..."
          className="w-full bg-transparent py-3 pr-2 pl-4 text-sm text-white placeholder-[#64748B] focus:outline-none text-right"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-3 text-[#64748B] hover:text-white transition-colors"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
