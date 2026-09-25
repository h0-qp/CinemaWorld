import { Send, Youtube, Instagram, Twitter, Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-[#1F1F1F] pt-14 pb-10 text-[#888880] text-right font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#1A1A1A]">
          
          {/* Masthead Colophon */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#C5A059] flex items-center justify-center bg-[#0F0F0F]">
                <Film className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-[0.15em] text-[#F3F4F6] block">
                  CINEMA WORLD
                </span>
                <span className="font-mono text-[9px] text-[#C5A059] tracking-widest block">
                  CINEMAWORLD.INFO · OFFICIAL EDITION
                </span>
              </div>
            </div>

            <p className="text-xs text-[#999992] leading-relaxed max-w-md">
              المنصة الرسمية المعتمدة لقناة سينما وورلد. نكرّس جهودنا لتوثيق أرقى ما أنتجته السينما العالمية، وتقديم تقارير نقدية وقوائم ترشيحات ورادار زمني حي لأهم الأحداث السينمائية دون حرق أو مبالغة تجارية.
            </p>

            <div className="pt-2">
              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B0B0B] font-mono text-xs font-semibold tracking-wider transition-colors"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>الانضمام للنادي السينمائي على تيليغرام (t.me/cn_world)</span>
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#F3F4F6]">
              فهرس المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#C5A059] transition-colors">الواجهة الرئيسية</a>
              </li>
              <li>
                <a href="#radar" className="hover:text-[#C5A059] transition-colors">رادار الإصدارات المرتقبة</a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-[#C5A059] transition-colors">أرشيف التحف المختارة</a>
              </li>
              <li>
                <a href="#trivia" className="hover:text-[#C5A059] transition-colors">امتحان الثقافة السينمائية</a>
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#F3F4F6]">
              قنوات المتابعة
            </h4>
            <p className="text-[11px] text-[#777770]">
              تغطيات حصرية، مقالات فورية، ومراجعات مستمرة على مدار الساعة.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#262626] hover:border-[#C5A059] text-[#229ED9] flex items-center justify-center hover:bg-[#141414] transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#262626] hover:border-[#C5A059] text-[#888] hover:text-[#FF0000] flex items-center justify-center hover:bg-[#141414] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#262626] hover:border-[#C5A059] text-[#888] hover:text-[#E1306C] flex items-center justify-center hover:bg-[#141414] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#262626] hover:border-[#C5A059] text-[#888] hover:text-white flex items-center justify-center hover:bg-[#141414] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Colophon Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#666660] gap-3">
          <p>© {new Date().getFullYear()} CINEMA WORLD (cinemaworld.info). جميع حقوق النشر والتحرير محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>PRESTIGE CINEMA ARCHIVE</span>
            <span>•</span>
            <span className="text-[#C5A059]">EDITED FOR CINEPHILES</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
