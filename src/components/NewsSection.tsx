import { useState } from 'react';
import { Newspaper, ChevronLeft, Flame, Sparkles, BookOpen } from 'lucide-react';
import { NewsItem } from '../types';
import ArticleReaderModal from './ArticleReaderModal';

interface NewsSectionProps {
  news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [openInReadingMode, setOpenInReadingMode] = useState<boolean>(false);

  if (!news || news.length === 0) return null;

  const handleOpenStandard = (item: NewsItem) => {
    setSelectedArticle(item);
    setOpenInReadingMode(false);
  };

  const handleOpenReadingMode = (e: React.MouseEvent, item: NewsItem) => {
    e.stopPropagation();
    setSelectedArticle(item);
    setOpenInReadingMode(true);
  };

  return (
    <section id="news" className="relative py-24 bg-[#0A0A0A] border-b border-[#181818] overflow-hidden">
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 cinema-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#181818]">
          <div className="text-right">
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
              <span>THE GAZETTE · OFFICIAL EDITORIAL DISPATCHES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-[#F8F8F6] tracking-wide cinema-glow">
              النشرة الإخبارية والتقارير الحصرية
            </h2>
            <p className="text-xs sm:text-sm text-[#94948C] mt-1 font-serif">
              آخر مستجدات الإنتاج في هوليوود، صفقات المخرجين الكبار، وتغطيات المهرجانات السينمائية مع دعم كامل لوضع القراءة المريح.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888880] border border-[#222222] px-4 py-2 bg-[#0E0E0E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>DAILY TELEGRAPH EDITION · LIVE</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {news.map((item) => (
            <article 
              key={item.id}
              className="film-card flex flex-col justify-between p-6 bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#C5A059] transition-all duration-300 text-right group cursor-pointer"
              onClick={() => handleOpenStandard(item)}
            >
              <div className="space-y-3.5">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] font-mono pb-2.5 border-b border-[#181818]">
                  <span className="text-[#C5A059] font-bold">{item.category}</span>
                  <div className="flex items-center gap-2 text-[#777]">
                    {item.isHot && (
                      <span className="flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 border border-rose-900/60 text-[10px]">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>عاجل</span>
                      </span>
                    )}
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* News Image Preview if Available */}
                {item.imageUrl && (
                  <div className="h-44 overflow-hidden border border-[#1A1A1A] bg-black relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                {/* Title in Classical Serif */}
                <h3 className="font-serif font-bold text-lg text-[#F5F5F3] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#9E9E96] font-serif leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Read Actions Footer */}
              <div className="pt-4 mt-5 border-t border-[#181818] flex items-center justify-between gap-2">
                {/* Quick Reading Mode Trigger */}
                <button
                  onClick={(e) => handleOpenReadingMode(e, item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border border-[#262626] hover:border-[#C5A059] text-[11px] font-mono transition-all duration-300"
                  title="فتح المقال في وضع القراءة المريح للعين"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>وضع القراءة</span>
                </button>

                <div className="flex items-center gap-1 text-xs font-mono text-[#888880] group-hover:text-[#E2C378] transition-colors">
                  <span>قراءة التقرير</span>
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal (Standard and Eye-Rest Reading Mode) */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          initialReadingMode={openInReadingMode}
          onClose={() => setSelectedArticle(null)}
        />
      )}

    </section>
  );
}
