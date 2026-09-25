import { useState } from 'react';
import { Film, Radio, Compass, Award, Send, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'الرئيسية', icon: Film },
    { id: 'radar', label: 'رادار الإصدارات', icon: Radio },
    { id: 'recommendations', label: 'مختارات السينما', icon: Compass },
    { id: 'trivia', label: 'التحدي السينمائي', icon: Award },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Top Gazette Microbar */}
      <div className="hidden sm:block border-b border-[#1A1A1A] py-1 bg-[#070707] text-[11px] text-[#888880] tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-[#C5A059] font-cinzel">CINEMA WORLD JOURNAL</span>
            <span className="text-[#444]">•</span>
            <span>المنصة الرسمية لأخبار وترشيحات السينما العالمية</span>
          </div>
          <div className="font-mono text-[10px] text-[#A1A19A]">
            DOMAIN: cinemaworld.info
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Masthead Branding */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="w-10 h-10 border border-[#C5A059]/60 flex items-center justify-center bg-[#121212] group-hover:border-[#C5A059] transition-colors">
              <Film className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="text-right">
              <span className="block font-cinzel text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#F3F4F6] group-hover:text-[#C5A059] transition-colors">
                CINEMA WORLD
              </span>
              <span className="block text-[10px] text-[#888882] tracking-wider">
                الدليل السينمائي المعتمد
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-[#C5A059] border-b-2 border-[#C5A059] font-semibold bg-[#141414]'
                      : 'text-[#A1A19A] hover:text-[#F3F4F6] hover:bg-[#141414]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#666]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Community Telegram Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B0B0B] text-xs font-semibold tracking-wider transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>قناة تيليغرام الرسمية</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#262626] text-[#E8E8E6] hover:border-[#C5A059] transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A059]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-[#222222] px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-right transition-colors ${
                  isActive
                    ? 'bg-[#181818] text-[#C5A059] font-bold border-r-2 border-[#C5A059]'
                    : 'text-[#A1A19A] hover:bg-[#141414] hover:text-[#F3F4F6]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C5A059]" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-[#1F1F1F]">
            <a
              href="https://t.me/cn_world"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#C5A059] text-[#C5A059] text-xs font-bold"
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
