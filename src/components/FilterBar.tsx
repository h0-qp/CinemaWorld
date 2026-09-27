import { Bookmark } from 'lucide-react';
import { GenreFilter } from '../types';
import { useAuth } from '../context/AuthContext';

interface FilterBarProps {
  selectedGenre: GenreFilter;
  setSelectedGenre: (genre: GenreFilter) => void;
}

const GENRES: { key: GenreFilter; labelAr: string }[] = [
  { key: 'All', labelAr: 'كافة الأفلام' },
  { key: 'Watchlist', labelAr: 'قائمتي المحفوظة' },
  { key: 'Sci-Fi', labelAr: 'خيال علمي' },
  { key: 'Drama', labelAr: 'دراما' },
  { key: 'Action', labelAr: 'أكشن ومغامرة' },
  { key: 'Thriller', labelAr: 'إثارة وتشويق' },
  { key: 'Crime', labelAr: 'جريمة وغموض' },
  { key: 'Animation', labelAr: 'رسوم متحركة' },
];

export default function FilterBar({ selectedGenre, setSelectedGenre }: FilterBarProps) {
  const { watchlist, user } = useAuth();

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 pb-4 border-b border-[#1E2536]">
      {GENRES.map(({ key, labelAr }) => {
        const isActive = selectedGenre === key;
        const isWatchlist = key === 'Watchlist';

        return (
          <button
            key={key}
            onClick={() => setSelectedGenre(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-[#E50914] text-white font-semibold shadow-sm'
                : 'bg-[#121622] text-[#94A3B8] hover:text-white hover:bg-[#1A2030] border border-[#1E2536]'
            }`}
          >
            {isWatchlist && (
              <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'fill-current' : 'text-[#E50914]'}`} />
            )}
            <span>{labelAr}</span>
            {isWatchlist && (
              <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#64748B]'}`}>
                ({user ? watchlist.length : 0})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
