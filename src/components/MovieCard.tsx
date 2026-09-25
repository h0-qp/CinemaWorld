import { Star, Play, Clock, Clapperboard } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

export default function MovieCard({ movie, onWatchTrailer }: MovieCardProps) {
  return (
    <div className="film-card flex flex-col justify-between text-right group">
      
      {/* Poster with Classic Ratio Frame */}
      <div className="relative h-72 sm:h-80 overflow-hidden bg-[#0A0A0A] border-b border-[#222222]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

        {/* Rating Placard */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/85 border border-[#333] text-[#E2C378] font-mono text-[11px] flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          <span>{movie.rating}</span>
        </div>

        {/* Year */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/85 border border-[#333] text-[#A1A19A] font-mono text-[11px]">
          {movie.year}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Genres in English */}
          <div className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider mb-1 truncate">
            {movie.genre.join(' · ')}
          </div>

          {/* Title in English */}
          <h3 className="text-lg font-bold font-cinzel text-[#F5F5F3] mb-1.5 leading-snug group-hover:text-[#C5A059] transition-colors truncate">
            {movie.title}
          </h3>

          {/* Synopsis in Arabic */}
          <p className="text-xs text-[#9E9E96] line-clamp-2 leading-relaxed font-serif">
            {movie.synopsis}
          </p>
        </div>

        {/* Director & Duration Strip */}
        <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-[#777770]">
          <div className="flex items-center gap-1 text-[#999]">
            <Clock className="w-3 h-3 text-[#C5A059]" />
            <span>{movie.duration}</span>
          </div>
          {movie.director && (
            <div className="flex items-center gap-1 truncate max-w-[130px]">
              <Clapperboard className="w-3 h-3 text-[#C5A059]" />
              <span className="truncate">{movie.director}</span>
            </div>
          )}
        </div>

        {/* Watch Trailer Button */}
        <button
          onClick={() => onWatchTrailer(movie)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#181818] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-[#0B0B0B] border border-[#262626] hover:border-[#C5A059] text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>عرض الإعلان الرسمي</span>
        </button>

      </div>

    </div>
  );
}
