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
  Bookmark
} from 'lucide-react';
import { NewsItem } from '../types';
import { shareContent } from '../utils/shareUtils';

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
  const [isReadingMode, setIsReadingMode] = useState(initialReadingMode);
  const [theme, setTheme] = useState<ReadingTheme>('charcoal');
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [fontFamily, setFontFamily] = useState<FontFamily>('amiri');
  const [showImage, setShowImage] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsReadingMode(initialReadingMode);
  }, [initialReadingMode, article]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      const currentProgress = Math.round((target.scrollTop / totalHeight) * 100);
      setScrollProgress(currentProgress);
    }
  };

  if (!article) return null;

  const allText = `${article.title} ${article.summary} ${article.content || ''}`;
  const wordCount = allText.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const fontSizes: Record<FontSize, { body: string; title: string; summary: string }> = {
    sm: { body: 'text-base leading-[2.1]', title: 'text-2xl', summary: 'text-base leading-[2.0]' },
    md: { body: 'text-lg leading-[2.2]', title: 'text-3xl', summary: 'text-lg leading-[2.1]' },
    lg: { body: 'text-xl leading-[2.3]', title: 'text-3xl sm:text-4xl', summary: 'text-xl leading-[2.2]' },
    xl: { body: 'text-2xl leading-[2.4]', title: 'text-4xl sm:text-5xl', summary: 'text-2xl leading-[2.3]' }
  };

  const themeStyles: Record<ReadingTheme, { bg: string; text: string; kicker: string; cardBg: string; border: string }> = {
    sepia: {
      bg: 'bg-[#1C1917]',
      text: 'text-[#F5EBD7]',
      kicker: 'text-[#E50914]',
      cardBg: 'bg-[#292524]',
      border: 'border-[#3D3733]'
    },
    charcoal: {
      bg: 'bg-[#0E121A]',
      text: 'text-[#E2E8F0]',
      kicker: 'text-[#E50914]',
      cardBg: 'bg-[#141A26]',
      border: 'border-[#1F2636]'
    },
    oled: {
      bg: 'bg-[#000000]',
      text: 'text-[#F8FAFC]',
      kicker: 'text-[#E50914]',
      cardBg: 'bg-[#0A0A0A]',
      border: 'border-[#1E1E1E]'
    }
  };

  const currentTheme = themeStyles[theme];

  const handleShare = async () => {
    const res = await shareContent({
      title: article.title,
      text: article.summary,
      type: 'news',
      id: article.id
    });
    if (res.status === 'copied') {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Scroll Progress Bar at the Top */}
      {isReadingMode && (
        <div className="fixed top-0 inset-x-0 z-50 h-1 bg-[#1E2536]">
          <div 
            className="h-full bg-[#E50914] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Main Container */}
      <div 
        className={`relative w-full h-full sm:h-auto sm:max-h-[92vh] flex flex-col text-right transition-all duration-300 overflow-hidden shadow-2xl rounded-none sm:rounded-2xl ${
          isReadingMode 
            ? `${currentTheme.bg} max-w-4xl border-0 sm:border ${currentTheme.border}` 
            : 'bg-[#10141E] max-w-2xl border border-[#1E2536]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className={`flex flex-wrap items-center justify-between p-3.5 sm:p-4 border-b transition-colors ${
          isReadingMode ? `${currentTheme.cardBg} ${currentTheme.border}` : 'bg-[#0C1018] border-[#1E2536]'
        }`}>
          
          {/* Mode Switch & Reading Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReadingMode(!isReadingMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isReadingMode 
                  ? 'bg-[#E50914] text-white font-semibold shadow-sm' 
                  : 'bg-[#151A26] hover:bg-[#1E2536] text-[#CBD5E1] border border-[#222B3D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isReadingMode ? 'وضع القراءة نشط' : 'تفعيل وضع القراءة'}</span>
            </button>

            {isReadingMode && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#94A3B8]">
                <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                <span>{readingTimeMinutes} دقائق قراءة ({wordCount} كلمة)</span>
              </div>
            )}
          </div>

          {/* Reading Mode Customizers Toolbar */}
          {isReadingMode ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Font Size Adjusters */}
              <div className="flex items-center rounded-lg border border-[#263145] bg-[#0E121A] px-1 py-0.5">
                <button
                  onClick={handleDecreaseFont}
                  disabled={fontSize === 'sm'}
                  className="p-1.5 text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تصغير الخط"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[11px] text-white font-medium">
                  {fontSize === 'sm' ? 'صغير' : fontSize === 'md' ? 'متوسط' : fontSize === 'lg' ? 'كبير' : 'أكبر'}
                </span>
                <button
                  onClick={handleIncreaseFont}
                  disabled={fontSize === 'xl'}
                  className="p-1.5 text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تكبير الخط"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Family Switcher */}
              <button
                onClick={() => setFontFamily(fontFamily === 'amiri' ? 'cairo' : 'amiri')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#263145] bg-[#0E121A] text-xs text-[#CBD5E1] hover:text-white transition-colors"
              >
                <Type className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{fontFamily === 'amiri' ? 'خط أميري' : 'خط القاهرة'}</span>
              </button>

              {/* Themes Selector */}
              <div className="flex items-center gap-1.5 rounded-lg border border-[#263145] bg-[#0E121A] p-1">
                <button
                  onClick={() => setTheme('sepia')}
                  className={`w-5 h-5 rounded-full bg-[#292524] border transition-transform ${
                    theme === 'sepia' ? 'border-[#E50914] scale-110 ring-1 ring-[#E50914]' : 'border-[#444]'
                  }`}
                  title="سمة ورق دافئ"
                />
                <button
                  onClick={() => setTheme('charcoal')}
                  className={`w-5 h-5 rounded-full bg-[#141A26] border transition-transform ${
                    theme === 'charcoal' ? 'border-[#E50914] scale-110 ring-1 ring-[#E50914]' : 'border-[#444]'
                  }`}
                  title="سمة داكن مريح"
                />
                <button
                  onClick={() => setTheme('oled')}
                  className={`w-5 h-5 rounded-full bg-[#000000] border transition-transform ${
                    theme === 'oled' ? 'border-[#E50914] scale-110 ring-1 ring-[#E50914]' : 'border-[#444]'
                  }`}
                  title="سمة سواد عميق"
                />
              </div>

              {/* Cover Image Toggle */}
              {article.imageUrl && (
                <button
                  onClick={() => setShowImage(!showImage)}
                  className="p-1.5 rounded-lg border border-[#263145] bg-[#0E121A] text-[#94A3B8] hover:text-white transition-colors"
                  title={showImage ? 'إخفاء الصورة للتركيز' : 'إظهار الصورة'}
                >
                  {showImage ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-[#94A3B8] hover:text-white transition-colors mr-1"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#94A3B8]">
                {article.category} · {article.date}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-[#94A3B8] hover:text-white transition-colors"
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
          <div className={`mx-auto ${isReadingMode ? 'max-w-2xl' : 'max-w-xl'} space-y-6`}>
            
            {/* Header */}
            {isReadingMode ? (
              <div className="space-y-4 pb-6 border-b border-[#263145]">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className={`px-2 py-0.5 rounded ${currentTheme.cardBg} font-medium`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>المصدر: {article.source || 'سينما وورلد'}</span>
                  </div>
                </div>

                <h1 className={`font-bold leading-[1.3] ${fontSizes[fontSize].title} ${
                  fontFamily === 'amiri' ? 'font-amiri font-bold' : 'font-sans'
                } ${currentTheme.text}`}>
                  {article.title}
                </h1>
              </div>
            ) : (
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-relaxed mb-3">
                  {article.title}
                </h1>
              </div>
            )}

            {/* Optional Cover Image */}
            {article.imageUrl && (!isReadingMode || showImage) && (
              <div className={`overflow-hidden rounded-xl border border-[#202738] ${
                isReadingMode ? 'my-6 max-h-96' : 'h-56 sm:h-72'
              }`}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Lead Summary Paragraph */}
            <div className={`p-4 sm:p-5 rounded-xl border ${
              isReadingMode 
                ? `${currentTheme.cardBg} border-r-4 border-r-[#E50914] ${currentTheme.border} ${currentTheme.text}` 
                : 'bg-[#141A26] border-r-4 border-r-[#E50914] border-[#1E2536] text-xs text-[#CBD5E1]'
            } italic leading-relaxed ${fontSizes[fontSize].summary} ${
              fontFamily === 'amiri' ? 'font-amiri' : 'font-sans'
            }`}>
              {article.summary}
            </div>

            {/* Main Editorial Prose */}
            {article.content && (
              <div className={`space-y-6 pt-2 ${fontSizes[fontSize].body} ${
                fontFamily === 'amiri' ? 'font-amiri' : 'font-sans'
              } ${isReadingMode ? currentTheme.text : 'text-[#94A3B8] text-sm'}`}>
                {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-justify leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-[#202738] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
              <div>
                نُشر عبر منصة سينما وورلد الرسمية
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                    isSaved 
                      ? 'bg-[#E50914] border-[#E50914] text-white font-semibold' 
                      : 'border-[#263145] bg-[#141A26] text-[#CBD5E1] hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'تم الحفظ' : 'حفظ المقال'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#263145] bg-[#141A26] text-[#CBD5E1] hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم نسخ الرابط' : 'مشاركة'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
