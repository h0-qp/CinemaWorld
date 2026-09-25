import { useEffect } from 'react';
import { X, Star, Clock, Clapperboard, Users, Send } from 'lucide-react';
import { Movie } from '../types';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#111111] border border-[#2D2D2D] shadow-2xl max-h-[92vh] flex flex-col text-right"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#222222] bg-[#0B0B0B]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 border border-[#C5A059]/40 text-[#C5A059] font-mono text-[10px] uppercase">
              OFFICIAL TRAILER
            </span>
            <h2 className="text-base sm:text-xl font-bold font-cinzel text-[#F5F5F3] truncate max-w-md">
              {movie.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#2A2A2A] text-[#888] hover:text-white hover:border-[#C5A059] transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* YouTube Trailer Player */}
          <div className="relative w-full aspect-video bg-black border border-[#222222] shadow-xl">
            <iframe
              src={`${movie.trailerUrl}?autoplay=1`}
              title={movie.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-sm font-cinzel font-bold text-[#E2C378] mb-1.5">
                  قصة العمل (SYNOPSIS)
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-serif">
                  {movie.synopsis}
                </p>
              </div>

              {movie.spotlightReason && (
                <div className="p-3.5 bg-[#0C0C0C] border-r-2 border-[#C5A059] border-y border-l border-[#202020] text-xs text-[#B5B5AF]">
                  <span className="font-bold text-[#C5A059] block mb-1">تعليق هيئة التحرير:</span>
                  <p className="italic font-serif leading-relaxed">
                    "{movie.spotlightReason}"
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {movie.genre.map((g, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-[#171717] text-[#C5A059] font-mono text-[10px] uppercase border border-[#292929]">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Sidebar */}
            <div className="p-4 bg-[#0B0B0B] border border-[#202020] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
                <span className="text-[#777]">RATING</span>
                <div className="flex items-center gap-1 text-[#E2C378] font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{movie.rating} / 10</span>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
                <span className="text-[#777]">RELEASE</span>
                <span className="text-white font-bold">{movie.year}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
                <span className="text-[#777]">RUNTIME</span>
                <div className="flex items-center gap-1 text-white">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>{movie.duration}</span>
                </div>
              </div>

              {movie.director && (
                <div className="pb-2 border-b border-[#1A1A1A]">
                  <span className="block text-[#777] text-[10px] mb-0.5">DIRECTOR</span>
                  <div className="flex items-center gap-1.5 text-white font-serif">
                    <Clapperboard className="w-3 h-3 text-[#C5A059]" />
                    <span>{movie.director}</span>
                  </div>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div className="pb-3 border-b border-[#1A1A1A]">
                  <span className="block text-[#777] text-[10px] mb-0.5">STARRING</span>
                  <div className="flex items-start gap-1.5 text-[#AAA] text-[11px] font-serif">
                    <Users className="w-3 h-3 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>{movie.cast.join(', ')}</span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href="https://t.me/cn_world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#171717] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-black border border-[#2D2D2D] hover:border-[#C5A059] text-[11px] font-mono tracking-wider transition-colors"
                >
                  <Send className="w-3 h-3 text-[#229ED9]" />
                  <span>مناقشة العمل في تيليغرام</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
