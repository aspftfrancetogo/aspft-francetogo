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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check session on mount
    if (currentView !== View.PUBLIC) {
      fetch('/api/auth/verify', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setIsAuthenticated(data.authenticated || false);
          setIsCheckingAuth(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, [currentView]);

  // If public view, show public site
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

  // Check authentication for admin views
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Vérification...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} onCancel={() => setCurrentView(View.PUBLIC)} />;
  }

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
