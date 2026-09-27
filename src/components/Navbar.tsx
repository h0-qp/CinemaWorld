import { useState } from 'react';
import { Film, Radio, Compass, Clapperboard, Send, Menu, X, LogIn, LogOut, Bookmark, User, Newspaper } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onSelectWatchlist?: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onSelectWatchlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, signIn, signOut, watchlist } = useAuth();

  const navItems = [
    { id: 'hero', label: 'الرئيسية', icon: Film },
    { id: 'news', label: 'الأخبار والتقارير', icon: Newspaper },
    { id: 'recommendations', label: 'ترشيحات الأفلام', icon: Compass },
    { id: 'radar', label: 'رادار الإصدارات', icon: Radio },
    { id: 'auteurs', label: 'كبار المخرجين', icon: Clapperboard },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWatchlist = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectWatchlist) {
      onSelectWatchlist();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-md border-b border-[#1E2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Brand Wordmark & Official Channel Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#131722] border border-[#2A3245] group-hover:border-[#E50914] transition-colors shrink-0 shadow-md">
              <img 
                src="/logo.jpg" 
                alt="Cinema World" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-right">
              <span className="block font-bold text-lg sm:text-xl text-white tracking-wide group-hover:text-[#E50914] transition-colors leading-tight">
                سينما وورلد
              </span>
              <span className="block text-[11px] text-[#94A3B8] font-medium leading-none">
                CINEMA WORLD
              </span>
            </div>
          </div>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1E2433] text-white font-semibold'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#151A26]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Telegram Channel + Watchlist / Auth) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Telegram Channel Button */}
            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#151A26] hover:bg-[#1E2433] border border-[#252E40] text-sm text-[#E2E8F0] transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>القناة على تيليغرام</span>
            </a>

            {/* Watchlist Quick Button */}
            <button
              onClick={handleOpenWatchlist}
              className="relative p-2 rounded-md bg-[#151A26] hover:bg-[#1E2433] border border-[#252E40] text-[#94A3B8] hover:text-white transition-colors"
              title="قائمة المشاهدة"
              aria-label="قائمة المشاهدة"
            >
              <Bookmark className="w-4 h-4" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E50914] text-[10px] font-bold text-white flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-md bg-[#151A26] hover:bg-[#1E2433] border border-[#252E40] text-sm text-white transition-colors"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-[#94A3B8]" />
                  )}
                  <span className="text-xs font-medium max-w-[100px] truncate">{user.displayName || 'حسابي'}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-lg bg-[#151A26] border border-[#252E40] shadow-2xl py-1 text-right z-50">
                    <button
                      onClick={handleOpenWatchlist}
                      className="w-full px-4 py-2 text-xs text-[#CBD5E1] hover:text-white hover:bg-[#1E2433] flex items-center justify-between"
                    >
                      <span>قائمتي المحفوظة</span>
                      <span className="text-[11px] font-semibold text-[#E50914]">{watchlist.length}</span>
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-xs text-rose-400 hover:bg-[#1E2433] flex items-center gap-2 border-t border-[#1F2637]"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>دخول</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleOpenWatchlist}
              className="relative p-2 rounded-md bg-[#151A26] border border-[#252E40] text-[#94A3B8]"
              aria-label="قائمتي"
            >
              <Bookmark className="w-4 h-4" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E50914] text-[9px] font-bold text-white flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#151A26] border border-[#252E40] text-[#94A3B8] hover:text-white"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E2433] bg-[#0E121A] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors text-right ${
                  activeSection === item.id
                    ? 'bg-[#1E2433] text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#151A26]'
                }`}
              >
                <item.icon className="w-4 h-4 text-[#94A3B8]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1E2433] flex flex-col gap-2">
            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#151A26] text-sm text-[#E2E8F0] border border-[#252E40]"
            >
              <Send className="w-4 h-4 text-[#38BDF8]" />
              <span>قناة تيليغرام الرسمية</span>
            </a>
            {user ? (
              <button
                onClick={signOut}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-rose-950/40 text-rose-300 border border-rose-900/40 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج ({user.displayName || 'الحساب'})</span>
              </button>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#E50914] text-white text-sm font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول بحساب Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
