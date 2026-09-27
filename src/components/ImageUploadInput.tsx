import { useState, useRef } from 'react';
import { Upload, Link2, X, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  aspectRatioHint?: 'poster' | 'backdrop' | 'news';
}

/**
 * Optimizes an image file and converts it to a clean base64 data URL string
 * to store directly in Firestore document fields without requiring Cloud Storage buckets.
 */
function fileToBase64(file: File, maxWidth = 1000, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error('Failed to read file'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  required = false,
  aspectRatioHint = 'poster'
}: ImageUploadInputProps) {
  // Determine if the current value is base64 code or a regular web URL
  const isBase64 = value?.startsWith('data:image/');
  const [mode, setMode] = useState<'upload' | 'url'>(() => (isBase64 || !value ? 'upload' : 'url'));
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if image
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
      return;
    }

    try {
      setIsProcessing(true);
      setImageError(false);
      // Determine max dimension based on aspect ratio
      const maxDim = aspectRatioHint === 'backdrop' ? 1200 : 900;
      const base64Code = await fileToBase64(file, maxDim, 0.82);
      onChange(base64Code);
    } catch (err) {
      console.error('Failed to convert image to base64:', err);
      alert('حدث خطأ أثناء قراءة الصورة من الاستوديو.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setImageError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Estimate size in KB if base64
  const estimatedSizeKB = isBase64 ? Math.round((value.length * 3) / 4 / 1024) : null;

  return (
    <div className="space-y-2 text-right">
      {/* Header Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#CBD5E1]">{label}</span>
          {required && <span className="text-[#E50914]">*</span>}
        </div>

        {/* Tab toggle: Studio Upload vs URL */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#0C1018] border border-[#1E2536] text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              mode === 'upload'
                ? 'bg-[#E50914] text-white font-medium shadow-xs'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>من الاستوديو (كود)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              mode === 'url'
                ? 'bg-[#E50914] text-white font-medium shadow-xs'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>رابط مباشر (URL)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Upload from Gallery / Studio */}
      {mode === 'upload' ? (
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!value ? (
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-[#2A344A] bg-[#0E121A] hover:bg-[#141A26] hover:border-[#E50914] transition-all cursor-pointer group"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2 text-xs text-[#E50914]">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري تحويل وضغط الصورة ككود...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#182030] flex items-center justify-center text-[#94A3B8] group-hover:text-[#E50914] group-hover:scale-110 transition-all mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">
                    اضغط هنا لاختيار صورة من استوديو الجهاز
                  </span>
                  <span className="text-[11px] text-[#64748B] mt-0.5">
                    تُحفظ ككود Base64 في فايربيس بدون الحاجة لخدمات تخزين خارجية
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0E121A] border border-[#1E2536]">
              {/* Preview Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-[#222B3D]">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info & Replace/Remove */}
              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>تم رفع الصورة وتوليد الكود بنجاح</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5 truncate">
                  {isBase64 ? `كود Base64 مدمج (~${estimatedSizeKB} KB)` : 'رابط خارجي محفوظ'}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-[#38BDF8] hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>تغيير الصورة</span>
                  </button>
                  <span className="text-[#334155]">·</span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <div className="space-y-2">
          <div className="relative flex items-center">
            <input
              type="url"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setImageError(false);
              }}
              placeholder="https://images.unsplash.com/... أو رابط الصورة المباشر"
              className="w-full px-3 py-2.5 rounded-lg bg-[#0E121A] border border-[#1E2536] text-white text-xs placeholder-[#475569] focus:outline-none focus:border-[#E50914]"
              required={required && !value}
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute left-2.5 p-1 text-[#64748B] hover:text-white"
                title="مسح"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* URL Image Live Preview */}
          {value && (
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0E121A] border border-[#1E2536]">
              <div className="relative w-12 h-12 rounded overflow-hidden bg-black shrink-0 border border-[#202738]">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center text-rose-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                ) : (
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="text-[11px] truncate flex-1 text-right">
                {imageError ? (
                  <span className="text-rose-400 font-medium">الرابط غير صحيح أو الصورة غير قابلة للعرض</span>
                ) : (
                  <span className="text-[#94A3B8] font-mono truncate block">{value}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
