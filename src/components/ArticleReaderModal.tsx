import { useState, useEffect, useRef } from 'react';
import { 
  X, 
  BookOpen, 
  Type, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  Clock, 
  Share2, 
  Check, 
  Maximize2, 
  Minimize2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { NewsItem } from '../types';

interface ArticleReaderModalProps {
  article: NewsItem | null;
  initialReadingMode?: boolean;
  onClose: () => void;
}

type ReadingTheme = 'sepia' | 'charcoal' | 'oled';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type FontFamily = 'amiri' | 'cairo';

export default function ArticleReaderModal({ 
  article, 
  initialReadingMode = false, 
  onClose 
}: ArticleReaderModalProps) {
  // Reading Mode State
  const [isReadingMode, setIsReadingMode] = useState(initialReadingMode);
  const [theme, setTheme] = useState<ReadingTheme>('sepia');
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [fontFamily, setFontFamily] = useState<FontFamily>('amiri');
  const [showImage, setShowImage] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Sync initialReadingMode when article changes
  useEffect(() => {
    setIsReadingMode(initialReadingMode);
  }, [initialReadingMode, article]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Track scroll progress for reading indicator
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const currentProgress = Math.round((target.scrollTop / totalHeight) * 100);
      setScrollProgress(currentProgress);
    }
  };

  if (!article) return null;

  // Calculate estimated reading time & word count
  const allText = `${article.title} ${article.summary} ${article.content || ''}`;
  const wordCount = allText.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Font size classes
  const fontSizes: Record<FontSize, { body: string; title: string; summary: string }> = {
    sm: { body: 'text-base leading-[2.1]', title: 'text-2xl', summary: 'text-base leading-[2.0]' },
    md: { body: 'text-lg leading-[2.2]', title: 'text-3xl', summary: 'text-lg leading-[2.1]' },
    lg: { body: 'text-xl leading-[2.3]', title: 'text-3xl sm:text-4xl', summary: 'text-xl leading-[2.2]' },
    xl: { body: 'text-2xl leading-[2.4]', title: 'text-4xl sm:text-5xl', summary: 'text-2xl leading-[2.3]' }
  };

  // Color themes
  const themeStyles: Record<ReadingTheme, { bg: string; text: string; kicker: string; cardBg: string; border: string }> = {
    sepia: {
      bg: 'bg-[#181512]',
      text: 'text-[#F5EBD7]',
      kicker: 'text-[#D4AF37]',
      cardBg: 'bg-[#211C18]',
      border: 'border-[#332A22]'
    },
    charcoal: {
      bg: 'bg-[#121212]',
      text: 'text-[#DCDCD6]',
      kicker: 'text-[#C5A059]',
      cardBg: 'bg-[#1A1A1A]',
      border: 'border-[#262626]'
    },
    oled: {
      bg: 'bg-[#040404]',
      text: 'text-[#E5E5E0]',
      kicker: 'text-[#C5A059]',
      cardBg: 'bg-[#0D0D0D]',
      border: 'border-[#1C1C1C]'
    }
  };

  const currentTheme = themeStyles[theme];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title}\n\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleIncreaseFont = () => {
    if (fontSize === 'sm') setFontSize('md');
    else if (fontSize === 'md') setFontSize('lg');
    else if (fontSize === 'lg') setFontSize('xl');
  };

  const handleDecreaseFont = () => {
    if (fontSize === 'xl') setFontSize('lg');
    else if (fontSize === 'lg') setFontSize('md');
    else if (fontSize === 'md') setFontSize('sm');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Scroll Progress Bar at the Top */}
      {isReadingMode && (
        <div className="fixed top-0 inset-x-0 z-50 h-1 bg-[#1A1A1A]">
          <div 
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#E2C378] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Main Container */}
      <div 
        className={`relative w-full h-full sm:h-auto sm:max-h-[92vh] flex flex-col text-right transition-all duration-500 overflow-hidden shadow-2xl ${
          isReadingMode 
            ? `${currentTheme.bg} max-w-4xl border-0 sm:border ${currentTheme.border}` 
            : 'bg-[#0E0E0E] max-w-2xl border border-[#262626]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className={`flex flex-wrap items-center justify-between p-3.5 sm:p-4 border-b transition-colors ${
          isReadingMode ? `${currentTheme.cardBg} ${currentTheme.border}` : 'bg-[#080808] border-[#1C1C1C]'
        }`}>
          
          {/* Mode Switch & Reading Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReadingMode(!isReadingMode)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 border ${
                isReadingMode 
                  ? 'bg-[#C5A059] border-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                  : 'bg-[#141414] hover:bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C5A059] text-[#C5A059]'
              }`}
              title="التبديل إلى وضع القراءة المريح للعين"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isReadingMode ? 'وضع القراءة نشط' : 'تفعيل وضع القراءة'}</span>
            </button>

            {isReadingMode && (
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#888880]">
                <Clock className="w-3 h-3 text-[#C5A059]" />
                <span>{readingTimeMinutes} دقيقة قراءة ({wordCount} كلمة)</span>
              </div>
            )}
          </div>

          {/* Reading Mode Customizers Toolbar */}
          {isReadingMode ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Font Size Adjusters */}
              <div className="flex items-center border border-[#333] bg-black/40 px-1 py-0.5">
                <button
                  onClick={handleDecreaseFont}
                  disabled={fontSize === 'sm'}
                  className="p-1.5 text-[#AAA] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تصغير حجم الخط (A-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[11px] font-mono text-[#C5A059] font-bold">
                  {fontSize === 'sm' ? 'صغير' : fontSize === 'md' ? 'متوسط' : fontSize === 'lg' ? 'كبير' : 'أكبر'}
                </span>
                <button
                  onClick={handleIncreaseFont}
                  disabled={fontSize === 'xl'}
                  className="p-1.5 text-[#AAA] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تكبير حجم الخط (A+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Family Switcher */}
              <button
                onClick={() => setFontFamily(fontFamily === 'amiri' ? 'cairo' : 'amiri')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 border border-[#333] bg-black/40 text-xs font-serif text-[#CCC] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                title="تغيير نوع الخط"
              >
                <Type className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{fontFamily === 'amiri' ? 'خط أميري' : 'خط القاهرة'}</span>
              </button>

              {/* Themes Selector */}
              <div className="flex items-center gap-1 border border-[#333] bg-black/40 p-1">
                <button
                  onClick={() => setTheme('sepia')}
                  className={`w-5 h-5 rounded-sm bg-[#1E1914] border transition-transform ${
                    theme === 'sepia' ? 'border-[#D4AF37] scale-110 shadow-sm' : 'border-[#333]'
                  }`}
                  title="سمة ورق دافئ (سيپيا)"
                />
                <button
                  onClick={() => setTheme('charcoal')}
                  className={`w-5 h-5 rounded-sm bg-[#181818] border transition-transform ${
                    theme === 'charcoal' ? 'border-[#C5A059] scale-110 shadow-sm' : 'border-[#333]'
                  }`}
                  title="سمة فحمي هادئ"
                />
                <button
                  onClick={() => setTheme('oled')}
                  className={`w-5 h-5 rounded-sm bg-[#000000] border transition-transform ${
                    theme === 'oled' ? 'border-[#C5A059] scale-110 shadow-sm' : 'border-[#333]'
                  }`}
                  title="سمة سواد عميق (OLED)"
                />
              </div>

              {/* Cover Image Toggle */}
              {article.imageUrl && (
                <button
                  onClick={() => setShowImage(!showImage)}
                  className="p-1.5 border border-[#333] bg-black/40 text-[#AAA] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                  title={showImage ? 'إخفاء الصورة للتركيز على النص' : 'إظهار صورة الغلاف'}
                >
                  {showImage ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-[#888] hover:text-white hover:border-[#C5A059] border border-transparent transition-colors mr-1"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#C5A059]">
                {article.category} • {article.date}
              </span>
              <button
                onClick={onClose}
                className="p-1 text-[#888] hover:text-white transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

        {/* Scrollable Article Body */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto flex-1 p-5 sm:p-10 md:p-12 space-y-6"
        >
          {/* Article Measure Wrapper */}
          <div className={`mx-auto ${isReadingMode ? 'max-w-2xl' : 'max-w-xl'} space-y-6`}>
            
            {/* Reading Mode Header Header */}
            {isReadingMode ? (
              <div className="space-y-4 pb-6 border-b border-dashed border-[#333]/60">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={`px-2.5 py-1 ${currentTheme.cardBg} ${currentTheme.kicker} border ${currentTheme.border}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-[#888]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>المصدر: {article.source || 'Cinema World Archive'}</span>
                  </div>
                </div>

                <h1 className={`font-bold tracking-normal leading-[1.3] ${fontSizes[fontSize].title} ${
                  fontFamily === 'amiri' ? 'font-amiri font-bold' : 'font-sans'
                } ${currentTheme.text}`}>
                  {article.title}
                </h1>
              </div>
            ) : (
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-white leading-relaxed mb-3">
                  {article.title}
                </h1>
              </div>
            )}

            {/* Optional Cover Image */}
            {article.imageUrl && (!isReadingMode || showImage) && (
              <div className={`overflow-hidden border transition-all duration-500 ${
                isReadingMode 
                  ? `my-6 max-h-96 ${currentTheme.border} shadow-lg` 
                  : 'h-56 sm:h-72 border-[#202020] bg-black'
              }`}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
            )}

            {/* Lead Summary Paragraph */}
            <div className={`p-4 sm:p-5 transition-colors border-r-4 ${
              isReadingMode 
                ? `${currentTheme.cardBg} border-r-[#C5A059] border-y border-l ${currentTheme.border} ${currentTheme.text}` 
                : 'bg-[#0A0A0A] border-r-[#C5A059] border border-[#1C1C1C] text-xs text-[#CCC]'
            } italic leading-relaxed ${fontSizes[fontSize].summary} ${
              fontFamily === 'amiri' ? 'font-amiri' : 'font-serif'
            }`}>
              {article.summary}
            </div>

            {/* Main Editorial Prose */}
            {article.content && (
              <div className={`space-y-6 pt-2 ${fontSizes[fontSize].body} ${
                fontFamily === 'amiri' ? 'font-amiri' : 'font-sans'
              } ${isReadingMode ? currentTheme.text : 'text-[#B5B5AF] text-sm'}`}>
                {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-justify leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Reading Mode Bottom Actions */}
            <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
              isReadingMode ? `${currentTheme.border} text-[#888]` : 'border-[#1C1C1C] text-[#777]'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>تم النشر والتوثيق عبر مجلة سينما وورلد الأرشيفية</span>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border transition-colors ${
                    isSaved 
                      ? 'bg-[#C5A059] border-[#C5A059] text-black font-bold' 
                      : 'border-[#333] hover:border-[#C5A059] text-zinc-300'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'تم الحفظ' : 'حفظ المقال'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#333] hover:border-[#C5A059] text-zinc-300 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم نسخ الرابط' : 'مشاركة'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Reading Mode Exit Footbar */}
        {isReadingMode && (
          <div className={`p-2.5 border-t text-center text-xs font-mono ${currentTheme.cardBg} ${currentTheme.border} text-[#888]`}>
            <span>أنت في وضع القراءة المريح للعين · انقر مفتاح </span>
            <kbd className="px-1.5 py-0.5 bg-black/60 border border-[#444] text-[#C5A059] rounded text-[10px]">Esc</kbd>
            <span> أو زر الإغلاق للعودة إلى الواجهة</span>
          </div>
        )}

      </div>
    </div>
  );
}
