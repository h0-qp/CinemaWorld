import { useEffect, useRef } from 'react';
import { ExternalLink, Sparkles, Megaphone } from 'lucide-react';
import { AdSettings } from '../types';

interface AdBannerProps {
  placement: 'header' | 'feed' | 'mid' | 'footer';
  settings?: AdSettings;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdBanner({ placement, settings, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  // If ads are disabled globally
  if (!settings || !settings.enabled) {
    return null;
  }

  const isAdSenseActive = (settings.networkType === 'adsense' || settings.networkType === 'both') && !!settings.adsensePublisherId;
  const slotId = 
    placement === 'header' ? settings.adsenseHeaderSlotId :
    placement === 'feed' ? settings.adsenseFeedSlotId :
    placement === 'mid' ? settings.adsenseMidSlotId :
    settings.adsenseFooterSlotId;

  // Load Google AdSense Script if Publisher ID exists
  useEffect(() => {
    if (isAdSenseActive && settings.adsensePublisherId) {
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsensePublisherId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Try pushing adsbygoogle
      try {
        if (typeof window !== 'undefined' && slotId && adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        // Silently catch adblocker / duplicate push exceptions
      }
    }
  }, [isAdSenseActive, settings.adsensePublisherId, slotId]);

  // Find custom banner for this placement
  const customBanner = settings.customBanners?.find(b => b.placement === placement && b.isActive);

  // If set strictly to AdSense and slot is defined
  if (settings.networkType === 'adsense' && isAdSenseActive && slotId) {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 ${className}`}>
        <div className="relative p-3 rounded-2xl bg-[#0E121A] border border-[#1E2536] overflow-hidden text-center">
          <div className="text-[10px] text-zinc-500 font-mono mb-1.5 flex items-center justify-center gap-1">
            <Megaphone className="w-3 h-3 text-[#E50914]" />
            <span>إعلان مدعوم (Google AdSense)</span>
          </div>
          <div className="overflow-hidden flex justify-center items-center min-h-[90px]">
            <ins
              ref={adRef}
              className="adsbygoogle block w-full"
              style={{ display: 'block' }}
              data-ad-client={settings.adsensePublisherId}
              data-ad-slot={slotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>
    );
  }

  // If no custom banner exists and AdSense is not configured, don't show empty block
  if (!customBanner) {
    return null;
  }

  // RENDER CUSTOM CINEMATIC SPONSOR BANNER (Responsive & Polished)
  if (placement === 'header') {
    return (
      <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ${className}`}>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#121622] via-[#0E121A] to-[#151A26] border border-[#1E2536] shadow-xl group hover:border-[#E50914]/40 transition-all duration-300">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
              {customBanner.imageUrl && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#252E40] shadow-md relative">
                  <img
                    src={customBanner.imageUrl}
                    alt={customBanner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              )}

              <div className="space-y-1 text-right flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {customBanner.badgeText || 'إعلان رسمي'}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {customBanner.sponsorName}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {customBanner.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl leading-relaxed">
                  {customBanner.subtitle}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto flex items-center justify-end shrink-0">
              <a
                href={customBanner.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{customBanner.buttonText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (placement === 'feed') {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ${className}`}>
        <div className="relative rounded-2xl overflow-hidden bg-[#10141F] border border-[#1E2536] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 hover:border-amber-500/30 transition-all shadow-lg">
          {customBanner.imageUrl && (
            <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0 border border-[#252E40]">
              <img
                src={customBanner.imageUrl}
                alt={customBanner.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 text-right space-y-1.5 w-full">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                {customBanner.badgeText || 'شريك سينمائي'}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                {customBanner.sponsorName}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {customBanner.title}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {customBanner.subtitle}
            </p>
          </div>
          <div className="w-full sm:w-auto shrink-0">
            <a
              href={customBanner.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#1F2637] hover:bg-[#2A3449] border border-[#2E384D] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{customBanner.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (placement === 'mid') {
    return (
      <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 ${className}`}>
        <div className="relative rounded-3xl overflow-hidden border border-[#1E2536] min-h-[200px] flex items-center">
          {/* Background image with dramatic overlay */}
          {customBanner.imageUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={customBanner.imageUrl}
                alt={customBanner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
            </div>
          )}

          <div className="relative z-10 p-6 sm:p-10 max-w-2xl text-right space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>{customBanner.badgeText || 'عرض سينمائي حصري'}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300 font-mono">{customBanner.sponsorName}</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide">
              {customBanner.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
              {customBanner.subtitle}
            </p>

            <div className="pt-2">
              <a
                href={customBanner.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-bold shadow-xl shadow-[#E50914]/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>{customBanner.buttonText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Footer placement
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 ${className}`}>
      <div className="rounded-xl bg-[#0E121A] border border-[#1E2536] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
            {customBanner.badgeText || 'إعلان'}
          </span>
          <div>
            <h5 className="text-xs font-bold text-white">{customBanner.title}</h5>
            <p className="text-[11px] text-zinc-400">{customBanner.subtitle}</p>
          </div>
        </div>
        <a
          href={customBanner.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-lg bg-[#1A2030] hover:bg-[#252E40] text-zinc-200 text-xs font-medium border border-[#252E40] transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>{customBanner.buttonText}</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
      </div>
    </div>
  );
}
