import { Movie } from '../types';

/**
 * =========================================================================
 * CINEMA WORLD - OFFICIAL CURATED ARCHIVE
 * جميع الصور والبوسترات مأخوذة مباشرة من الأعمال السينمائية والتلفزيونية الرسمية
 * =========================================================================
 */

export const MOVIES_DATA: Movie[] = [
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    originalTitle: 'Dune: Part Two',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
    year: 2024,
    rating: 8.6,
    genre: ['Sci-Fi', 'Action', 'Drama'],
    duration: '2h 46m',
    synopsis: 'يواصل بول أتريدس رحلته الأسطورية بالاتحاد مع تشاني وفريمن للانتقام من المتآمرين الذين دمروا عائلته، في ملحمة بصرية تحبس الأنفاس تجسد صراع السلطة والمصير في صحراء أراكيس.',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    isUpcoming: false,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    spotlightReason: 'ترشيح الأسبوع: إنجاز ملحمي في الخيال العلمي الحديث مع تصميم صوتي وتصوير سينمائي استثنائي ينقل رواية فرانك هربرت ببراعة.'
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    year: 2023,
    rating: 8.9,
    genre: ['Drama', 'Biography', 'History'],
    duration: '3h 00m',
    synopsis: 'سيرة العالم الفيزيائي ج. روبرت أوبنهايمر ودوره المحوري في مشروع مانهاتن لتطوير أول سلاح نووي في التاريخ، والصراع الأخلاقي والسياسي الذي عصف بوجدانه عقب انتهاء الحرب.',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    isUpcoming: false,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    spotlightReason: 'تحفة درامية تاريخية حصدت 7 جوائز أوسكار؛ أداء تمثيلي استثنائي من كيليان ميرفي ومونتاج عبقري يتنقل بين الزمنين.'
  },
  {
    id: 'the-batman',
    title: 'The Batman Part II',
    originalTitle: 'The Batman Part II',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    year: 2026,
    rating: 9.0,
    genre: ['Action', 'Crime', 'Mystery'],
    duration: '2h 50m',
    synopsis: 'يعود بروس واين في مدينة غوثام الغارقة في الفساد والظلام لمواجهة تهديدات جديدة تتحدى عقليته التحقيقية وتكشف أسراراً مدفونة لعائلات المدينة العريقة.',
    trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    releaseDate: '2026-10-02T00:00:00',
    isUpcoming: true,
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Colin Farrell', 'Andy Serkis', 'Jeffrey Wright'],
    spotlightReason: 'العمل الأكثر ترقباً في عالم الجريمة النوار والغموض النفسي، مكمل للرؤية الواقعية المظلمة لمات ريفز.'
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    year: 2014,
    rating: 8.7,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    duration: '2h 49m',
    synopsis: 'فريق من رواد الفضاء والعلماء يسافر عبر ثقب دودي في أقاصي الفضاء بحثاً عن كوكب صالح للحياة لإنقاذ البشرية بعد تدهور البيئة وموارد كوكب الأرض.',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    isUpcoming: false,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    spotlightReason: 'أيقونة سينمائية خالدة بموسيقى هانز زيمر المهيبة، تجمع بين الفيزياء النسبية ورابطة الحب الإنساني العابرة للأبعاد.'
  },
  {
    id: 'avengers-doomsday',
    title: 'Avengers: Doomsday',
    originalTitle: 'Avengers: Doomsday',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    year: 2026,
    rating: 9.2,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    duration: '3h 00m',
    synopsis: 'عودة الممثل روبرت داوني جونيور في دور فيكتور فون دوم (Doctor Doom) في صدام مصيري عبر الأكوان المتعددة يهدد استقرار الوجود بأكمله أمام أبطال الأرض المتبقين.',
    trailerUrl: 'https://www.youtube.com/embed/6ZfuNTqbHE8',
    releaseDate: '2026-05-01T00:00:00',
    isUpcoming: true,
    director: 'Russo Brothers',
    cast: ['Robert Downey Jr.', 'Pedro Pascal', 'Florence Pugh'],
    spotlightReason: 'الحدث الأضخم في سينما الكوميكس لعام 2026 تحت قيادة الأخوين روسو.'
  },
  {
    id: 'severance-s2',
    title: 'Severance (Season 2)',
    originalTitle: 'Severance',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg',
    year: 2024,
    rating: 8.8,
    genre: ['Sci-Fi', 'Thriller', 'Mystery'],
    duration: '2 Seasons',
    synopsis: 'موظفون يخضعون لعملية طبية تفصل ذكريات العمل كلياً عن ذكريات حياتهم الشخصية، لكن سرعان ما تبدأ الحقيقة المظلمة لشركة لومون بالتكشف وسط غموض نفسي مشوق.',
    trailerUrl: 'https://www.youtube.com/embed/xEQP4VVuyrY',
    isUpcoming: false,
    director: 'Ben Stiller',
    cast: ['Adam Scott', 'Patricia Arquette', 'John Turturro', 'Christopher Walken'],
    spotlightReason: 'أذكى مسلسل نفسي في السنوات الأخيرة، حبكة عبقرية وإخراج سينمائي متقن لأدق التفاصيل.'
  },
  {
    id: 'gladiator-2',
    title: 'Gladiator II',
    originalTitle: 'Gladiator II',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    year: 2024,
    rating: 8.2,
    genre: ['Action', 'Adventure', 'Drama'],
    duration: '2h 28m',
    synopsis: 'بعد سنوات من مقتل ماكسيموس، يُجبر لوسيوس على دخول الكولوسيوم للقتال بعد غزو وطنه من قبل أباطرة روما المستبدين، مستعيداً مجد روما المفقود.',
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo',
    isUpcoming: false,
    director: 'Ridley Scott',
    cast: ['Paul Mescal', 'Denzel Washington', 'Pedro Pascal', 'Connie Nielsen'],
    spotlightReason: 'عودة ملحمية لعرين الكولوسيوم برؤية مخرج الملحمة التاريخية الأصلية ريدلي سكوت.'
  },
  {
    id: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    originalTitle: 'Blade Runner 2049',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    year: 2017,
    rating: 8.0,
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    duration: '2h 44m',
    synopsis: 'ضابط شرطة جديد في لوس أنجلوس يكتشف سراً مدفوناً منذ زمن طويل قد يغرق ما تبقى من المجتمع في فوضى عارمة، ويقوده للبحث عن ريك ديكارد المفقود منذ ثلاثة عقود.',
    trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4',
    isUpcoming: false,
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Sylvia Hoeks'],
    spotlightReason: 'أحد أعظم الإنجازات البصرية في تاريخ السينما المعاصرة الحائز على أوسكار التصوير السينمائي للمبدع روجر ديكنز.'
  },
  {
    id: 'spider-man-beyond',
    title: 'Spider-Man: Beyond the Spider-Verse',
    originalTitle: 'Spider-Man: Beyond the Spider-Verse',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    year: 2026,
    rating: 9.1,
    genre: ['Animation', 'Action', 'Sci-Fi'],
    duration: '2h 20m',
    synopsis: 'الفصل الختامي لملحمة مايلز موراليس حيث يخوض مواجهة مصيرية ضد بقعة (Spot) عبر أبعاد متعددة لإنقاذ كل من يحبهم وتحديد هويته كبطل.',
    trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0',
    releaseDate: '2026-12-18T00:00:00',
    isUpcoming: true,
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Daniel Kaluuya'],
    spotlightReason: 'الختام المرتقب لأكثر ثلاثية رسوم متحركة ابتكاراً وثورية في تاريخ هوليوود.'
  },
  {
    id: 'succession',
    title: 'Succession',
    originalTitle: 'Succession',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    year: 2023,
    rating: 8.9,
    genre: ['Drama'],
    duration: '4 Seasons',
    synopsis: 'صراع عائلي وسياسي شرس بين أبناء البطريرك لوغان روي للسيطرة على أكبر إمبراطورية إعلامية وترفيهية عالمية في دراما شكسبيرية حديثة من إنتاج HBO.',
    trailerUrl: 'https://www.youtube.com/embed/5m0G4u8d1h8',
    isUpcoming: false,
    director: 'Jesse Armstrong',
    cast: ['Brian Cox', 'Jeremy Strong', 'Sarah Snook', 'Kieran Culkin', 'Matthew Macfadyen'],
    spotlightReason: 'أفضل سيناريو وحوارات تلفزيونية في القرن الحادي والعشرين؛ ملحمة إنسانية في تشريح الطمع والعلاقات الأسرية.'
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    originalTitle: 'The Dark Knight',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    year: 2008,
    rating: 9.0,
    genre: ['Action', 'Crime', 'Drama'],
    duration: '2h 32m',
    synopsis: 'عندما يُطلق الجوكر العنان للفوضى والذعر في غوثام، يضطر باتمان لتحمل أكبر اختبار لقدرته النفسية والجسدية والأخلاقية لمحاربة الظلم.',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    isUpcoming: false,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman', 'Morgan Freeman'],
    spotlightReason: 'الفيلم المعياري لسينما الجريمة والبطولة الخارقة مع تجسيد هيث ليدجر الأسطوري لشخصية الجوكر.'
  },
  {
    id: 'inception',
    title: 'Inception',
    originalTitle: 'Inception',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    year: 2010,
    rating: 8.8,
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    duration: '2h 28m',
    synopsis: 'لص محترف يسرق أسرار الشركات عبر تقنية مشاركة الأحلام يُمنح فرصة أخيرة لمحو سجله الإجرامي إذا تمكن من زرع فكرة داخل عقل وريث ثري دون أن يكتشف أمره.',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    isUpcoming: false,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy', 'Ken Watanabe'],
    spotlightReason: 'هندسة سينمائية بصرية وسيناريو مذهل يتحدى إدراك المشاهد لمفهوم الواقع والذاكرة.'
  },
  {
    id: 'shogun',
    title: 'Shōgun',
    originalTitle: 'Shōgun',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    year: 2024,
    rating: 8.7,
    genre: ['Adventure', 'Drama', 'History'],
    duration: '10 Episodes',
    synopsis: 'في اليابان الإقطاعية عام 1600، يخوض اللورد توراناغا صراعاً للبقاء ضد أعدائه في مجلس الأوصياء بعد وصول بحار إنجليزي يحمل أسراراً حربية حاسمة ترجح كفة المعركة.',
    trailerUrl: 'https://www.youtube.com/embed/yFN033D5R28',
    isUpcoming: false,
    director: 'Justin Marks',
    cast: ['Hiroyuki Sanada', 'Cosmo Jarvis', 'Anna Sawai', 'Tadanobu Asano'],
    spotlightReason: 'اكتساح تاريخي لجوائز الإيمي لعام 2024 بـ 18 جائزة؛ أروع إنتاج تاريخي ياباني غربي متقن في تفاصيل الأزياء واللغة والتقاليد.'
  },
  {
    id: 'arcane-s2',
    title: 'Arcane',
    originalTitle: 'Arcane',
    posterUrl: 'https://media.themoviedb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    backdropUrl: 'https://media.themoviedb.org/t/p/w1280/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    year: 2024,
    rating: 9.0,
    genre: ['Animation', 'Action', 'Sci-Fi'],
    duration: '2 Seasons',
    synopsis: 'وسط التوتر المتصاعد بين مدينتي بيلتوفر وزون المتناقضتين، تجد شقيقتان نفسيهما في جبهتين متعارضتين في حرب الأفكار والتقنية السحرية والعدالة الاجتماعية.',
    trailerUrl: 'https://www.youtube.com/embed/fXmAurh012s',
    isUpcoming: false,
    director: 'Christian Linke',
    cast: ['Hailee Steinfeld', 'Ella Purnell', 'Kevin Alejandro', 'Katie Leung'],
    spotlightReason: 'معجزة في التحريك الفني والموسيقى والسرد الدرامي المعقد، يعتبره النقاد أحد أعظم الأعمال التلفزيونية في التاريخ الحديث.'
  }
];

