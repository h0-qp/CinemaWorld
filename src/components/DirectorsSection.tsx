import { Quote, Clapperboard, Film } from 'lucide-react';

interface DirectorProfile {
  name: string;
  nameEn: string;
  role: string;
  quote: string;
  keyFilms: string[];
  bio: string;
}

const DIRECTORS: DirectorProfile[] = [
  {
    name: 'دينيس فيلنوف',
    nameEn: 'Denis Villeneuve',
    role: 'سيد الخيال العلمي الملحمي المعاصر',
    quote: 'السينما بالنسبة لي ليست مجرد حكاية تُروى، بل حالة شعورية وتجربة حسية متكاملة تلامس الروح الإنسانية.',
    keyFilms: ['Dune: Part One & Two', 'Blade Runner 2049', 'Arrival', 'Sicario'],
    bio: 'مخرج كندي استطاع تحويل أعقد الروايات الفلسفية إلى لوحات بصرية خالدة مع الحفاظ على العمق الإنساني والتناغم الصوتي والبصري الصارم.'
  },
  {
    name: 'كريستوفر نولان',
    nameEn: 'Christopher Nolan',
    role: 'مهندس الزمن والواقع السينمائي وكاميرات IMAX',
    quote: 'الشاشة الفضية هي المكان الوحيد الذي يمكننا فيه التلاعب بالزمن واستكشاف أبعاد الذاكرة والضمير البشري.',
    keyFilms: ['Oppenheimer', 'Interstellar', 'Inception', 'The Dark Knight'],
    bio: 'حائز على جوائز الأوسكار ورائد السينما الحقيقية المعتمدة على المؤثرات العملية وشاشات 70mm، يشتهر ببناء حبكات غير خطية تتحدى إدراك المشاهد.'
  },
  {
    name: 'ريدلي سكوت',
    nameEn: 'Ridley Scott',
    role: 'عميد الملاحم التاريخية وبناء العوالم',
    quote: 'كل كادر يجب أن يحمل وزناً تاريخياً وجمالياً يظل عالقاً في وجدان المشاهد بعد مغادرة الصالة.',
    keyFilms: ['Gladiator', 'Alien', 'Blade Runner', 'The Martian'],
    bio: 'أحد أعمدة السينما العالمية لأكثر من أربعة عقود، مرجع أساسي في بناء العوالم التاريخية الصارمة وأفلام الخيال العلمي المظلمة.'
  }
];

export default function DirectorsSection() {
  return (
    <section id="auteurs" className="relative py-20 bg-[#0B0E14] border-b border-[#1E2433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#E50914] uppercase tracking-wider block mb-1">
            صناع الرؤية البصرية
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            رواد الإخراج والفلسفة السينمائية
          </h2>
          <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
            قراءة نقدية في مسيرة المخرجين الذين أعادوا صياغة لغة الصورة وبناء العوالم في السينما العالمية.
          </p>
        </div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIRECTORS.map((director, idx) => (
            <div 
              key={idx} 
              className="flex flex-col justify-between p-6 rounded-xl text-right bg-[#121622] border border-[#1E2536] hover:border-[#2E394E] transition-all duration-300 shadow-md group"
            >
              <div className="space-y-4">
                {/* Director Header Plate */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1C2232]">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors">
                      {director.name}
                    </h3>
                    <span className="text-xs text-[#64748B] block">
                      {director.nameEn}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#181F2E] flex items-center justify-center text-[#E50914]">
                    <Clapperboard className="w-4 h-4" />
                  </div>
                </div>

                {/* Subtitle / Role */}
                <div className="text-xs font-medium text-[#E50914]">
                  {director.role}
                </div>

                {/* Director Bio */}
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {director.bio}
                </p>

                {/* Quote Box */}
                <div className="p-3.5 rounded-lg bg-[#0E121A] border border-[#1A202E]">
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1">
                    <Quote className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>رؤية المخرج:</span>
                  </div>
                  <p className="text-xs italic text-[#CBD5E1] leading-relaxed">
                    "{director.quote}"
                  </p>
                </div>
              </div>

              {/* Filmography Footnote */}
              <div className="pt-4 border-t border-[#1C2232] mt-4">
                <span className="text-[11px] font-medium text-[#64748B] block mb-2">
                  أبرز الأعمال في السينما:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {director.keyFilms.map((film, fIdx) => (
                    <span 
                      key={fIdx} 
                      className="px-2.5 py-1 rounded bg-[#181F2E] text-slate-300 text-xs font-medium border border-[#222B3D]"
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
