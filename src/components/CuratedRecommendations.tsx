import { useMemo } from 'react';
import { Film, Bookmark } from 'lucide-react';
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
    <section id="recommendations" className="relative py-20 bg-[#0B0E14] border-b border-[#1E2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#E50914] uppercase tracking-wider block mb-1">
            دليل المشاهدة السينمائي
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            مختارات سينما وورلد الخالدة
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
            أرشيف انتقائي يوثق أروع الإنجازات السردية والبصرية لكبار صناع السينما العالمية.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filter Categories */}
        <FilterBar selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

        {/* Empty States or Movie Grid */}
        {selectedGenre === 'Watchlist' && !user ? (
          <div className="text-center py-16 bg-[#121622] rounded-xl border border-[#1E2536] max-w-md mx-auto p-8 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#1A2030] flex items-center justify-center mx-auto mb-4 text-[#E50914]">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">سجّل دخولك لحفظ ومزامنة قائمتك</h3>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
              يمكنك ربط قائمتك السينمائية بحسابك للوصول إليها وإدارتها من أي جهاز في أي وقت.
            </p>
            <button
              onClick={signIn}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              تسجيل الدخول بحساب Google
            </button>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-16 bg-[#121622] rounded-xl border border-[#1E2536] max-w-md mx-auto p-8">
            <Film className="w-10 h-10 mx-auto mb-3 text-[#475569]" />
            <h3 className="text-sm font-semibold text-[#CBD5E1] mb-1">
              {selectedGenre === 'Watchlist' ? 'قائمتك المحفوظة فارغة حالياً' : 'لم يتم العثور على أفلام مطابقة'}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {selectedGenre === 'Watchlist' 
                ? 'اضغط على زر الإشارة المرجعية بجانب أي فيلم لحفظه في قائمتك.'
                : 'جرب البحث بكلمات أخرى أو اختر تصنيفاً سينمائياً مختلفاً.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onWatchTrailer={onWatchTrailer} />
            ))}
          </div>
        )}

        {/* Count Indicator */}
        <div className="mt-12 pt-6 border-t border-[#1E2536] flex items-center justify-between text-xs text-[#64748B]">
          <span>عدد الأفلام المعروضة: {filteredMovies.length}</span>
          <span>تحديثات مستمرة لأفضل ترشيحات السينما</span>
        </div>

      </div>
    </section>
  );
}
