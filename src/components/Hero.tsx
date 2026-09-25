import { Send, Star, Play, Clapperboard } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  featuredMovie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

export default function Hero({ featuredMovie, onWatchTrailer }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center bg-[#0B0B0B] border-b border-[#222222] overflow-hidden">
      {/* Background Cinematic Texture with Subdued Ambient Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredMovie.backdropUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125 brightness-75 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Editorial Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Editorial Category Header */}
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#C5A059]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-cinzel font-semibold">
                FEATURED CRITIC PICK OF THE WEEK
              </span>
            </div>

            {/* Title in Classical Roman Capital Typeface */}
            <h1 className="text-4xl sm:text-6xl font-bold font-cinzel tracking-wide text-[#F5F5F3] leading-[1.15]">
              {featuredMovie.title}
            </h1>

            {/* Film Meta Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#A1A19A] border-y border-[#1E1E1E] py-3">
              <div className="flex items-center gap-1.5 text-[#E2C378]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{featuredMovie.rating} / 10 IMDb</span>
              </div>
              <span className="text-[#333]">|</span>
              <span>{featuredMovie.year}</span>
              <span className="text-[#333]">|</span>
              <span>{featuredMovie.duration}</span>
              <span className="text-[#333]">|</span>
              <span className="text-[#C5A059]">
                {featuredMovie.genre.join(' · ')}
              </span>
            </div>

            {/* Synopsis in Eloquent Arabic */}
            <p className="text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-cormorant font-normal max-w-2xl">
              {featuredMovie.synopsis}
            </p>

            {/* Critic's Dispatch Box */}
            {featuredMovie.spotlightReason && (
              <div className="p-4 bg-[#111111] border-r-2 border-[#C5A059] border-y border-l border-[#1E1E1E] text-sm text-[#BDBDB8]">
                <div className="text-[#C5A059] text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Clapperboard className="w-3.5 h-3.5" />
                  <span>ملاحظة الناقد السينمائي</span>
                </div>
                <p className="italic font-serif leading-relaxed text-[#D6D6D2]">
                  "{featuredMovie.spotlightReason}"
                </p>
                {featuredMovie.director && (
                  <div className="mt-2 text-xs text-[#888880] font-mono">
                    Director: {featuredMovie.director}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onWatchTrailer(featuredMovie)}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B0B0B] font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>مشاهدة الإعلان الرسمي</span>
              </button>

              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#C5A059]/60 text-[#E8E8E6] font-semibold text-xs tracking-wider transition-colors"
              >
                <Send className="w-4 h-4 text-[#229ED9]" />
                <span>متابعة النقاش في قناة تيليغرام</span>
              </a>
            </div>

          </div>

          {/* Right Poster Column: Framing like an authentic classic film archive placard */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-2.5 border border-[#222222] bg-[#0E0E0E] shadow-2xl">
              {/* Inner Film Frame */}
              <div className="relative w-64 sm:w-80 h-[400px] sm:h-[480px] overflow-hidden border border-[#1A1A1A]">
                <img
                  src={featuredMovie.posterUrl}
                  alt={featuredMovie.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 left-3 text-right">
                  <span className="block text-[11px] font-mono text-[#C5A059] uppercase tracking-wider">
                    DIRECTED BY {featuredMovie.director}
                  </span>
                  <span className="block text-sm font-cinzel text-white font-bold truncate">
                    {featuredMovie.title}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Traditional Gazette Ledger / Footnote Stats */}
        <div className="mt-16 pt-8 border-t border-[#1C1C1C] grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          <div className="border-r border-[#222222] pr-4">
            <span className="block font-cinzel text-2xl font-bold text-[#E2C378]">+150K</span>
            <span className="text-xs text-[#888880]">عضو ومتابع في النادي السينمائي</span>
          </div>
          <div className="border-r border-[#222222] pr-4">
            <span className="block font-cinzel text-2xl font-bold text-[#F3F4F6]">+1,200</span>
            <span className="text-xs text-[#888880]">مقال ومراجعة سينمائية موثقة</span>
          </div>
          <div className="border-r border-[#222222] pr-4">
            <span className="block font-cinzel text-2xl font-bold text-[#C5A059]">24 / 7</span>
            <span className="text-xs text-[#888880]">تغطية متواصلة للمهرجانات والإصدارات</span>
          </div>
          <div className="pr-4">
            <span className="block font-cinzel text-2xl font-bold text-[#A1A19A]">4K MASTER</span>
            <span className="text-xs text-[#888880]">أعلى معايير الدقة للعروض الرسمية</span>
          </div>
        </div>

      </div>
    </section>
  );
}
