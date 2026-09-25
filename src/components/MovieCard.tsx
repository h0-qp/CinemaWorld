import { Star, Play, Clock, Clapperboard, Bookmark, Film } from 'lucide-react';
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
    <div className="film-card flex flex-col justify-between text-right group overflow-hidden bg-[#0C0C0C]">
      
      {/* Poster with Classic 35mm Aspect Ratio & Sprocket Accent */}
      <div className="relative h-80 sm:h-88 overflow-hidden bg-[#050505] border-b border-[#1A1A1A]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover filter contrast-[1.08] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/50 opacity-90 transition-opacity group-hover:opacity-75" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Watchlist Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            className={`pointer-events-auto p-2 border backdrop-blur-md transition-all duration-300 ${
              bookmarked
                ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-[0_0_12px_rgba(197,160,89,0.4)]'
                : 'bg-black/75 border-[#282828] text-[#888880] hover:text-[#C5A059] hover:border-[#C5A059]'
            }`}
            title={bookmarked ? 'إزالة من قائمتي المحفوظة' : 'حفظ في قائمتي المحفوظة'}
            aria-label="قائمتي المحفوظة"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Rating Score Placard */}
          <div className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#2B2B2B] text-[#E2C378] font-mono text-[11px] flex items-center gap-1.5 shadow-lg">
            <Star className="w-3 h-3 fill-current text-[#C5A059]" />
            <span className="font-bold">{movie.rating}</span>
          </div>
        </div>

        {/* Quick Play Trigger Overlay */}
        <div 
          onClick={() => onWatchTrailer(movie)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 cursor-pointer"
        >
          <div className="w-13 h-13 rounded-full border border-[#C5A059] bg-black/80 flex items-center justify-center text-[#C5A059] shadow-2xl transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current mr-0.5" />
          </div>
        </div>

        {/* Year & Quality Kicker */}
        <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-[#A1A19A] flex items-center gap-1.5 pointer-events-none">
          <Film className="w-3 h-3 text-[#C5A059]" />
          <span>{movie.year} · 4K MASTER</span>
        </div>

      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Genre Trail */}
          <div className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider mb-1 truncate">
            {movie.genre.join(' · ')}
          </div>

          {/* Title in English Classical Roman Font */}
          <h3 className="text-lg font-bold font-cinzel text-[#F5F5F3] mb-1.5 leading-snug group-hover:text-[#C5A059] transition-colors truncate">
            {movie.title}
          </h3>

          {/* Synopsis in Arabic Literary Serif */}
          <p className="text-xs text-[#96968F] line-clamp-2 leading-relaxed font-serif">
            {movie.synopsis}
          </p>
        </div>

        {/* Director & Duration Strip */}
        <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-[11px] font-mono text-[#777770]">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Clock className="w-3 h-3 text-[#C5A059]" />
            <span>{movie.duration}</span>
          </div>
          {movie.director && (
            <div className="flex items-center gap-1.5 truncate max-w-[140px] text-zinc-400">
              <Clapperboard className="w-3 h-3 text-[#C5A059]" />
              <span className="truncate">{movie.director}</span>
            </div>
          )}
        </div>

        {/* Watch Trailer Button with Luxury Hover State */}
        <button
          onClick={() => onWatchTrailer(movie)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#141414] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-[#070707] border border-[#222222] hover:border-[#C5A059] text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>مشاهدة الإعلان الرسمي</span>
        </button>

      </div>

    </div>
  );
}
