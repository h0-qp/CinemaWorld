import { useState } from 'react';
import { Award, RotateCcw, Share2, Check, X, ArrowLeft } from 'lucide-react';
import { TriviaQuestion } from '../types';

interface TriviaQuizProps {
  questions: TriviaQuestion[];
}

export default function TriviaQuiz({ questions }: TriviaQuizProps) {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQ = questions[currentIndex];

  const handleStart = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const getTierInfo = (finalScore: number, total: number) => {
    const percentage = (finalScore / total) * 100;
    if (percentage === 100) {
      return {
        title: 'خبير سينمائي أكاديمي (MASTER OF CINEMA)',
        desc: 'إحاطة شاملة ومبهرة بدقائق الأعمال العالمية، وفهم سينمائي يضاهي نقاد المهرجانات الكبرى.'
      };
    } else if (percentage >= 70) {
      return {
        title: 'ناقد سينمائي متذوق (SENIOR CINEPHILE)',
        desc: 'ثقافة سينمائية رفيعة ومعرفة متينة بأسرار الإخراج والحبكات المعقدة.'
      };
    } else if (percentage >= 40) {
      return {
        title: 'مشاهد شغوف (AVID FILMGOER)',
        desc: 'مستوى واعد وشغف حقيقي بالفن السابع، ندعوك لتعميق متابعة تحليلاتنا الدورية.'
      };
    } else {
      return {
        title: 'مستكشف لعوالم الفن السابع (FILM NOVICE)',
        desc: 'بداية الرحلة لاكتشاف روائع الشاشة الفضية، تابع قراءاتنا وقناة تيليغرام لاكتشاف المزيد.'
      };
    }
  };

  const handleShare = () => {
    const text = `أحرزتُ ${score} من أصل ${questions.length} في اختبار الثقافة السينمائية لمنصة Cinema World.\nاختبر معلوماتك: https://cinemaworld.info`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const optionLabels = ['أ', 'ب', 'ج', 'د'];

  return (
    <section id="trivia" className="py-20 bg-[#0E0E0E] border-b border-[#222222]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-[#C5A059] uppercase tracking-[0.2em] mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>CINEMATOGRAPHIC APPRECIATION SOCIETY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#F5F5F3]">
            امتحان الثقافة السينمائية
          </h2>
          <p className="text-xs sm:text-sm text-[#999990] mt-1 font-serif">
            تقييم معرفي دقيق يختبر عمق فهمك للتفاصيل الإخراجية والأعمال الخالدة.
          </p>
        </div>

        {/* Paper / Docket Style Quiz Frame */}
        <div className="border border-[#282828] bg-[#111111] p-6 sm:p-10 shadow-xl text-right">
          
          {/* Start Screen */}
          {gameState === 'start' && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 border border-[#C5A059]/40 flex items-center justify-center mx-auto bg-[#0A0A0A]">
                <Award className="w-7 h-7 text-[#C5A059]" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-cinzel font-bold text-white">بدء الاختبار المعرفي</h3>
                <p className="text-xs sm:text-sm text-[#9E9E96] font-serif leading-relaxed">
                  يحتوي الاختبار على {questions.length} أسئلة منتقاة من تحف الخيال العلمي والدراما العالمية مع تحليل نقدي لكل إجابة.
                </p>
              </div>
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B0B0B] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                بدء الامتحان السينمائي
              </button>
            </div>
          )}

          {/* Playing Screen */}
          {gameState === 'playing' && (
            <div className="space-y-6">
              
              {/* Progress Bar & Indicators */}
              <div className="flex items-center justify-between text-xs font-mono text-[#888880] pb-3 border-b border-[#202020]">
                <span>QUESTION {currentIndex + 1} OF {questions.length}</span>
                <span className="text-[#C5A059]">SCORE: {score}</span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#F3F4F6] leading-relaxed pt-2">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, index) => {
                  let borderClass = 'border-[#262626] bg-[#0E0E0E] text-[#D0D0CB] hover:border-[#C5A059]/60';
                  
                  if (selectedOption !== null) {
                    if (index === currentQ.correctIndex) {
                      borderClass = 'border-[#3E7B44] bg-[#0E1F12] text-[#86EFAC] font-semibold';
                    } else if (index === selectedOption) {
                      borderClass = 'border-[#991B1B] bg-[#220B0B] text-[#FCA5A5]';
                    } else {
                      borderClass = 'border-[#1C1C1C] bg-[#0A0A0A] text-[#555] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      disabled={selectedOption !== null}
                      className={`w-full text-right p-3.5 border transition-all text-xs sm:text-sm flex items-center justify-between ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 border border-[#333] flex items-center justify-center font-mono text-[11px] text-[#A1A19A]">
                          {optionLabels[index]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {selectedOption !== null && index === currentQ.correctIndex && (
                        <Check className="w-4 h-4 text-[#86EFAC] shrink-0" />
                      )}
                      {selectedOption !== null && index === selectedOption && index !== currentQ.correctIndex && (
                        <X className="w-4 h-4 text-[#FCA5A5] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note & Next Button */}
              {showExplanation && (
                <div className="p-4 bg-[#0A0A0A] border border-[#222222] border-r-2 border-r-[#C5A059] text-xs text-[#B0B0AA] space-y-3 mt-4">
                  <div>
                    <span className="font-mono text-[#C5A059] font-bold block mb-1">
                      NOTE FROM THE ARCHIVIST:
                    </span>
                    <p className="font-serif leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2 border-t border-[#1C1C1C]">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B0B0B] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>{currentIndex + 1 < questions.length ? 'السؤال التالي' : 'عرض التقرير النهائي'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Result Certificate Screen */}
          {gameState === 'result' && (() => {
            const tier = getTierInfo(score, questions.length);
            return (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 border border-[#C5A059] flex items-center justify-center mx-auto bg-[#0C0C0C]">
                  <Award className="w-8 h-8 text-[#C5A059]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059]">
                    EXAMINATION REPORT
                  </span>
                  <h3 className="text-2xl font-cinzel font-bold text-white">
                    {score} من {questions.length} إجابات صحيحة
                  </h3>
                  <div className="inline-block px-3 py-1 border border-[#C5A059]/40 text-[#E2C378] font-mono text-xs mt-2 bg-[#0C0C0C]">
                    {tier.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#A8A8A2] max-w-md mx-auto pt-2 font-serif leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-[#1E1E1E]">
                  <button
                    onClick={handleStart}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#2B2B2B] text-xs font-mono tracking-wider text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>إعادة الامتحان</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B0B0B] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'تم نسخ النتيجة! ✓' : 'مشاركة النتيجة'}</span>
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

      </div>
    </section>
  );
}
