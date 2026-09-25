import { useState } from 'react';
import { Film, Radio, Compass, Clapperboard, Send, Menu, X, LogIn, LogOut, Bookmark, User, Newspaper, Sparkles } from 'lucide-react';
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
    { id: 'hero', label: 'الرئيسية', icon: Film, enLabel: 'FEATURED' },
    { id: 'radar', label: 'رادار الإصدارات', icon: Radio, enLabel: 'RADAR 2026' },
    { id: 'recommendations', label: 'مختارات السينما', icon: Compass, enLabel: 'ARCHIVE' },
    { id: 'news', label: 'النشرة الإخبارية', icon: Newspaper, enLabel: 'GAZETTE' },
    { id: 'auteurs', label: 'كبار المخرجين', icon: Clapperboard, enLabel: 'AUTEURS' },
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
    <header className="sticky top-0 z-50 bg-[#070707]/95 backdrop-blur-md border-b border-[#1A1A1A]">
      {/* Top Gazette Microbar with 35mm film perforation line */}
      <div className="hidden sm:block border-b border-[#141414] py-1 bg-[#050505] text-[10px] text-[#73736E] tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-[#C5A059] font-cinzel font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              CINEMA WORLD ARCHIVE
            </span>
            <span className="text-[#262626]">|</span>
            <span className="font-serif">المرجع المعتمد لتوثيق روائع السينما العالمية ونقد الفن السابع</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#888880]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
              CURATED 35MM / 70MM IMAX EDITION
            </span>
            <span className="text-[#2A2A2A]">·</span>
            <span>DOMAIN: cinemaworld.info</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Masthead Branding with Authentic Roman Seal */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="relative w-11 h-11 border border-[#C5A059]/50 flex items-center justify-center bg-[#0B0B0B] group-hover:border-[#C5A059] transition-all shadow-lg group-hover:shadow-[0_0_15px_rgba(197,160,89,0.25)]">
              <Film className="w-5 h-5 text-[#C5A059] transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C5A059]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C5A059]" />
            </div>
            <div className="text-right">
              <span className="block font-cinzel text-xl sm:text-2xl font-extrabold tracking-[0.18em] text-[#F3F4F6] group-hover:text-[#C5A059] transition-colors leading-tight">
                CINEMA WORLD
              </span>
              <span className="block text-[10px] text-[#7A7A72] tracking-[0.25em] font-mono uppercase mt-0.5">
                EST. ARCHIVE · ARABIC EDITION
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex flex-col items-center px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 group ${
                    isActive
                      ? 'text-[#C5A059] font-bold bg-[#111111] border-x border-[#1F1F1F]'
                      : 'text-[#96968F] hover:text-[#F3F4F6] hover:bg-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#C5A059]' : 'text-[#555] group-hover:text-[#C5A059]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[8px] tracking-widest transition-colors ${isActive ? 'text-[#C5A059]/80' : 'text-[#444] group-hover:text-[#777]'}`}>
                    {item.enLabel}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth & Telegram Link */}
          <div className="hidden md:flex items-center gap-3">
            {/* Telegram Channel Button */}
            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center gap-2 px-3.5 py-2 border border-[#C5A059]/40 bg-[#0E0E0E] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#070707] text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5 fill-current transition-transform group-hover:-translate-x-0.5" />
              <span>قناة تيليغرام</span>
            </a>

            {/* Firebase Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#222222] hover:border-[#C5A059] bg-[#0E0E0E] transition-colors"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-6 h-6 rounded-full object-cover border border-[#C5A059]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[#C5A059]" />
                    </div>
                  )}
                  <span className="text-xs font-mono text-zinc-200 truncate max-w-[100px]">
                    {user.displayName?.split(' ')[0] || 'عضو'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-[#0E0E0E] border border-[#242424] shadow-2xl py-2 z-50 text-right animate-fadeIn">
                    <div className="px-4 py-2 border-b border-[#1A1A1A]">
                      <span className="block text-xs font-bold text-white truncate">{user.displayName}</span>
                      <span className="block text-[10px] text-zinc-500 font-mono truncate">{user.email}</span>
                    </div>

                    <button
                      onClick={handleOpenWatchlist}
                      className="w-full text-right px-4 py-2.5 text-xs text-[#E2C378] hover:bg-[#161616] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>قائمتي المحفوظة</span>
                      </div>
                      <span className="font-mono text-[10px] bg-[#1A1A1A] px-2 py-0.5 rounded text-white border border-[#2D2D2D]">
                        {watchlist.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-right px-4 py-2 text-xs text-rose-400 hover:bg-[#161616] flex items-center gap-2 border-t border-[#181818] mt-1 transition-colors"
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
                className="flex items-center gap-2 px-3.5 py-2 bg-[#121212] hover:bg-[#C5A059] text-[#E8E8E6] hover:text-[#0B0B0B] border border-[#262626] hover:border-[#C5A059] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>تسجيل الدخول</span>
              </button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <button
                onClick={handleOpenWatchlist}
                className="p-2 border border-[#222222] text-[#C5A059] bg-[#0E0E0E]"
                aria-label="قائمتي"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                onClick={signIn}
                className="p-2 border border-[#222222] text-[#C5A059] bg-[#0E0E0E]"
                aria-label="تسجيل الدخول"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#222222] bg-[#0E0E0E] text-[#E8E8E6] hover:border-[#C5A059] transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A059]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#1E1E1E] px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider text-right transition-colors ${
                  isActive
                    ? 'bg-[#141414] text-[#C5A059] font-bold border-r-2 border-[#C5A059]'
                    : 'text-[#A1A19A] hover:bg-[#101010] hover:text-[#F3F4F6]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#C5A059]" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[9px] text-[#555] tracking-widest">{item.enLabel}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#181818] space-y-2">
            {user ? (
              <div className="p-3 bg-[#111111] border border-[#222222] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">{user.displayName}</span>
                  <button onClick={signOut} className="text-rose-400 text-[11px] font-mono">
                    تسجيل الخروج
                  </button>
                </div>
                <button
                  onClick={handleOpenWatchlist}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#181818] text-[#E2C378] text-xs font-mono border border-[#2A2A2A]"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>قائمتي المحفوظة ({watchlist.length})</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#111111] text-[#C5A059] border border-[#C5A059]/40 text-xs font-mono uppercase tracking-wider font-bold"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>تسجيل الدخول بحساب Google</span>
              </button>
            )}

            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#C5A059] text-[#C5A059] text-xs font-mono uppercase tracking-wider font-bold bg-[#0D0D0D]"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>الانضمام لقناة تيليغرام (t.me/cn_world)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
