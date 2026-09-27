import { useEffect } from 'react';
import { X, Star, Clock, Clapperboard, Users, Send, Bookmark } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { isBookmarked, toggleWatchlist } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const bookmarked = isBookmarked(movie.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#10141E] border border-[#1E2536] rounded-2xl shadow-2xl max-h-[92vh] flex flex-col text-right overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1E2536] bg-[#0C1018]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#E50914] text-white text-xs font-semibold">
              تريلر رسمي
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-md">
              {movie.title} ({movie.year})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWatchlist(movie)}
              className={`p-2 rounded-lg border transition-colors ${
                bookmarked
                  ? 'bg-[#E50914] border-[#E50914] text-white'
                  : 'bg-[#151A26] border-[#222B3D] text-[#94A3B8] hover:text-white'
              }`}
              title={bookmarked ? 'إزالة من قائمتي' : 'حفظ في قائمتي'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[#222B3D] bg-[#151A26] text-[#94A3B8] hover:text-white transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* YouTube Trailer Player Container */}
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-[#1E2536] shadow-xl">
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
                <h3 className="text-sm font-bold text-white mb-2">
                  قصة العمل
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {movie.spotlightReason && (
                <div className="p-4 rounded-xl bg-[#141824] border border-[#1E2536] text-xs text-[#CBD5E1]">
                  <span className="font-bold text-white block mb-1">رأي نقاد سينما وورلد:</span>
                  <p className="italic leading-relaxed">
                    "{movie.spotlightReason}"
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {movie.genre.map((g, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-[#181F2E] text-slate-300 text-xs font-medium border border-[#222B3D]">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Sidebar */}
            <div className="p-4 rounded-xl bg-[#141824] border border-[#1E2536] space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#1E2536]">
                <span className="text-[#64748B]">تقييم الجمهور</span>
                <div className="flex items-center gap-1 text-white font-bold">
                  <Star className="w-3.5 h-3.5 fill-current text-[#F59E0B]" />
                  <span>{movie.rating} / 10</span>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-[#1E2536]">
                <span className="text-[#64748B]">سنة العرض</span>
                <span className="text-white font-medium">{movie.year}</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-[#1E2536]">
                <span className="text-[#64748B]">المدة الزمنية</span>
                <div className="flex items-center gap-1 text-white font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{movie.duration}</span>
                </div>
              </div>

              {movie.director && (
                <div className="pb-2.5 border-b border-[#1E2536]">
                  <span className="block text-[#64748B] text-[11px] mb-0.5">المخرج</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Clapperboard className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>{movie.director}</span>
                  </div>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div className="pb-3 border-b border-[#1E2536]">
                  <span className="block text-[#64748B] text-[11px] mb-0.5">طاقم البطولة</span>
                  <div className="flex items-start gap-1.5 text-[#CBD5E1]">
                    <Users className="w-3.5 h-3.5 text-[#64748B] mt-0.5 shrink-0" />
                    <span>{movie.cast.join(', ')}</span>
                  </div>
                </div>
              )}

              <div className="pt-1">
                <a
                  href="https://t.me/cn_world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>مناقشة العمل في التليغرام</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
