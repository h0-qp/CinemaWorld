import { useState } from 'react';
import { Newspaper, ChevronLeft, Flame, BookOpen } from 'lucide-react';
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
    <section id="news" className="relative py-20 bg-[#0B0E14] border-b border-[#1E2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#1E2433]">
          <div className="text-right">
            <span className="text-xs font-semibold text-[#E50914] uppercase tracking-wider block mb-1">
              تغطيات ومقالات سينمائية
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              أخبار السينما والتقارير الحصرية
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              آخر مستجدات الإنتاج في هوليوود، صفقات المخرجين الكبار، وتغطيات المهرجانات مع وضع القراءة المريح.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#94A3B8] px-3 py-1.5 rounded-md bg-[#131722] border border-[#202738] w-fit">
            <Newspaper className="w-4 h-4 text-[#E50914]" />
            <span>نشرة سينما وورلد الأسبوعية</span>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article 
              key={item.id}
              className="flex flex-col justify-between rounded-xl overflow-hidden bg-[#121622] border border-[#1E2536] hover:border-[#2F3A50] transition-all duration-300 text-right group cursor-pointer shadow-md"
              onClick={() => handleOpenStandard(item)}
            >
              <div className="space-y-3.5">
                {/* News Image Preview if Available */}
                {item.imageUrl && (
                  <div className="h-48 overflow-hidden bg-[#0A0D14] relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent opacity-80" />
                    
                    {/* Category & Date badge on image */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                        {item.category}
                      </span>
                      {item.isHot && (
                        <span className="flex items-center gap-1 text-rose-300 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800 text-[10px]">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>عاجل</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-5 pt-1 space-y-2">
                  <div className="text-[11px] text-[#64748B]">
                    {item.date} · {item.source || 'سينما وورلد'}
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-[#E50914] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read Actions Footer */}
              <div className="p-5 pt-0 mt-2 flex items-center justify-between gap-2 border-t border-[#1C2232] pt-4">
                <button
                  onClick={(e) => handleOpenReadingMode(e, item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181F2E] hover:bg-[#E50914] text-[#CBD5E1] hover:text-white text-xs font-medium transition-colors"
                  title="فتح المقال في وضع القراءة المريح للعين"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>وضع القراءة</span>
                </button>

                <div className="flex items-center gap-1 text-xs text-[#64748B] group-hover:text-white transition-colors">
                  <span>قراءة التقرير</span>
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
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
