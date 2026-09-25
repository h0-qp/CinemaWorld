import { useState, useMemo } from 'react';
import { Compass, Film } from 'lucide-react';
import { Movie, GenreFilter } from '../types';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import MovieCard from './MovieCard';

interface CuratedRecommendationsProps {
  movies: Movie[];
  onWatchTrailer: (movie: Movie) => void;
}

export default function CuratedRecommendations({ movies, onWatchTrailer }: CuratedRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>('All');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        movie.title.toLowerCase().includes(q) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(q)) ||
        (movie.director && movie.director.toLowerCase().includes(q)) ||
        movie.synopsis.toLowerCase().includes(q) ||
        movie.genre.some(g => g.toLowerCase().includes(q));
      
      const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, selectedGenre]);

  return (
    <section id="recommendations" className="py-20 bg-[#0B0B0B] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.2em] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>CRITICALLY ACCLAIMED ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-[#F5F5F3]">
            مختارات السينما العالمية الخالدة
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E96] mt-1 font-serif">
            أرشيف انتقائي مدروس لأفضل الأعمال السينمائية والتلفزيونية التي شكلت علامة فارقة في تاريخ الفن السابع.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filter Categories */}
        <FilterBar selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16 bg-[#101010] border border-[#222222] text-[#888880]">
            <Film className="w-10 h-10 mx-auto mb-3 text-[#444]" />
            <h3 className="text-base font-cinzel text-[#CCC] mb-1">لم يتم العثور على أعمال مطابقة</h3>
            <p className="text-xs">جرب البحث بكلمات أخرى أو اختر تصنيفاً سينمائياً مختلفاً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onWatchTrailer={onWatchTrailer} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
