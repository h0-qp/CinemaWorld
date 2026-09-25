import { Send, Star, Play, Clapperboard, Bookmark, Volume2 } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  featuredMovie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

export default function Hero({ featuredMovie, onWatchTrailer }: HeroProps) {
  const { isBookmarked, toggleWatchlist } = useAuth();
  const bookmarked = isBookmarked(featuredMovie.id);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center bg-[#070707] border-b border-[#181818] overflow-hidden">
      
      {/* Background Cinematic Texture with Golden Vignette & Film Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={featuredMovie.backdropUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover object-center opacity-30 filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Layered Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/85 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.08),transparent_65%)]" />
        <div className="absolute inset-0 cinema-grain opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Editorial Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Editorial Category Header with Authentic Gazette Serif Kicker */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-cinzel font-bold">
                WEEKLY ARCHIVE SPOTLIGHT · 70MM IMAX PRESENTATION
              </span>
            </div>

            {/* Title in Classical Monumental Roman Capital Typeface */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-cinzel tracking-wider text-[#F8F8F6] leading-[1.08] cinema-glow">
              {featuredMovie.title}
            </h1>

            {/* Film Meta Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#999990] border-y border-[#181818] py-3.5 bg-[#0A0A0A]/40 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[#E2C378] font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{featuredMovie.rating} / 10 IMDb</span>
              </div>
              <span className="text-[#2B2B2B]">|</span>
              <span className="text-zinc-200">{featuredMovie.year}</span>
              <span className="text-[#2B2B2B]">|</span>
              <span>{featuredMovie.duration}</span>
              <span className="text-[#2B2B2B]">|</span>
              <span className="text-[#C5A059] tracking-wider">
                {featuredMovie.genre.join(' · ')}
              </span>
              <span className="text-[#2B2B2B]">|</span>
              <span className="flex items-center gap-1 text-[#888]">
                <Volume2 className="w-3 h-3 text-[#C5A059]" />
                DOLBY ATMOS
              </span>
            </div>

            {/* Synopsis in Eloquent Arabic Classical Prose */}
            <p className="text-base sm:text-xl text-[#D8D8D2] leading-relaxed font-cormorant font-normal max-w-2xl">
              {featuredMovie.synopsis}
            </p>

            {/* Critic's Dispatch Box with Classic Golden Frame */}
            {featuredMovie.spotlightReason && (
              <div className="relative p-5 bg-[#0C0C0C] border border-[#1E1E1E] border-r-4 border-r-[#C5A059] text-sm text-[#BFBFB8] shadow-xl">
                <div className="text-[#C5A059] text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-2 font-cinzel">
                  <Clapperboard className="w-4 h-4 text-[#C5A059]" />
                  <span>قراءة نقدية حصرية (CRITIC'S DISPATCH)</span>
                </div>
                <p className="italic font-serif leading-relaxed text-[#ECECE8] text-sm sm:text-base">
                  "{featuredMovie.spotlightReason}"
                </p>
                {featuredMovie.director && (
                  <div className="mt-3 pt-2.5 border-t border-[#181818] flex items-center justify-between text-xs text-[#888880] font-mono">
                    <span>DIRECTED BY: <span className="text-white font-serif">{featuredMovie.director}</span></span>
                    <span className="text-[#C5A059]">OFFICIAL VERDICT</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons with High-End Styling */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => onWatchTrailer(featuredMovie)}
                className="group relative flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E2C378] text-[#070707] font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.25)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]"
              >
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                <span>مشاهدة الإعلان الرسمي 4K</span>
              </button>

              <button
                onClick={() => toggleWatchlist(featuredMovie)}
                className={`flex items-center gap-2 px-5 py-3.5 border text-xs font-mono tracking-wider transition-all duration-300 ${
                  bookmarked
                    ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#E2C378] shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                    : 'bg-[#101010] hover:bg-[#161616] border-[#222222] hover:border-[#C5A059] text-zinc-300'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-[#C5A059]' : 'text-[#888]'}`} />
                <span>{bookmarked ? 'محفوظ في قائمتك السينمائية' : 'إضافة إلى قائمتي'}</span>
              </button>

              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 bg-[#0F0F0F] hover:bg-[#141414] border border-[#202020] hover:border-[#C5A059]/60 text-[#E8E8E6] font-semibold text-xs tracking-wider transition-colors"
              >
                <Send className="w-4 h-4 text-[#229ED9]" />
                <span>مجتمع تيليغرام الرسمي</span>
              </a>
            </div>

          </div>

          {/* Right Poster Column: 35mm Physical Film Framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Outer Golden Halftone Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A059]/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* 35mm Sprocket Border Frame */}
              <div className="relative p-3 border border-[#202020] bg-[#0A0A0A] shadow-2xl transition-all duration-500 group-hover:border-[#C5A059]/60">
                
                {/* Vintage Top Plate */}
                <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#1A1A1A] font-mono text-[9px] text-[#777]">
                  <span>ARCHIVE CODE: 35MM-DW-002</span>
                  <span className="text-[#C5A059]">OFFICIAL PREVIEW</span>
                </div>

                {/* Inner Film Poster Container */}
                <div className="relative w-72 sm:w-84 h-[440px] sm:h-[500px] overflow-hidden border border-[#161616] bg-black">
                  <img
                    src={featuredMovie.posterUrl}
                    alt={featuredMovie.title}
                    className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                  {/* Play Button Overlay on Hover */}
                  <div 
                    onClick={() => onWatchTrailer(featuredMovie)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-[#C5A059] bg-black/70 flex items-center justify-center text-[#C5A059] transform group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current mr-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3 text-right">
                    <span className="block text-[10px] font-mono text-[#C5A059] uppercase tracking-wider">
                      DIRECTED BY {featuredMovie.director?.toUpperCase()}
                    </span>
                    <span className="block text-base font-cinzel text-white font-bold truncate">
                      {featuredMovie.title}
                    </span>
                  </div>
                </div>

                {/* Vintage Bottom Plate */}
                <div className="flex items-center justify-between px-2 pt-2 mt-2 border-t border-[#1A1A1A] font-mono text-[9px] text-[#555]">
                  <span>WARNER BROS. PICTURES / LEGENDARY</span>
                  <span>PRESTIGE ARCHIVE</span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Traditional Gazette Ledger / Footnote Stats */}
        <div className="mt-16 pt-8 border-t border-[#161616] grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          <div className="border-r border-[#1A1A1A] pr-4">
            <span className="block font-cinzel text-3xl font-extrabold text-[#E2C378] tracking-wider">+150K</span>
            <span className="text-xs text-[#7A7A72] font-serif">عضو ومتابع في النادي السينمائي</span>
          </div>
          <div className="border-r border-[#1A1A1A] pr-4">
            <span className="block font-cinzel text-3xl font-extrabold text-[#F3F4F6] tracking-wider">+1,200</span>
            <span className="text-xs text-[#7A7A72] font-serif">مقال ومراجعة سينمائية موثقة</span>
          </div>
          <div className="border-r border-[#1A1A1A] pr-4">
            <span className="block font-cinzel text-3xl font-extrabold text-[#C5A059] tracking-wider">24 / 7</span>
            <span className="text-xs text-[#7A7A72] font-serif">تغطية متواصلة للمهرجانات العالمية</span>
          </div>
          <div className="pr-4">
            <span className="block font-cinzel text-3xl font-extrabold text-[#A1A19A] tracking-wider">4K MASTER</span>
            <span className="text-xs text-[#7A7A72] font-serif">أعلى معايير الدقة للعروض الرسمية</span>
          </div>
        </div>

      </div>
    </section>
  );
}
