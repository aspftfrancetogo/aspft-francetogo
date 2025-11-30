import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Documents from './components/Documents';
import Assistant from './components/Assistant';
import PublicSite from './components/PublicSite';
import Login from './components/Login';
import MissionControl from './components/MissionControl';
import WellCalculator from './components/WellCalculator'; 
import Communication from './components/Communication';
import Volunteers from './components/Volunteers';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PUBLIC);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Check URL params on mount and on URL change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('authenticated') === 'true') {
      // User just came back from GitHub OAuth
      setIsCheckingAuth(true);
      setCurrentView(View.DASHBOARD);
      
      // Clear URL param
      window.history.replaceState({}, '', window.location.pathname);
      
      // Verify session
      fetch('/api/auth/verify', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          console.log('Auth verification:', data);
          setIsAuthenticated(data.authenticated || false);
          setIsCheckingAuth(false);
        })
        .catch(err => {
          console.error('Auth error:', err);
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        });
    }
  }, []);

  // Check auth when switching to admin views
  useEffect(() => {
    if (currentView !== View.PUBLIC && !isAuthenticated && !isCheckingAuth) {
      setIsCheckingAuth(true);
      fetch('/api/auth/verify', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          console.log('Session check:', data);
          setIsAuthenticated(data.authenticated || false);
          setIsCheckingAuth(false);
        })
        .catch(err => {
          console.error('Session check error:', err);
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        });
    }
  }, [currentView, isAuthenticated, isCheckingAuth]);

  // Public view
  if (currentView === View.PUBLIC) {
    return (
      <div className="relative">
        <PublicSite />
        <button 
          onClick={() => setCurrentView(View.DASHBOARD)}
          className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center group"
          title="Accès Admin"
        >
          <span className="text-xs font-bold group-hover:hidden">ADMIN</span>
          <span className="hidden group-hover:block text-xs font-bold">LOGIN</span>
        </button>
      </div>
    );
  }

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg">Vérification de la session...</div>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} onCancel={() => setCurrentView(View.PUBLIC)} />;
  }

  // Authenticated - show admin
  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
      case View.DONATIONS:
      case View.CONTACTS:
      case View.PARTNERS:
        return <Dashboard currentTab={currentView} />;
      case View.DOCUMENTS:
        return <Documents />;
      case View.ASSISTANT:
        return <Assistant />;
      case View.MISSION:
        return <MissionControl />;
      case View.CALCULATOR:
        return <WellCalculator />;
      case View.COMMUNICATION:
        return <Communication />;
      case View.VOLUNTEERS:
        return <Volunteers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
