import { useMemo } from 'react';
import { Compass, Film, Bookmark, Sparkles } from 'lucide-react';
import { Movie, GenreFilter } from '../types';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import MovieCard from './MovieCard';
import { useAuth } from '../context/AuthContext';

interface CuratedRecommendationsProps {
  movies: Movie[];
  onWatchTrailer: (movie: Movie) => void;
  selectedGenre: GenreFilter;
  setSelectedGenre: (genre: GenreFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CuratedRecommendations({ 
  movies, 
  onWatchTrailer,
  selectedGenre,
  setSelectedGenre,
  searchQuery,
  setSearchQuery
}: CuratedRecommendationsProps) {
  const { isBookmarked, user, signIn } = useAuth();

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        movie.title.toLowerCase().includes(q) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(q)) ||
        (movie.director && movie.director.toLowerCase().includes(q)) ||
        movie.synopsis.toLowerCase().includes(q) ||
        movie.genre.some(g => g.toLowerCase().includes(q));
      
      let matchesGenre = true;
      if (selectedGenre === 'Watchlist') {
        matchesGenre = isBookmarked(movie.id);
      } else if (selectedGenre !== 'All') {
        matchesGenre = movie.genre.includes(selectedGenre);
      }

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, selectedGenre, isBookmarked]);

  return (
    <section id="recommendations" className="relative py-24 bg-[#070707] border-b border-[#181818] overflow-hidden">
      {/* Background Film Grain */}
      <div className="absolute inset-0 cinema-grain opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Classical Symmetry */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.25em] mb-2 font-bold px-3 py-1 bg-[#101010] border border-[#222222]">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>THE CURATED CRITICS' HALL · 35MM ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-[#F8F8F6] tracking-wide cinema-glow mt-2">
            مختارات السينما العالمية الخالدة
          </h2>
          <p className="text-xs sm:text-sm text-[#96968F] mt-2 font-serif max-w-xl mx-auto leading-relaxed">
            أرشيف انتقائي مدروس يوثق أروع الإنجازات السردية والبصرية لكبار صناع السينما، خالية تماماً من الحرق أو المبالغات التجارية.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filter Categories */}
        <FilterBar selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

        {/* Watchlist empty notice or empty search results */}
        {selectedGenre === 'Watchlist' && !user ? (
          <div className="text-center py-20 bg-[#0C0C0C] border border-[#1E1E1E] text-[#888880] max-w-lg mx-auto p-8 shadow-2xl">
            <div className="w-14 h-14 border border-[#C5A059]/40 bg-[#121212] flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-7 h-7 text-[#C5A059]" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-white mb-2">سجّل دخولك لحفظ وتصفح قائمتك السينمائية</h3>
            <p className="text-xs font-serif text-[#A8A8A2] mb-6 leading-relaxed">
              يمكنك ربط قائمتك السينمائية المفضلة بسحابة Firebase للوصول إليها وإدارتها من أي جهاز في أي وقت بنقرة واحدة.
            </p>
            <button
              onClick={signIn}
              className="px-8 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              تسجيل الدخول مع Google
            </button>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 bg-[#0C0C0C] border border-[#1E1E1E] text-[#888880] max-w-md mx-auto p-8">
            <Film className="w-12 h-12 mx-auto mb-3 text-[#333]" />
            <h3 className="text-base font-cinzel text-[#CCC] mb-1 font-bold">
              {selectedGenre === 'Watchlist' ? 'قائمتك المحفوظة فارغة حالياً' : 'لم يتم العثور على أعمال مطابقة'}
            </h3>
            <p className="text-xs font-serif text-[#777] leading-relaxed">
              {selectedGenre === 'Watchlist' 
                ? 'انقر على أيقونة الإشارة المرجعية (Bookmark) بجانب أي فيلم في الأرشيف لحفظه هنا.'
                : 'جرب البحث بكلمات أخرى أو اختر تصنيفاً سينمائياً مختلفاً.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onWatchTrailer={onWatchTrailer} />
            ))}
          </div>
        )}

        {/* Archive Integrity Watermark */}
        <div className="mt-16 pt-8 border-t border-[#141414] flex items-center justify-between text-[11px] font-mono text-[#666660]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>TOTAL ARCHIVED TITLES: {filteredMovies.length}</span>
          </div>
          <span className="text-[#888]">PRESERVED IN 4K & ORIGINAL ASPECT RATIOS</span>
        </div>

      </div>
    </section>
  );
}
