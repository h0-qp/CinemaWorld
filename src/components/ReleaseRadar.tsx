import { useState, useEffect } from 'react';
import { Calendar, Play, Clock, Share2 } from 'lucide-react';
import { Movie } from '../types';
import { shareContent } from '../utils/shareUtils';

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
    <section id="radar" className="relative py-20 bg-[#0B0E14] border-b border-[#1E2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#1E2433]">
          <div className="text-right">
            <span className="text-xs font-semibold text-[#E50914] uppercase tracking-wider block mb-1">
              جدول العروض المنتظرة
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              رادار الإصدارات والتقويم السينمائي
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              مواعيد طرح أحدث الأفلام في صالات السينما مع عد تنازلي مباشر للإطلاق.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#94A3B8] px-3 py-1.5 rounded-md bg-[#131722] border border-[#202738] w-fit">
            <Calendar className="w-4 h-4 text-[#E50914]" />
            <span>موسم سينما 2026 / 2027</span>
          </div>
        </div>

        {/* Theatrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="flex flex-col justify-between text-right rounded-xl overflow-hidden bg-[#121622] border border-[#1E2536] hover:border-[#2E394E] transition-all duration-300 shadow-md">
      
      {/* Header Backdrop */}
      <div className="relative h-56 overflow-hidden bg-[#0A0D14]">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/60" />

        {/* Release Date Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
          {movie.releaseDate || 'قريباً في الصالات'}
        </div>

        {/* Genre Tags */}
        <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5">
          {movie.genre.map((g, idx) => (
            <span key={idx} className="text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-xs text-[#94A3B8] font-medium block mb-1">
            إخراج: {movie.director || 'غير معلن'}
          </span>
          <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
            {movie.title}
          </h3>
          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
            {movie.synopsis}
          </p>
        </div>

        {/* Clean Countdown Board */}
        <div className="rounded-lg bg-[#0E121A] border border-[#1A202E] p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-2 text-xs font-medium text-[#94A3B8]">
            <Clock className="w-3.5 h-3.5 text-[#E50914]" />
            <span>العد التنازلي لموعد العرض</span>
          </div>

          {timeLeft.isExpired ? (
            <div className="py-2 text-[#22C55E] text-xs font-semibold">
              الفيلم متوفر الآن في دور العرض
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="py-1.5 bg-[#141824] rounded border border-[#202738]">
                <span className="block text-base font-bold text-white">{timeLeft.days}</span>
                <span className="text-[10px] text-[#64748B]">يوم</span>
              </div>
              <div className="py-1.5 bg-[#141824] rounded border border-[#202738]">
                <span className="block text-base font-bold text-white">{timeLeft.hours}</span>
                <span className="text-[10px] text-[#64748B]">ساعة</span>
              </div>
              <div className="py-1.5 bg-[#141824] rounded border border-[#202738]">
                <span className="block text-base font-bold text-white">{timeLeft.minutes}</span>
                <span className="text-[10px] text-[#64748B]">دقيقة</span>
              </div>
              <div className="py-1.5 bg-[#141824] rounded border border-[#202738]">
                <span className="block text-base font-bold text-[#E50914]">{timeLeft.seconds}</span>
                <span className="text-[10px] text-[#64748B]">ثانية</span>
              </div>
            </div>
          )}
        </div>

        {/* Trailer & Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onWatchTrailer(movie)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#181F2E] hover:bg-[#E50914] text-white text-xs font-semibold transition-colors duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>مشاهدة التريلر</span>
          </button>

          <button
            onClick={() => shareContent({
              title: movie.title,
              text: movie.synopsis,
              type: 'movie',
              id: movie.id
            })}
            className="p-2.5 rounded-lg bg-[#181F2E] hover:bg-[#1E2536] text-[#CBD5E1] hover:text-white border border-[#202738] transition-colors"
            title="مشاركة موعد ورابط الفيلم"
            aria-label="مشاركة الفيلم"
          >
            <Share2 className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>

      </div>

    </div>
  );
}
