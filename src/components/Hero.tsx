import { Star, Play, Bookmark, Clock, Sparkles, Share2 } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';
import { shareContent } from '../utils/shareUtils';

interface HeroProps {
  featuredMovie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

export default function Hero({ featuredMovie, onWatchTrailer }: HeroProps) {
  const { isBookmarked, toggleWatchlist } = useAuth();
  const bookmarked = isBookmarked(featuredMovie.id);

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center bg-[#0B0E14] border-b border-[#1E2433] overflow-hidden">
      
      {/* Cinematic Backdrop with Smooth Lighting Scrims - High Clarity & Visibility */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
      >
        <img
          src={featuredMovie.backdropUrl || featuredMovie.posterUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover object-center opacity-65 sm:opacity-75 scale-100 transition-opacity duration-700"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Soft bottom scrim to blend into page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-[#0B0E14]/20" />
        {/* Right-to-left scrim for crisp text legibility while keeping center & left image bright */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0B0E14]/85 via-[#0B0E14]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Main Editorial Details */}
          <div className="lg:col-span-8 space-y-5 text-right">
            
            {/* Clean Section Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E50914] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
              <span>ترشيح الأسبوع الحصري</span>
              <span className="text-[#475569]">·</span>
              <span className="text-[#94A3B8] font-normal">{featuredMovie.director}</span>
            </div>

            {/* Movie Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              {featuredMovie.title}
            </h1>

            {/* Clean Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#94A3B8] pt-1">
              <div className="flex items-center gap-1.5 text-[#F59E0B] font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{featuredMovie.rating} / 10</span>
              </div>
              <span className="text-[#334155]">·</span>
              <span className="text-[#CBD5E1] font-medium">{featuredMovie.year}</span>
              <span className="text-[#334155]">·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                <span>{featuredMovie.duration}</span>
              </div>
              <span className="text-[#334155]">·</span>
              <span className="text-[#E2E8F0]">
                {featuredMovie.genre.join(' ، ')}
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-2xl font-normal">
              {featuredMovie.synopsis}
            </p>

            {/* Editorial Review Quote */}
            {featuredMovie.spotlightReason && (
              <div className="p-4 rounded-lg bg-[#131722] border border-[#202738] text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
                <span className="font-semibold text-white block mb-1">رأي النقاد في سينما وورلد:</span>
                "{featuredMovie.spotlightReason}"
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onWatchTrailer(featuredMovie)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>مشاهدة الإعلان الرسمي</span>
              </button>

              <button
                onClick={() => toggleWatchlist(featuredMovie)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  bookmarked
                    ? 'bg-[#1E2638] border-[#38BDF8] text-[#38BDF8]'
                    : 'bg-[#131722] hover:bg-[#1A2030] border-[#222B3D] text-[#CBD5E1] hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'في قائمتك المحفوظة' : 'حفظ في قائمتي'}</span>
              </button>

              <button
                onClick={() => shareContent({
                  title: featuredMovie.title,
                  text: featuredMovie.synopsis,
                  type: 'movie',
                  id: featuredMovie.id
                })}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[#222B3D] bg-[#131722] hover:bg-[#1A2030] text-[#CBD5E1] hover:text-white text-sm font-medium transition-colors"
                title="مشاركة رابط هذا العمل المميز"
                aria-label="مشاركة"
              >
                <Share2 className="w-4 h-4 text-[#E50914]" />
                <span className="hidden sm:inline">مشاركة</span>
              </button>
            </div>

          </div>

          {/* Featured Poster Showcase */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative group mx-auto max-w-[280px]">
              <div className="rounded-xl overflow-hidden border border-[#222B3D] bg-[#131722] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={featuredMovie.posterUrl}
                  alt={featuredMovie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
