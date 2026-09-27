import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-6 text-center text-right selection:bg-[#E50914]/30">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#121622] border border-[#1E2536] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1A2030] border border-[#252E40] text-[#E50914] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h2 className="text-xl font-bold text-white">
              حدث خطأ مؤقت في تحميل الصفحة
            </h2>
            
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              يرجى إعادة تحميل الصفحة لتحديث البيانات والاتصال بالخادم.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors mt-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة تحميل الصفحة</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
