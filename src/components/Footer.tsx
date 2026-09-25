import { Send, Youtube, Instagram, Twitter, Film, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#141414] pt-16 pb-12 text-[#7A7A72] text-right font-serif relative overflow-hidden">
      {/* Film Grain Texture */}
      <div className="absolute inset-0 cinema-grain opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#141414]">
          
          {/* Masthead Colophon */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 border border-[#C5A059] overflow-hidden flex items-center justify-center bg-[#0A0A0A] shadow-lg shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Cinema World" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-[0.18em] text-[#F3F4F6] block">
                  CINEMA WORLD
                </span>
                <span className="font-mono text-[9px] text-[#C5A059] tracking-widest block uppercase mt-0.5">
                  ESTABLISHED CINEMATIC ARCHIVE · OFFICIAL EDITION
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8C8C85] leading-relaxed max-w-lg">
              المنصة التوثيقية المعتمدة لقناة سينما وورلد. نكرّس خبرتنا لنقل عظمة الفن السابع عبر أرشفة منتقاة لأهم الأعمال السينمائية والتلفزيونية، وتقديم قراءات نقدية رصينة، ورادار زمني دقيق لأضخم عروض شاشات IMAX حول العالم.
            </p>

            <div className="pt-2">
              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#C5A059] bg-[#0A0A0A] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#070707] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>الانضمام للنادي السينمائي على تيليغرام (t.me/cn_world)</span>
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#F3F4F6] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>فهرس المنصة</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>·</span>
                  <span>الواجهة الرئيسية والعمل المختار</span>
                </a>
              </li>
              <li>
                <a href="#radar" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>·</span>
                  <span>رادار الإصدارات والتقويم</span>
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>·</span>
                  <span>أرشيف التحف المنتقاة</span>
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>·</span>
                  <span>النشرة الإخبارية والتقارير</span>
                </a>
              </li>
              <li>
                <a href="#auteurs" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  <span>·</span>
                  <span>رواد الإخراج والفلسفة السينمائية</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#F3F4F6]">
              شبكة المتابعة والتوثيق
            </h4>
            <p className="text-[11px] text-[#6A6A64] leading-relaxed">
              تغطيات حصرية، مقالات فورية، ومراجعات مستمرة على مدار الساعة مع مجتمع سينمائي يضم أكثر من 150 ألف محب للسينما.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#202020] hover:border-[#C5A059] text-[#229ED9] flex items-center justify-center bg-[#0A0A0A] hover:bg-[#121212] transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#202020] hover:border-[#C5A059] text-[#777] hover:text-[#FF0000] flex items-center justify-center bg-[#0A0A0A] hover:bg-[#121212] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#202020] hover:border-[#C5A059] text-[#777] hover:text-[#E1306C] flex items-center justify-center bg-[#0A0A0A] hover:bg-[#121212] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#202020] hover:border-[#C5A059] text-[#777] hover:text-white flex items-center justify-center bg-[#0A0A0A] hover:bg-[#121212] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Colophon Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#555] gap-4">
          <p>© {new Date().getFullYear()} CINEMA WORLD (cinemaworld.info). جميع حقوق النشر والأرشفة محفوظة.</p>
          <div className="flex items-center gap-3">
            <span>AUTHENTIC FILM ARCHIVE</span>
            <span className="text-[#333]">·</span>
            <span className="text-[#C5A059]">35MM / 70MM IMAX REPOSITORIES</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
