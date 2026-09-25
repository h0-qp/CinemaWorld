import { Film, Quote, Clapperboard, Award, Sparkles } from 'lucide-react';

interface DirectorProfile {
  name: string;
  nameEn: string;
  role: string;
  quote: string;
  keyFilms: string[];
  bio: string;
  portraitUrl: string;
}

const DIRECTORS: DirectorProfile[] = [
  {
    name: 'دينيس فيلنوف',
    nameEn: 'Denis Villeneuve',
    role: 'سيد الخيال العلمي الملحمي المعاصر',
    quote: 'السينما بالنسبة لي ليست مجرد حكاية تُروى، بل حالة شعورية وتجربة بصرية حسية متكاملة تلامس الروح الإنسانية.',
    keyFilms: ['Dune: Part One & Two', 'Blade Runner 2049', 'Arrival', 'Sicario'],
    bio: 'مخرج كندي استطاع تحويل أعقد الروايات الفلسفية إلى لوحات ملحمية خالدة مع الحفاظ على العمق الإنساني والتناغم الصوتي والبصري الصارم.',
    portraitUrl: 'https://media.themoviedb.org/t/p/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg'
  },
  {
    name: 'كريستوفر نولان',
    nameEn: 'Christopher Nolan',
    role: 'مهندس الزمن والواقع السينمائي والـ IMAX',
    quote: 'الشاشة الفضية هي المكان الوحيد الذي يمكننا فيه التلاعب بالزمن واستكشاف أبعاد الذاكرة والضمير البشري.',
    keyFilms: ['Oppenheimer', 'Interstellar', 'Inception', 'The Dark Knight Trilogy'],
    bio: 'حائز على جوائز الأوسكار ورائد السينما الحقيقية المعتمدة على المؤثرات الفيزيائية العملية وكاميرات IMAX 70mm، يشتهر ببناء حبكات غير خطية تتحدى إدراك المشاهد.',
    portraitUrl: 'https://media.themoviedb.org/t/p/w500/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg'
  },
  {
    name: 'ريدلي سكوت',
    nameEn: 'Ridley Scott',
    role: 'عميد الملاحم التاريخية وبناء العوالم',
    quote: 'كل لقطة يجب أن تحمل وزناً تاريخياً وجمالياً يظل عالقاً في وجدان المشاهد بعد مغادرة الصالة إلى الأبد.',
    keyFilms: ['Gladiator I & II', 'Alien', 'Blade Runner (1982)', 'The Martian'],
    bio: 'أحد أعمدة السينما البريطانية والعالمية لأكثر من أربعة عقود، مرجع أساسي في بناء العوالم التاريخية الصارمة وأفلام الخيال العلمي المظلمة.',
    portraitUrl: 'https://media.themoviedb.org/t/p/w500/z0I0TzJt387lJp6H2HhQeS3819g.jpg'
  }
];

export default function DirectorsSection() {
  return (
    <section id="auteurs" className="relative py-24 bg-[#070707] border-b border-[#181818] overflow-hidden">
      {/* Background Film Grain */}
      <div className="absolute inset-0 cinema-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.25em] mb-2 font-bold px-3 py-1 bg-[#0F0F0F] border border-[#202020]">
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>AUTEURS & RETROSPECTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-[#F8F8F6] tracking-wide cinema-glow mt-2">
            رواد الإخراج والفلسفة السينمائية
          </h2>
          <p className="text-xs sm:text-sm text-[#94948C] mt-2 font-serif leading-relaxed">
            قراءة نقدية في مسيرة المخرجين الذين أعادوا صياغة لغة الصورة وبناء العوالم في السينما العالمية.
          </p>
        </div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIRECTORS.map((director, idx) => (
            <div 
              key={idx} 
              className="film-card flex flex-col justify-between p-7 text-right bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#C5A059] transition-all duration-300 group"
            >
              <div>
                {/* Director Header Plate */}
                <div className="flex items-center justify-between pb-4 border-b border-[#181818] mb-4">
                  <div>
                    <span className="font-cinzel text-lg font-bold text-white block group-hover:text-[#C5A059] transition-colors">
                      {director.nameEn}
                    </span>
                    <span className="font-serif text-xs text-[#C5A059] block mt-0.5 font-semibold">
                      {director.name}
                    </span>
                  </div>
                  <div className="w-10 h-10 border border-[#C5A059]/40 flex items-center justify-center bg-[#070707] shadow-inner">
                    <Clapperboard className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>

                {/* Subtitle / Role */}
                <div className="text-[11px] font-mono text-[#888880] uppercase tracking-wider mb-3">
                  {director.role}
                </div>

                {/* Director Bio */}
                <p className="text-xs text-[#A8A8A2] leading-relaxed font-serif mb-5">
                  {director.bio}
                </p>

                {/* Director Quote in Classical Roman Parchment Block */}
                <div className="p-4 bg-[#080808] border-r-3 border-r-[#C5A059] border-y border-l border-[#161616] mb-5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[#C5A059] text-[10px] font-mono mb-1.5">
                    <Quote className="w-3 h-3" />
                    <span>رؤية المخرج الفنية</span>
                  </div>
                  <p className="text-xs italic font-serif text-[#D4D4CE] leading-relaxed">
                    "{director.quote}"
                  </p>
                </div>
              </div>

              {/* Filmography Footnote */}
              <div className="pt-4 border-t border-[#161616]">
                <div className="text-[10px] font-mono text-[#777770] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Film className="w-3 h-3 text-[#C5A059]" />
                    <span>أبرز الأعمال في الأرشيف:</span>
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {director.keyFilms.map((film, fIdx) => (
                    <span 
                      key={fIdx} 
                      className="px-2.5 py-1 bg-[#121212] text-[#D4AF37] font-mono text-[10px] border border-[#222222] hover:border-[#C5A059]/60 transition-colors"
                    >
                      {film}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
