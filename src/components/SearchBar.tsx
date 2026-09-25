import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative group">
        
        {/* Subtle Gold Hover Glow */}
        <div className="absolute -inset-0.5 bg-[#C5A059]/20 rounded-none blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center bg-[#0C0C0C] border border-[#202020] focus-within:border-[#C5A059] transition-all shadow-xl">
          <div className="p-3.5 text-[#777] group-hover:text-[#C5A059] transition-colors">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن فيلم، مخرج (نولان، فيلنوف...)، أو تصنيف في الأرشيف..."
            className="w-full bg-transparent py-3.5 pr-2 pl-4 text-xs sm:text-sm text-[#F5F5F3] placeholder-[#666] font-serif focus:outline-none text-right"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-3 text-[#777] hover:text-white transition-colors"
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:block pl-3 text-[10px] font-mono text-[#555] whitespace-nowrap">
            PRESTIGE SEARCH
          </div>
        </div>

      </div>
    </div>
  );
}
