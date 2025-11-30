import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Info, Github } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            onLogin();
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };

    checkAuth();
  }, [onLogin]);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    window.location.href = '/api/auth/login';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-8 bg-blue-600 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Espace Administration</h2>
          <p className="text-blue-100 text-sm mt-1">Accès sécurisé ASPFT</p>
        </div>

        <div className="p-8 flex-1">
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 text-blue-800 text-xs">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Authentification GitHub OAuth</strong><br/>
              Seuls les comptes autorisés peuvent accéder à cette zone.
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className={`w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Github className="w-5 h-5" />
                Se connecter avec GitHub
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <button 
              onClick={onCancel}
              className="text-sm text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-4"
            >
              Retour au site public
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
