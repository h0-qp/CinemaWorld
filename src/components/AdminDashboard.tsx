import { useState } from 'react';
import { 
  Film, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Newspaper, 
  ExternalLink, 
  LogOut, 
  CheckCircle2, 
  Database,
  Radio
} from 'lucide-react';
import { Movie, NewsItem } from '../types';
import { saveMovie, removeMovie, saveNews, removeNews } from '../firebase/contentService';

interface AdminDashboardProps {
  movies: Movie[];
  news: NewsItem[];
  onExit: () => void;
}

const DEFAULT_GENRES = [
  'Sci-Fi',
  'Drama',
  'Action',
  'Thriller',
  'Crime',
  'Adventure',
  'Animation',
  'History',
  'Mystery',
  'Biography'
];

export default function AdminDashboard({ movies, news, onExit }: AdminDashboardProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('cinemaworld_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'movies' | 'news'
  const [activeTab, setActiveTab] = useState<'movies' | 'news'>('movies');

  // Movie Form State
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [savingMovie, setSavingMovie] = useState(false);

  // News Form State
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isNewsFormOpen, setIsNewsFormOpen] = useState(false);
  const [savingNews, setSavingNews] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cinemaworld_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cinemaworld_admin_auth');
  };

  // Movie Handlers
  const handleOpenAddMovie = () => {
    const newMovie: Movie = {
      id: `film-${Date.now()}`,
      title: '',
      originalTitle: '',
      posterUrl: '',
      backdropUrl: '',
      year: new Date().getFullYear(),
      rating: 8.5,
      genre: ['Drama'],
      duration: '2h 00m',
      synopsis: '',
      trailerUrl: 'https://www.youtube.com/embed/',
      isUpcoming: false,
      director: '',
      cast: [],
      spotlightReason: ''
    };
    setEditingMovie(newMovie);
    setIsMovieFormOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie({ ...movie });
    setIsMovieFormOpen(true);
  };

  const handleDeleteMovie = async (movieId: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف العمل "${title}" من قاعدة بيانات فايربيس؟`)) {
      return;
    }
    try {
      await removeMovie(movieId);
      showToast(`تم حذف "${title}" من Firebase بنجاح`);
    } catch {
      alert('حدث خطأ أثناء محاولة الحذف.');
    }
  };

  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    if (!editingMovie.title || !editingMovie.synopsis || !editingMovie.posterUrl) {
      alert('يرجى ملء الحقول الإلزامية (العنوان، البوستر، والقصة).');
      return;
    }

    setSavingMovie(true);
    try {
      await saveMovie(editingMovie);
      setIsMovieFormOpen(false);
      setEditingMovie(null);
      showToast('تم حفظ العمل بنجاح في قاعدة بيانات Firebase Firestore!');
    } catch {
      alert('فشل حفظ البيانات في Firebase.');
    } finally {
      setSavingMovie(false);
    }
  };

  // News Handlers
  const handleOpenAddNews = () => {
    const newNewsItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      category: 'إنتاجات جديدة',
      date: new Date().toISOString().split('T')[0],
      source: 'Cinema World Editorial',
      isHot: false
    };
    setEditingNews(newNewsItem);
    setIsNewsFormOpen(true);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews({ ...item });
    setIsNewsFormOpen(true);
  };

  const handleDeleteNews = async (newsId: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف الخبر "${title}"؟`)) {
      return;
    }
    try {
      await removeNews(newsId);
      showToast(`تم حذف الخبر بنجاح من Firebase`);
    } catch {
      alert('حدث خطأ أثناء حذف الخبر.');
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    if (!editingNews.title || !editingNews.summary) {
      alert('يرجى كتابة عنوان وملخص الخبر.');
      return;
    }

    setSavingNews(true);
    try {
      await saveNews(editingNews);
      setIsNewsFormOpen(false);
      setEditingNews(null);
      showToast('تم نشر وحفظ الخبر في Firebase بنجاح!');
    } catch {
      alert('فشل حفظ الخبر في Firebase.');
    } finally {
      setSavingNews(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 text-right selection:bg-[#C5A059]/20 selection:text-[#E2C378]">
        <div className="w-full max-w-md bg-[#111111] border border-[#262626] p-8 shadow-2xl relative">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 border border-[#C5A059] flex items-center justify-center mx-auto mb-3 bg-[#0A0A0A]">
              <Film className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h1 className="text-xl font-cinzel font-bold text-white tracking-widest">
              CINEMA WORLD ARCHIVE
            </h1>
            <p className="text-xs text-[#888880] mt-1 font-serif">
              بوابة الإدارة المركزية والتحكم في المحتوى
            </p>
          </div>

          {/* Simple Credentials Note for the User */}
          <div className="mb-6 p-3 bg-[#161616] border border-[#2D2D2D] text-xs font-mono text-[#D4AF37] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>بيانات الدخول المعتمدة للإدارة:</span>
            </div>
            <div className="text-zinc-300">اليوزر: <span className="text-white font-bold">admin</span></div>
            <div className="text-zinc-300">الرمز: <span className="text-white font-bold">admin123</span></div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#A1A19A] mb-1.5">اسم المستخدم (Username)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#262626] text-white text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A19A] mb-1.5">رمز المرور (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#262626] text-white text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors mt-2"
            >
              تسجيل الدخول للوحة التحكم
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1C1C1C] text-center">
            <button
              onClick={onExit}
              className="text-xs text-[#777] hover:text-[#C5A059] transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>الرجوع إلى الموقع الرئيسي</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E8E8E6] text-right selection:bg-[#C5A059]/20 selection:text-[#E2C378]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-[#111] border border-[#C5A059] text-[#E2C378] text-xs font-mono shadow-2xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Masthead Header */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F] border-b border-[#222222] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#C5A059] flex items-center justify-center bg-[#090909]">
              <Database className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-lg font-bold text-white tracking-wider">
                  CINEMA WORLD ADMIN
                </h1>
                <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 text-[10px] font-mono">
                  LIVE FIRESTORE
                </span>
              </div>
              <span className="text-[11px] text-[#888880] block font-serif">
                لوحة التحكم الإدارية ونشر المحتوى في فايربيس
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#2D2D2D] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>معاينة الموقع الحي</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1E0E0E] hover:bg-rose-950 border border-rose-900/60 text-xs font-mono text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>

        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#121212] border-b border-[#222222] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex gap-2">
          <button
            onClick={() => setActiveTab('movies')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'movies'
                ? 'border-[#C5A059] text-[#C5A059] font-bold bg-[#181818]'
                : 'border-transparent text-[#888880] hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>إدارة الأفلام والترشيحات ({movies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'news'
                ? 'border-[#C5A059] text-[#C5A059] font-bold bg-[#181818]'
                : 'border-transparent text-[#888880] hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>نشرة الأخبار والمقالات ({news.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* MOVIES TAB */}
        {activeTab === 'movies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E1E1E]">
              <div>
                <h2 className="text-xl font-cinzel font-bold text-white">
                  أرشيف الأعمال والترشيحات المعتمدة
                </h2>
                <p className="text-xs text-[#888880] mt-0.5 font-serif">
                  يمكنك نشر عمل سينمائي جديد، تعديل أي تفاصيل، أو التحكم في جدول العروض ورادار الإصدارات.
                </p>
              </div>

              <button
                onClick={handleOpenAddMovie}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة ترشيح أو فيلم جديد</span>
              </button>
            </div>

            {/* Movies Table / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="bg-[#121212] border border-[#222222] p-4 flex flex-col justify-between hover:border-[#383838] transition-colors"
                >
                  <div className="flex gap-4">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-20 h-28 object-cover border border-[#262626] shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C5A059] mb-1">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.rating} / 10</span>
                        {movie.isUpcoming && (
                          <span className="px-1.5 py-0.2 bg-amber-950/80 text-amber-300 border border-amber-800 text-[9px]">
                            رادار
                          </span>
                        )}
                      </div>
                      <h3 className="font-cinzel text-sm font-bold text-white truncate">
                        {movie.title}
                      </h3>
                      <p className="text-[11px] text-[#777] font-mono truncate">
                        {movie.director ? `Dir: ${movie.director}` : ''}
                      </p>
                      <p className="text-xs text-[#999] line-clamp-2 mt-2 font-serif">
                        {movie.synopsis}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#1C1C1C]">
                    <span className="text-[10px] font-mono text-[#666] truncate max-w-[120px]">
                      {movie.genre.join(', ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditMovie(movie)}
                        className="flex items-center gap-1 px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#C5A059] text-zinc-300 hover:text-black border border-[#2E2E2E] text-[11px] font-mono transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMovie(movie.id, movie.title)}
                        className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                        title="حذف العمل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E1E1E]">
              <div>
                <h2 className="text-xl font-cinzel font-bold text-white">
                  النشرة الإخبارية والتقارير الصحفية
                </h2>
                <p className="text-xs text-[#888880] mt-0.5 font-serif">
                  نشر مستجدات الإنتاج، اتفاقيات الاستوديوهات، وتغطيات المهرجانات السينمائية.
                </p>
              </div>

              <button
                onClick={handleOpenAddNews}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>نشر خبر سينمائي جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#121212] border border-[#222222] p-5 flex flex-col md:flex-row gap-5 items-start justify-between hover:border-[#383838] transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#888880]">
                      <span className="text-[#C5A059] font-bold">{item.category}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                      {item.source && (
                        <>
                          <span>•</span>
                          <span>{item.source}</span>
                        </>
                      )}
                      {item.isHot && (
                        <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 text-[10px]">
                          عاجل
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white font-serif leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A1A19A] font-serif leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#C5A059] text-zinc-300 hover:text-black border border-[#2E2E2E] text-xs font-mono transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => handleDeleteNews(item.id, item.title)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="حذف الخبر"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: MOVIE FORM */}
      {isMovieFormOpen && editingMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#121212] border border-[#2D2D2D] w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#222222] bg-[#0E0E0E]">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-cinzel text-base font-bold text-white">
                  {editingMovie.id ? `تعديل أو نشر: ${editingMovie.title || 'عمل جديد'}` : 'إضافة عمل جديد'}
                </h3>
              </div>
              <button
                onClick={() => setIsMovieFormOpen(false)}
                className="p-1 text-[#888] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveMovie} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A1A19A] mb-1">اسم العمل بالإنجليزية (Title En) *</label>
                  <input
                    type="text"
                    value={editingMovie.title}
                    onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                    placeholder="e.g. Dune: Part Two"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">سنة الإنتاج (Year) *</label>
                  <input
                    type="number"
                    value={editingMovie.year}
                    onChange={(e) => setEditingMovie({ ...editingMovie, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A1A19A] mb-1">التقييم (Rating / 10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={editingMovie.rating}
                    onChange={(e) => setEditingMovie({ ...editingMovie, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">المدة (Duration)</label>
                  <input
                    type="text"
                    value={editingMovie.duration}
                    onChange={(e) => setEditingMovie({ ...editingMovie, duration: e.target.value })}
                    placeholder="2h 46m or 10 Episodes"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">المخرج (Director En)</label>
                  <input
                    type="text"
                    value={editingMovie.director || ''}
                    onChange={(e) => setEditingMovie({ ...editingMovie, director: e.target.value })}
                    placeholder="Denis Villeneuve"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">التصنيفات (Genres)</label>
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  {DEFAULT_GENRES.map((g) => {
                    const isSelected = editingMovie.genre.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => {
                          if (isSelected) {
                            setEditingMovie({
                              ...editingMovie,
                              genre: editingMovie.genre.filter(item => item !== g)
                            });
                          } else {
                            setEditingMovie({
                              ...editingMovie,
                              genre: [...editingMovie.genre, g]
                            });
                          }
                        }}
                        className={`px-2.5 py-1 text-[11px] border transition-colors ${
                          isSelected
                            ? 'bg-[#C5A059] border-[#C5A059] text-black font-bold'
                            : 'bg-[#181818] border-[#2C2C2C] text-[#888]'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A1A19A] mb-1">رابط البوستر الرسمي (Poster Image URL) *</label>
                  <input
                    type="url"
                    value={editingMovie.posterUrl}
                    onChange={(e) => setEditingMovie({ ...editingMovie, posterUrl: e.target.value })}
                    placeholder="https://media.themoviedb.org/t/p/w780/..."
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">رابط صورة الخلفية (Backdrop URL)</label>
                  <input
                    type="url"
                    value={editingMovie.backdropUrl}
                    onChange={(e) => setEditingMovie({ ...editingMovie, backdropUrl: e.target.value })}
                    placeholder="https://media.themoviedb.org/t/p/w1280/..."
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">رابط التريلر (YouTube Embed URL)</label>
                <input
                  type="text"
                  value={editingMovie.trailerUrl}
                  onChange={(e) => setEditingMovie({ ...editingMovie, trailerUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/Way9Dexny3w"
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-2 p-3 bg-[#0A0A0A] border border-[#222]">
                  <input
                    type="checkbox"
                    id="isUpcomingCheck"
                    checked={editingMovie.isUpcoming}
                    onChange={(e) => setEditingMovie({ ...editingMovie, isUpcoming: e.target.checked })}
                    className="w-4 h-4 accent-[#C5A059]"
                  />
                  <label htmlFor="isUpcomingCheck" className="text-white cursor-pointer">
                    إدراجه في رادار الإصدارات القادمة (Release Radar)
                  </label>
                </div>

                {editingMovie.isUpcoming && (
                  <div>
                    <label className="block text-[#A1A19A] mb-1">تاريخ الإصدار المتوقع (ISO or Date)</label>
                    <input
                      type="date"
                      value={editingMovie.releaseDate?.split('T')[0] || ''}
                      onChange={(e) => setEditingMovie({ ...editingMovie, releaseDate: `${e.target.value}T00:00:00` })}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">قصة العمل باللغة العربية (Synopsis) *</label>
                <textarea
                  rows={3}
                  value={editingMovie.synopsis}
                  onChange={(e) => setEditingMovie({ ...editingMovie, synopsis: e.target.value })}
                  placeholder="اكتب حبكة الفيلم بدون حرق بأسلوب أدبي رصين..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white font-serif text-xs focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">رأي الناقد / سبب الترشيح (Spotlight Review)</label>
                <textarea
                  rows={2}
                  value={editingMovie.spotlightReason || ''}
                  onChange={(e) => setEditingMovie({ ...editingMovie, spotlightReason: e.target.value })}
                  placeholder="ملاحظات هيئة التحرير حول التصوير أو الموسيقى أو الأداء..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white font-serif text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setIsMovieFormOpen(false)}
                  className="px-4 py-2.5 bg-[#181818] border border-[#2B2B2B] text-zinc-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingMovie}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingMovie ? 'جاري الحفظ في Firebase...' : 'حفظ ونشر في Firebase'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: NEWS FORM */}
      {isNewsFormOpen && editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#121212] border border-[#2D2D2D] w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
            
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#222222] bg-[#0E0E0E]">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-cinzel text-base font-bold text-white">
                  {editingNews.id ? 'تعديل أو نشر مقال إخباري' : 'إضافة خبر سينمائي'}
                </h3>
              </div>
              <button
                onClick={() => setIsNewsFormOpen(false)}
                className="p-1 text-[#888] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#A1A19A] mb-1">عنوان الخبر (News Headline) *</label>
                <input
                  type="text"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  placeholder="اكتب العنوان السينمائي الرئيسي..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white font-serif text-sm focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A1A19A] mb-1">التصنيف (Category)</label>
                  <input
                    type="text"
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    placeholder="إنتاجات جديدة, مهرجانات"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">تاريخ النشر (Date)</label>
                  <input
                    type="date"
                    value={editingNews.date}
                    onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A19A] mb-1">المصدر (Source)</label>
                  <input
                    type="text"
                    value={editingNews.source || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, source: e.target.value })}
                    placeholder="Cinema World / Variety"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">رابط صورة الخبر (Image URL)</label>
                <input
                  type="url"
                  value={editingNews.imageUrl || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-[#0A0A0A] border border-[#222]">
                <input
                  type="checkbox"
                  id="isHotNews"
                  checked={editingNews.isHot || false}
                  onChange={(e) => setEditingNews({ ...editingNews, isHot: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059]"
                />
                <label htmlFor="isHotNews" className="text-white cursor-pointer">
                  تمييز الخبر كـ "عاجل / رئيسي" (Hot Dispatch)
                </label>
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">ملخص مقتضب (Brief Summary) *</label>
                <textarea
                  rows={2}
                  value={editingNews.summary}
                  onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                  placeholder="موجز الخبر للعرض في الشريط الإخباري..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white font-serif text-xs focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#A1A19A] mb-1">تفاصيل الخبر أو المقال (Full Body)</label>
                <textarea
                  rows={5}
                  value={editingNews.content || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  placeholder="اكتب التغطية الصحفية أو التحليل النقدي الكامل..."
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-white font-serif text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setIsNewsFormOpen(false)}
                  className="px-4 py-2.5 bg-[#181818] border border-[#2B2B2B] text-zinc-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingNews}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingNews ? 'جاري النشر في Firebase...' : 'نشر الخبر في Firebase'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
