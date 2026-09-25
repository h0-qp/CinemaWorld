import { Bookmark } from 'lucide-react';
import { GenreFilter } from '../types';
import { useAuth } from '../context/AuthContext';

interface FilterBarProps {
  selectedGenre: GenreFilter;
  setSelectedGenre: (genre: GenreFilter) => void;
}

const GENRES: { key: GenreFilter; labelAr: string }[] = [
  { key: 'All', labelAr: 'كافة الأعمال' },
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
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-5 border-b border-[#181818]">
      {GENRES.map(({ key, labelAr }) => {
        const isActive = selectedGenre === key;
        const isWatchlist = key === 'Watchlist';

        return (
          <button
            key={key}
            onClick={() => setSelectedGenre(key)}
            className={`group relative flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
              isActive
                ? 'bg-[#C5A059] text-[#070707] font-bold shadow-[0_0_15px_rgba(197,160,89,0.25)]'
                : 'bg-[#0E0E0E] text-[#9A9A92] hover:text-[#F3F4F6] border border-[#1E1E1E] hover:border-[#383838]'
            }`}
          >
            {isWatchlist && (
              <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'fill-current' : 'text-[#C5A059]'}`} />
            )}
            <span className="font-serif">{labelAr}</span>
            <span className={`text-[10px] font-mono uppercase ${isActive ? 'text-black/80' : 'text-[#666]'}`}>
              ({isWatchlist ? (user ? watchlist.length : 0) : key})
            </span>
          </button>
        );
      })}
    </div>
  );
}
