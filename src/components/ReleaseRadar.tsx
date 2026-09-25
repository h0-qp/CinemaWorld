import { useState, useEffect } from 'react';
import { Calendar, Play, Star, Clock, Ticket } from 'lucide-react';
import { Movie } from '../types';

interface ReleaseRadarProps {
  upcomingMovies: Movie[];
  onWatchTrailer: (movie: Movie) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function ReleaseRadar({ upcomingMovies, onWatchTrailer }: ReleaseRadarProps) {
  const sortedUpcoming = [...upcomingMovies].sort((a, b) => {
    const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
    const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
    return dateA - dateB;
  });

  return (
    <section id="radar" className="relative py-24 bg-[#0A0A0A] border-b border-[#181818] overflow-hidden">
      {/* Subtle Grain Background */}
      <div className="absolute inset-0 cinema-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-[#181818]">
          <div className="text-right">
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
              <span>THEATRICAL ROADMAP & COUNTDOWN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-[#F8F8F6] tracking-wide cinema-glow">
              رادار الإصدارات والتقويم السينمائي
            </h2>
            <p className="text-xs sm:text-sm text-[#94948C] mt-1 font-serif">
              جدول الترقب الرسمي والعد التنازلي الحي لأضخم العروض السينمائية القادمة لدور العرض العالمية وIMAX.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono text-[#A1A19A] border border-[#222222] px-4 py-2 bg-[#0E0E0E] shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>CALENDAR SEASON · 2026/2027</span>
          </div>
        </div>

        {/* Theatrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedUpcoming.map((movie) => (
            <TheatricalCountdownCard key={movie.id} movie={movie} onWatchTrailer={onWatchTrailer} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface TheatricalCardProps {
  movie: Movie;
  onWatchTrailer: (movie: Movie) => void;
}

function TheatricalCountdownCard({ movie, onWatchTrailer }: TheatricalCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTime = () => {
      if (!movie.releaseDate) return;
      const targetTime = new Date(movie.releaseDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [movie.releaseDate]);

  return (
    <div className="film-card flex flex-col justify-between text-right bg-[#0C0C0C] group">
      
      {/* Visual Header with Cinematic Ratio Frame */}
      <div className="relative h-64 overflow-hidden border-b border-[#1A1A1A] bg-black">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover filter contrast-[1.12] brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/70" />
        
        {/* Rating Score Placard */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-[#2B2B2B] text-[#E2C378] font-mono text-xs flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-current text-[#C5A059]" />
          <span>{movie.rating} EXP</span>
        </div>

        {/* Premiere Status Kicker */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E2C378] font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
          UPCOMING PREMIERE
        </div>

        {/* Genre Tags */}
        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5">
          {movie.genre.map((g, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-[#242424] text-[#D4AF37] font-mono text-[10px] uppercase">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[10px] font-mono text-[#888880] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Ticket className="w-3 h-3 text-[#C5A059]" />
            <span>DIRECTED BY {movie.director?.toUpperCase() || 'STUDIO MASTER'}</span>
          </div>
          <h3 className="text-xl font-bold font-cinzel text-[#F8F8F6] mb-2 leading-snug group-hover:text-[#C5A059] transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-[#9E9E96] line-clamp-2 leading-relaxed font-serif">
            {movie.synopsis}
          </p>
        </div>

        {/* Marquee Countdown Board with Retro Analog Style */}
        <div className="border border-[#1E1E1E] bg-[#070707] p-3.5 text-center shadow-inner">
          <div className="flex items-center justify-center gap-1.5 mb-2.5 text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
            <span>LIVE THEATRICAL COUNTDOWN</span>
          </div>

          {timeLeft.isExpired ? (
            <div className="py-2.5 text-[#C5A059] font-mono text-xs font-bold border border-[#C5A059]/40 bg-[#121212]">
              NOW SHOWING IN WORLD THEATERS
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="py-2 bg-[#101010] border border-[#1A1A1A] group-hover:border-[#2A2A2A] transition-colors">
                <span className="block text-lg font-bold text-[#E2C378] tracking-tight">{timeLeft.days}</span>
                <span className="text-[8px] text-[#777] uppercase tracking-widest">DAYS</span>
              </div>
              <div className="py-2 bg-[#101010] border border-[#1A1A1A] group-hover:border-[#2A2A2A] transition-colors">
                <span className="block text-lg font-bold text-[#F3F4F6] tracking-tight">{timeLeft.hours}</span>
                <span className="text-[8px] text-[#777] uppercase tracking-widest">HOURS</span>
              </div>
              <div className="py-2 bg-[#101010] border border-[#1A1A1A] group-hover:border-[#2A2A2A] transition-colors">
                <span className="block text-lg font-bold text-[#F3F4F6] tracking-tight">{timeLeft.minutes}</span>
                <span className="text-[8px] text-[#777] uppercase tracking-widest">MIN</span>
              </div>
              <div className="py-2 bg-[#101010] border border-[#1A1A1A] group-hover:border-[#2A2A2A] transition-colors">
                <span className="block text-lg font-bold text-[#C5A059] tracking-tight">{timeLeft.seconds}</span>
                <span className="text-[8px] text-[#777] uppercase tracking-widest">SEC</span>
              </div>
            </div>
          )}
        </div>

        {/* Watch Trailer Action */}
        <button
          onClick={() => onWatchTrailer(movie)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#141414] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-[#070707] border border-[#222222] hover:border-[#C5A059] text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>مشاهدة الإعلان الترويجي</span>
        </button>

      </div>

    </div>
  );
}
