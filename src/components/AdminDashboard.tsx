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
  Radio,
  Clock,
  Star
} from 'lucide-react';
import { Movie, NewsItem } from '../types';
import { saveMovie, removeMovie, saveNews, removeNews } from '../firebase/contentService';
import ImageUploadInput from './ImageUploadInput';

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
    if (username.trim() === 'admin' && password === 'hussein@hussein') {
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

  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    if (!editingMovie.title.trim()) {
      alert('يرجى إدخال اسم العمل.');
      return;
    }
    if (!editingMovie.posterUrl.trim()) {
      alert('يرجى اختيار بوستر للعمل (سواء رفع من الاستوديو أو رابط).');
      return;
    }

    try {
      setSavingMovie(true);
      await saveMovie(editingMovie);
      setIsMovieFormOpen(false);
      setEditingMovie(null);
      showToast(`تم حفظ وتحديث فيلم "${editingMovie.title}" بنجاح في Firebase.`);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حفظ الفيلم.');
    } finally {
      setSavingMovie(false);
    }
  };

  const handleDeleteMovie = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف فيلم "${title}"؟`)) return;
    try {
      await removeMovie(id);
      showToast(`تم حذف فيلم "${title}" من Firebase.`);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حذف الفيلم.');
    }
  };

  // News Handlers
  const handleOpenAddNews = () => {
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'إنتاجات جديدة',
      imageUrl: '',
      isHot: false,
      source: 'سينما وورلد'
    };
    setEditingNews(newItem);
    setIsNewsFormOpen(true);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews({ ...item });
    setIsNewsFormOpen(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    if (!editingNews.title.trim()) {
      alert('يرجى كتابة عنوان الخبر.');
      return;
    }

    try {
      setSavingNews(true);
      await saveNews(editingNews);
      setIsNewsFormOpen(false);
      setEditingNews(null);
      showToast(`تم نشر وتحديث خبر "${editingNews.title}" في Firebase بنجاح.`);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء نشر الخبر.');
    } finally {
      setSavingNews(false);
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف هذا الخبر؟ "${title}"`)) return;
    try {
      await removeNews(id);
      showToast(`تم حذف الخبر بنجاح.`);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حذف الخبر.');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4 text-right selection:bg-[#E50914]/30 selection:text-white">
        <div className="w-full max-w-md bg-[#121622] border border-[#1E2536] rounded-2xl p-8 shadow-2xl relative">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#1A2030] border border-[#252E40] flex items-center justify-center mx-auto mb-3 text-[#E50914] shadow-sm">
              <Film className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              لوحة تحكم سينما وورلد
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              إدارة أرشيف الأفلام، رادار الإصدارات، ونشرة الأخبار
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs focus:outline-none focus:border-[#E50914]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs focus:outline-none focus:border-[#E50914]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white font-semibold text-xs tracking-wider transition-colors mt-2"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1E2536] text-center">
            <button
              onClick={onExit}
              className="text-xs text-[#94A3B8] hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto"
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
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] text-right selection:bg-[#E50914]/30 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-lg bg-[#141A26] border border-[#E50914] text-white text-xs font-medium shadow-2xl animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Masthead Header */}
      <header className="sticky top-0 z-40 bg-[#0E121A]/95 backdrop-blur-md border-b border-[#1E2536] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#131722] border border-[#252E40] shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">
                  لوحة تحكم سينما وورلد
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 text-[10px] font-mono">
                  متصل بـ Firebase
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] block">
                تعديل وحفظ فوري في السحابة مع دعم رفع الصور ككود Base64
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141A26] hover:bg-[#1E2536] border border-[#252E40] text-xs text-[#CBD5E1] hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>معاينة الموقع</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-xs text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>

        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-[#0E121A] border-b border-[#1E2536] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex gap-2">
          <button
            onClick={() => setActiveTab('movies')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
              activeTab === 'movies'
                ? 'border-[#E50914] text-white bg-[#141A26]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-[#E50914]" />
            <span>إدارة الأفلام والترشيحات ({movies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
              activeTab === 'news'
                ? 'border-[#E50914] text-white bg-[#141A26]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#E50914]" />
            <span>نشرة الأخبار والمقالات ({news.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* MOVIES TAB */}
        {activeTab === 'movies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2536]">
              <div>
                <h2 className="text-xl font-bold text-white">
                  أرشيف الأعمال والترشيحات
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  إضافة أعمال جديدة، تعديل البوسترات، وتحديد الأفلام القادمة في رادار الإصدارات.
                </p>
              </div>

              <button
                onClick={handleOpenAddMovie}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors self-start sm:self-auto shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة فيلم أو ترشيح جديد</span>
              </button>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="rounded-xl bg-[#121622] border border-[#1E2536] p-4 flex flex-col justify-between hover:border-[#2E394E] transition-all shadow-sm"
                >
                  <div className="flex gap-3.5">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-20 h-28 object-cover rounded-lg border border-[#1E2536] shrink-0 bg-black"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mb-1">
                        <span className="text-white font-medium">{movie.year}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1 text-[#F59E0B]">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{movie.rating}</span>
                        </div>
                        {movie.isUpcoming && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px]">
                            رادار
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white truncate leading-snug">
                        {movie.title}
                      </h3>
                      <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                        {movie.director ? `إخراج: ${movie.director}` : ''}
                      </p>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 mt-2 leading-relaxed">
                        {movie.synopsis}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#1C2232]">
                    <span className="text-[11px] text-[#64748B] truncate max-w-[140px]">
                      {movie.genre.join(' · ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditMovie(movie)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181F2E] hover:bg-[#E50914] text-slate-300 hover:text-white border border-[#222B3D] text-xs font-medium transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMovie(movie.id, movie.title)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="حذف الفيلم"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2536]">
              <div>
                <h2 className="text-xl font-bold text-white">
                  النشرة الإخبارية والتقارير الصحفية
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  نشر مستجدات الإنتاج، صفقات المخرجين، وتغطيات المهرجانات السينمائية.
                </p>
              </div>

              <button
                onClick={handleOpenAddNews}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors self-start sm:self-auto shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>نشر خبر سينمائي جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-xl bg-[#121622] border border-[#1E2536] p-5 flex flex-col md:flex-row gap-5 items-start justify-between hover:border-[#2E394E] transition-all shadow-sm"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full md:w-36 h-24 object-cover rounded-lg border border-[#1E2536] shrink-0 bg-black"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <span className="text-[#E50914] font-medium">{item.category}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                      {item.source && (
                        <>
                          <span>·</span>
                          <span>المصدر: {item.source}</span>
                        </>
                      )}
                      {item.isHot && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold">
                          عاجل
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181F2E] hover:bg-[#E50914] text-[#CBD5E1] hover:text-white border border-[#222B3D] text-xs font-medium transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => handleDeleteNews(item.id, item.title)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121622] border border-[#1E2536] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1E2536] bg-[#0E121A]">
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4 text-[#E50914]" />
                <h3 className="text-base font-bold text-white">
                  {editingMovie.id ? `تعديل أو نشر: ${editingMovie.title || 'فيلم جديد'}` : 'إضافة فيلم جديد'}
                </h3>
              </div>
              <button
                onClick={() => setIsMovieFormOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveMovie} className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">اسم العمل (Title) *</label>
                  <input
                    type="text"
                    value={editingMovie.title}
                    onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                    placeholder="e.g. Dune: Part Two"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">سنة الإنتاج (Year) *</label>
                  <input
                    type="number"
                    value={editingMovie.year}
                    onChange={(e) => setEditingMovie({ ...editingMovie, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">التقييم (Rating / 10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={editingMovie.rating}
                    onChange={(e) => setEditingMovie({ ...editingMovie, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">المدة (Duration)</label>
                  <input
                    type="text"
                    value={editingMovie.duration}
                    onChange={(e) => setEditingMovie({ ...editingMovie, duration: e.target.value })}
                    placeholder="2h 46m"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">المخرج (Director)</label>
                  <input
                    type="text"
                    value={editingMovie.director || ''}
                    onChange={(e) => setEditingMovie({ ...editingMovie, director: e.target.value })}
                    placeholder="Denis Villeneuve"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* Genre Selection */}
              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">التصنيفات السينمائية (Genres)</label>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
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
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#E50914] text-white shadow-xs'
                            : 'bg-[#181F2E] text-[#94A3B8] hover:text-white border border-[#222B3D]'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TWO IMAGE UPLOADS: POSTER & BACKDROP WITH STUDIO/GALLERY CODE STORAGE OR URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                <ImageUploadInput
                  label="بوستر العمل الرسمي (Poster)"
                  value={editingMovie.posterUrl}
                  onChange={(val) => setEditingMovie({ ...editingMovie, posterUrl: val })}
                  required
                  aspectRatioHint="poster"
                />

                <ImageUploadInput
                  label="صورة الخلفية العريضة (Backdrop)"
                  value={editingMovie.backdropUrl || ''}
                  onChange={(val) => setEditingMovie({ ...editingMovie, backdropUrl: val })}
                  aspectRatioHint="backdrop"
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">رابط التريلر (YouTube Embed URL)</label>
                <input
                  type="text"
                  value={editingMovie.trailerUrl}
                  onChange={(e) => setEditingMovie({ ...editingMovie, trailerUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/Way9Dexny3w"
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0A0D14] border border-[#1E2536]">
                  <input
                    type="checkbox"
                    id="isUpcomingCheck"
                    checked={editingMovie.isUpcoming}
                    onChange={(e) => setEditingMovie({ ...editingMovie, isUpcoming: e.target.checked })}
                    className="w-4 h-4 accent-[#E50914]"
                  />
                  <label htmlFor="isUpcomingCheck" className="text-white cursor-pointer font-medium">
                    إدراجه في رادار الإصدارات القادمة (Release Radar)
                  </label>
                </div>

                {editingMovie.isUpcoming && (
                  <div>
                    <label className="block text-[#CBD5E1] font-medium mb-1.5">تاريخ الإصدار المتوقع</label>
                    <input
                      type="date"
                      value={editingMovie.releaseDate?.split('T')[0] || ''}
                      onChange={(e) => setEditingMovie({ ...editingMovie, releaseDate: `${e.target.value}T00:00:00` })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">قصة العمل باللغة العربية (Synopsis) *</label>
                <textarea
                  rows={3}
                  value={editingMovie.synopsis}
                  onChange={(e) => setEditingMovie({ ...editingMovie, synopsis: e.target.value })}
                  placeholder="اكتب حبكة الفيلم بدون حرق..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs focus:outline-none focus:border-[#E50914]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">رأي الناقد / سبب الترشيح (Spotlight Review)</label>
                <textarea
                  rows={2}
                  value={editingMovie.spotlightReason || ''}
                  onChange={(e) => setEditingMovie({ ...editingMovie, spotlightReason: e.target.value })}
                  placeholder="ملاحظات هيئة التحرير حول العمل..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs focus:outline-none focus:border-[#E50914]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#1E2536]">
                <button
                  type="button"
                  onClick={() => setIsMovieFormOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#141A26] border border-[#1E2536] text-[#CBD5E1] hover:text-white transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingMovie}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white font-semibold transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121622] border border-[#1E2536] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1E2536] bg-[#0E121A]">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#E50914]" />
                <h3 className="text-base font-bold text-white">
                  {editingNews.id ? 'تعديل أو نشر خبر سينمائي' : 'إضافة خبر جديد'}
                </h3>
              </div>
              <button
                onClick={() => setIsNewsFormOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">عنوان الخبر (Headline) *</label>
                <input
                  type="text"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  placeholder="اكتب العنوان السينمائي الرئيسي..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-sm focus:outline-none focus:border-[#E50914]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">التصنيف (Category)</label>
                  <input
                    type="text"
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    placeholder="إنتاجات جديدة, مهرجانات"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">تاريخ النشر (Date)</label>
                  <input
                    type="date"
                    value={editingNews.date}
                    onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#CBD5E1] font-medium mb-1.5">المصدر (Source)</label>
                  <input
                    type="text"
                    value={editingNews.source || ''}
                    onChange={(e) => setEditingNews({ ...editingNews, source: e.target.value })}
                    placeholder="سينما وورلد / Variety"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* NEWS IMAGE: GALLERY CODE OR DIRECT URL */}
              <ImageUploadInput
                label="صورة الخبر الرئيسية"
                value={editingNews.imageUrl || ''}
                onChange={(val) => setEditingNews({ ...editingNews, imageUrl: val })}
                aspectRatioHint="news"
              />

              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0A0D14] border border-[#1E2536]">
                <input
                  type="checkbox"
                  id="isHotNews"
                  checked={editingNews.isHot || false}
                  onChange={(e) => setEditingNews({ ...editingNews, isHot: e.target.checked })}
                  className="w-4 h-4 accent-[#E50914]"
                />
                <label htmlFor="isHotNews" className="text-white cursor-pointer font-medium">
                  تمييز الخبر كـ "عاجل / رئيسي"
                </label>
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">ملخص مقتضب (Summary) *</label>
                <textarea
                  rows={2}
                  value={editingNews.summary}
                  onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                  placeholder="موجز سريع للخبر يظهر في الصفحة الرئيسية..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs focus:outline-none focus:border-[#E50914]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#CBD5E1] font-medium mb-1.5">نص المقال والتقرير الكامل (Content)</label>
                <textarea
                  rows={5}
                  value={editingNews.content || ''}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  placeholder="اكتب التقرير الصحفي الكامل هنا، يدعم الفقرات المتعددة ووضع القراءة..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#1E2536] text-white text-xs leading-relaxed focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1E2536]">
                <button
                  type="button"
                  onClick={() => setIsNewsFormOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#141A26] border border-[#1E2536] text-[#CBD5E1] hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={savingNews}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white font-semibold transition-colors"
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
