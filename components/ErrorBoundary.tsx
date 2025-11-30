
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-900">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Oups, une erreur est survenue</h1>
            <p className="text-slate-500 text-center mb-6">L'application a rencontré un problème inattendu.</p>
            
            <div className="bg-slate-900 rounded-xl p-4 overflow-auto max-h-48 mb-6">
              <code className="text-red-400 text-xs font-mono block">
                {this.state.error && this.state.error.toString()}
              </code>
              {this.state.errorInfo && (
                <code className="text-slate-500 text-[10px] font-mono block mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </code>
              )}
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
