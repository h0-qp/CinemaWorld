import { Star, Play, Clock, Bookmark } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

export default function MovieCard({ movie, onWatchTrailer }: MovieCardProps) {
  const { isBookmarked, toggleWatchlist } = useAuth();
  const bookmarked = isBookmarked(movie.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <div 
      className="group relative flex flex-col justify-between text-right rounded-xl overflow-hidden bg-[#121622] border border-[#1E2536] hover:border-[#333E56] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => onWatchTrailer(movie)}
    >
      
      {/* Poster Media Box with 2:3 Aspect Ratio */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#0A0D14]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Controls: Bookmark & Rating */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {/* Watchlist Toggle */}
          <button
            onClick={handleBookmarkClick}
            className={`pointer-events-auto p-1.5 rounded-md backdrop-blur-md transition-colors ${
              bookmarked
                ? 'bg-[#E50914] text-white'
                : 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10'
            }`}
            title={bookmarked ? 'إزالة من قائمتي' : 'إضافة إلى قائمتي'}
            aria-label="قائمتي"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
            <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
            <span>{movie.rating}</span>
          </div>
        </div>

        {/* Play Icon Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Year Label */}
        <div className="absolute bottom-2 right-2 text-[11px] font-medium text-slate-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
          {movie.year}
        </div>
      </div>

      {/* Movie Details Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Genre Trail */}
          <div className="text-[11px] font-medium text-[#94A3B8] mb-1 truncate">
            {Array.isArray(movie.genre) ? movie.genre.join(' · ') : ''}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-[#E50914] transition-colors leading-snug line-clamp-1">
            {movie.title}
          </h3>

          {/* Synopsis */}
          <p className="text-xs text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {movie.synopsis}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-2 border-t border-[#1C2232] flex items-center justify-between text-xs text-[#94A3B8]">
          <div className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-[#64748B]" />
            <span>{movie.duration}</span>
          </div>
          <span className="text-[#E50914] font-semibold group-hover:underline text-[11px]">
            مشاهدة الإعلان
          </span>
        </div>
      </div>

    </div>
  );
}