import { NewsItem } from '../types';

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'nolan-universal-2026',
    title: 'كريستوفر نولان يحدد موعد تصوير فيلمه السري القادم لعام 2026 بمشاركة مات ديمون',
    summary: 'استوديوهات يونيفرسال بيكتشرز تؤكد رسمياً الموعد السينمائي العالمي للمشروع القادم لأيقونة الإخراج كريستوفر نولان بتقنية IMAX فائقة الدقة.',
    content: `أعلنت يونيفرسال بيكتشرز رسمياً حجز موعد 17 يوليو 2026 لطرح الفيلم السينمائي المرتقب للمخرج الفائز بجوائز الأوسكار كريستوفر نولان، في خطوة تعيد إلى الأذهان المواعيد الصيفية الذهبية التي اعتاد نولان الهيمنة عليها في شباك التذاكر العالمي.

ويشهد هذا المشروع التعاون الثالث بين نولان والنجم مات ديمون بعد النجاح الساحق لفيلمي Interstellar وOppenheimer. ووفقاً للتقارير الواردة من كواليس الصناعة في لوس أنجلوس، يفرض نولان جداراً حديدياً من السرية التامة حول الحبكة والتصنيفات الدرامية للعمل، حيث كُتبت النسخ الورقية الوحيدة للسيناريو على أوراق حمراء مشفرة تُقرأ فقط داخل مكتبه الخاص في هوليوود.

وتشير المصادر المقربة إلى أن نولان سيواصل التزامه الصارم بتصوير الفيلم بالكامل باستخدام أحدث جيل من كاميرات IMAX عيار 70 ملم خفيفة الوزن التي تم تطويرها بالتعاون مع مهندسي شركة IMAX خصيصاً لمشروعه القادم. وتعتبر هذه التقنية ثورة جديدة ستسمح بالتقاط تفاصيل بصرية لا مثيل لها دون اللجوء المفرط إلى المؤثرات الرقمية المصنوعة بالحاسوب.

ومن المتوقع أن تنطلق عمليات التصوير الرئيسية مطلع العام القادم عبر مواقع جغرافية متعددة تتوزع بين المملكة المتحدة والولايات المتحدة وأوروبا، وسط ترقب واسع النطاق من نقاد السينما وعشاق الفن السابع حول العالم لمعرفة ما إذا كان الفيلم سيتناول ثيمة الخيال العلمي أو الجاسوسية المعقدة.`,
    imageUrl: 'https://media.themoviedb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    category: 'إنتاجات جديدة',
    date: '2026-09-24',
    source: 'Cinema World Gazette',
    isHot: true
  },
  {
    id: 'dune-messiah-script',
    title: 'دينيس فيلنوف يُنهي كتابة المسودة شبه النهائية لفيلم Dune: Messiah',
    summary: 'فيلنوف يصرح بأن الجزء الثالث من ملحمة ديون سيكون مغايراً من حيث الإيقاع الفلسفي ويختتم به مسيرة بول أتريدس الأسطورية.',
    content: `في حديث خاص وحصري للصحافة السينمائية العالمية، أعلن المخرج الكندي الرؤيوي دينيس فيلنوف أنه انتهى بالفعل من كتابة المسودة شبه النهائية لسيناريو Dune: Messiah، والذي يمثل الخاتمة الثلاثية الملحمية المقتبسة عن روايات الكاتب فرانك هربرت.

وأوضح فيلنوف أن معالجة رواية Dune Messiah تتطلب نهجاً درامياً ونفسياً مختلفاً جذرياً عن الجزأين السابقين؛ إذ لا يركز العمل الجديد على ملحمة المعارك الميدانية المفتوحة بقدر ما يغوص في العواقب التراجيدية المأساوية للسلطة المطلقة وتداعيات التعصب الديني والحرب الكونية التي اشتعلت باسم بطل الرواية بول أتريدس.

وقال فيلنوف: "في اللحظة التي قرأت فيها رواية هربرت للمرة الأولى في صباي، أدركت أن هذا الكتاب كُتب كتحذير صارم من تأليه القادة وصناعة الرموز الخارقة. مهمتي في الفيلم الثالث هي ترجمة هذا التحذير الفلسفي برؤية بصرية صادمة تمزج بين الصمت والهدوء التآمري والأبعاد الجمالية الكبرى لصحراء أراكيس".

كما أكد فيلنوف أن طاقم الممثلين الأساسي، وفي مقدمتهم تيموثي شالاماي وزيندايا وفلورنس بيو وأنيا تايلور-جوي، سيعودون بأدوار أكثر تعقيداً ونضجاً سينمائياً، مشيراً إلى أنه يأخذ استراحة قصيرة لإعادة شحن طاقته الإبداعية قبل بدء مرحلة ما قبل الإنتاج الرسمية.`,
    imageUrl: 'https://media.themoviedb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg',
    category: 'تطوير سيناريو',
    date: '2026-09-21',
    source: 'The Hollywood Reporter / ترجمة سينما وورلد',
    isHot: true
  },
  {
    id: 'batman-part-two-gotham',
    title: 'مات ريفز: سيناريو The Batman Part II يتعمق أكثر في دهاليز غوثام البوليسية',
    summary: 'المخرج يطمئن الجماهير بأن التعديلات على موعد العرض منحت الفريق مساحة استثنائية لصياغة لغز تحقيقي يفوق الجزء الأول تعقيداً وجرأة.',
    content: `طمأن المخرج مات ريفز جماهير السينما العالمية بشأن مستقبل مشروعه المنتظر The Batman Part II، مؤكداً أن الوقت الإضافي المخصص لكتابة السيناريو منح الفريق مساحة فنية غير مسبوقة لصياغة حبكة بوليسية مظلمة تُبرز الجانب التحقيقي للبطل بروس واين.

وأشار ريفز إلى أن الجزء الثاني سيبدأ مباشرة بعد التداعيات الكارثية للفيضان الذي دمّر البنية التحتية لمدينة غوثام في نهاية الفيلم الأول، حيث تعاني المدينة من فراغ أمني هائل تتصارع فيه عائلات المافيا المنظمة وشخصيات جديدة تخرج من أزقة الفوضى، مما يدفع باتمان إلى حافة الاختبار الأخلاقي والذهني.

وأضاف المخرج: "أردنا أن نحافظ على روح سينما السبعينيات المستقلة (Film Noir) المستوحاة من أفلام مثل Chinatown وTaxi Driver. لن نغرق القصة في فوضى المؤثرات الخيالية، بل سنظل متجذرين في واقعية الفساد الإنساني والصراع النفسي داخل روح شخصية باتمان التي يجسدها روبرت باتينسون ببراعة فائقة".

ويُنتظر أن تبدأ كاميرات التصوير بالدوران في استوديوهات ليفينغستون في لندن أواخر العام الجاري، مع ترجيح انضمام شخصيات كلاسيكية من أرشيف دي سي كوميكس بتناول واقعي وفلسفي يعكس طابع ريفز الإخراجي الفريد.`,
    imageUrl: 'https://media.themoviedb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    category: 'كواليس الإنتاج',
    date: '2026-09-18',
    source: 'Empire Magazine',
    isHot: false
  }
];
