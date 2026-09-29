import { useState, useEffect } from 'react';
import { CheckCircle2, Share2 } from 'lucide-react';

export default function ShareToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail || 'تمت العملية بنجاح');
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('cinemaworld-toast', handleToast);
    return () => window.removeEventListener('cinemaworld-toast', handleToast);
  }, []);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#141A26]/95 backdrop-blur-md border border-[#E50914] text-white text-xs font-semibold shadow-2xl animate-bounce">
      <div className="w-7 h-7 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shrink-0">
        <Share2 className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
