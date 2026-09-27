import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080A0F] border-t border-[#1E2433] py-12 text-[#94A3B8] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1E2433]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#131722] border border-[#252E40] shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Cinema World" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">
                  سينما وورلد
                </span>
                <span className="text-xs text-[#64748B] block">
                  CINEMA WORLD
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-lg">
              المنصة الرسمية لقناة سينما وورلد. نكرّس خبرتنا لنقل عظمة الفن السابع عبر أرشفة منتقاة لأهم الأعمال السينمائية العالمية، وتقديم قراءات نقدية رصينة، ومتابعة أدق مواعيد العروض في الصالات العالمية.
            </p>

            <div className="pt-1">
              <a
                href="https://t.me/cn_world"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>انضم لقناة التليغرام الرسمية (@cn_world)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              أقسام الموقع
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  الرئيسية وترشيح الأسبوع
                </a>
              </li>
              <li>
                <a href="#radar" className="hover:text-white transition-colors">
                  رادار الإصدارات والتقويم
                </a>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-white transition-colors">
                  مختارات وترشيحات الأفلام
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">
                  الأخبار والتقارير الحصرية
                </a>
              </li>
              <li>
                <a href="#auteurs" className="hover:text-white transition-colors">
                  رواد الإخراج والسينما
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Notice */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              معلومات المنصة
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              جميع التريلرات والبوسترات والعلامات التجارية السينمائية ملك لأصحاب الحقوق والاستوديوهات المنتجة المعنية، وتُعرض هنا لأغراض نقدية وتوثيقية بحتة.
            </p>
            <div className="text-xs text-[#64748B]">
              الدومين الرسمي: <span className="text-[#CBD5E1]">cinemaworld.info</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            © {new Date().getFullYear()} سينما وورلد (Cinema World). جميع الحقوق محفوظة.
          </div>
          <div>
            صُمم خصيصاً لعشاق الفن السابع والسينما العالمية.
          </div>
        </div>

      </div>
    </footer>
  );
}
