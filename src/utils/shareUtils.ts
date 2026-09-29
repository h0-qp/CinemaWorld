/**
 * Share utility for movies and news articles with fallback to clipboard & toast
 */

export function triggerToast(message: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cinemaworld-toast', { detail: message }));
  }
}

export async function shareContent(options: {
  title: string;
  text?: string;
  type: 'movie' | 'news';
  id: string;
}): Promise<{ status: 'shared' | 'copied' | 'failed'; url: string }> {
  const url = new URL(window.location.origin + window.location.pathname);
  if (options.type === 'movie') {
    url.searchParams.set('movie', options.id);
  } else {
    url.searchParams.set('news', options.id);
  }
  const shareUrl = url.toString();

  // Try Native Share API first (on mobile/supported browsers)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text ? `${options.title} - ${options.text.slice(0, 90)}...` : options.title,
        url: shareUrl,
      });
      return { status: 'shared', url: shareUrl };
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // User closed the share sheet
        return { status: 'shared', url: shareUrl };
      }
      // If error (e.g. permission or unsupported schema), fall through to clipboard
    }
  }

  // Fallback to Clipboard API
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareUrl);
      triggerToast('تم نسخ الرابط المباشر للمشاركة بنجاح! 📋');
      return { status: 'copied', url: shareUrl };
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      triggerToast('تم نسخ الرابط المباشر للمشاركة بنجاح! 📋');
      return { status: 'copied', url: shareUrl };
    }
  } catch (e) {
    console.error('Clipboard copy failed:', e);
    triggerToast('تعذر نسخ الرابط تلقائياً');
    return { status: 'failed', url: shareUrl };
  }
}
