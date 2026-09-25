import { useState, useEffect } from 'react';
import { Calendar, Play, Star, Clock } from 'lucide-react';
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
    <section id="radar" className="py-20 bg-[#0E0E0E] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#1E1E1E]">
          <div className="text-right">
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.2em] mb-2">
              <span className="w-2 h-2 bg-[#C5A059]" />
              <span>THEATRICAL RELEASE CALENDAR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-cinzel text-[#F5F5F3]">
              رادار الإصدارات والتقويم السينمائي
            </h2>
            <p className="text-xs sm:text-sm text-[#999990] mt-1 font-serif">
              جدول الترقب الرسمي لأضخم العروض السينمائية القادمة لدور العرض العالمية.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#888880] border border-[#222222] px-3.5 py-2 bg-[#121212]">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>SEASON SCHEDULE · 2026</span>
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
    <div className="film-card flex flex-col justify-between text-right">
      
      {/* Visual Header */}
      <div className="relative h-60 overflow-hidden border-b border-[#222222]">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover filter contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/60" />
        
        {/* Rating Score */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/85 border border-[#333] text-[#E2C378] font-mono text-xs flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          <span>{movie.rating} EXP</span>
        </div>

        {/* Genre Tags in English */}
        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5">
          {movie.genre.map((g, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-black/80 border border-[#2B2B2B] text-[#D4AF37] font-mono text-[10px] uppercase">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-mono text-[#888880] mb-1">
            DIRECTED BY {movie.director?.toUpperCase()}
          </div>
          <h3 className="text-xl font-bold font-cinzel text-[#F5F5F3] mb-2 leading-snug">
            {movie.title}
          </h3>
          <p className="text-xs text-[#A8A8A2] line-clamp-2 leading-relaxed font-serif">
            {movie.synopsis}
          </p>
        </div>

        {/* Marquee Countdown Board */}
        <div className="border border-[#222222] bg-[#0A0A0A] p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">
            <Clock className="w-3 h-3" />
            <span>ESTIMATED THEATRICAL COUNTDOWN</span>
          </div>

          {timeLeft.isExpired ? (
            <div className="py-2 text-[#C5A059] font-mono text-xs font-bold border border-[#C5A059]/40 bg-[#161616]">
              RELEASED IN THEATERS
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="py-1.5 bg-[#141414] border border-[#202020]">
                <span className="block text-base font-bold text-[#E2C378]">{timeLeft.days}</span>
                <span className="text-[9px] text-[#666]">DAYS</span>
              </div>
              <div className="py-1.5 bg-[#141414] border border-[#202020]">
                <span className="block text-base font-bold text-[#F3F4F6]">{timeLeft.hours}</span>
                <span className="text-[9px] text-[#666]">HOURS</span>
              </div>
              <div className="py-1.5 bg-[#141414] border border-[#202020]">
                <span className="block text-base font-bold text-[#F3F4F6]">{timeLeft.minutes}</span>
                <span className="text-[9px] text-[#666]">MIN</span>
              </div>
              <div className="py-1.5 bg-[#141414] border border-[#202020]">
                <span className="block text-base font-bold text-[#C5A059]">{timeLeft.seconds}</span>
                <span className="text-[9px] text-[#666]">SEC</span>
              </div>
            </div>
          )}
        </div>

        {/* Watch Trailer Action */}
        <button
          onClick={() => onWatchTrailer(movie)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#181818] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-[#0B0B0B] border border-[#282828] text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>مشاهدة الإعلان الترويجي</span>
        </button>

      </div>

    </div>
  );
}
