import { GenreFilter } from '../types';

interface FilterBarProps {
  selectedGenre: GenreFilter;
  setSelectedGenre: (genre: GenreFilter) => void;
}

const GENRES: GenreFilter[] = [
  'All',
  'Sci-Fi',
  'Drama',
  'Action',
  'Thriller',
  'Crime',
  'Adventure',
  'Animation',
];

export default function FilterBar({ selectedGenre, setSelectedGenre }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-10 border-b border-[#1E1E1E] pb-4">
      {GENRES.map((genre) => {
        const isActive = selectedGenre === genre;
        return (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? 'bg-[#C5A059] text-[#0B0B0B] font-bold shadow-sm'
                : 'bg-[#121212] text-[#888880] hover:text-[#F3F4F6] border border-[#222222] hover:border-[#383838]'
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
