import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Heart, MessageSquare, Handshake, FolderOpen, Bot, Globe, LogOut, Plane, Calculator, Megaphone, Users } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { view: View.DONATIONS, label: 'Dons', icon: Heart },
    { view: View.CALCULATOR, label: 'Coût Forage', icon: Calculator },
    { view: View.MISSION, label: 'Mission 2026', icon: Plane },
    { view: View.COMMUNICATION, label: 'Communication', icon: Megaphone },
    { view: View.VOLUNTEERS, label: 'Bénévoles', icon: Users },
    { view: View.CONTACTS, label: 'Contacts', icon: MessageSquare },
    { view: View.PARTNERS, label: 'Partenaires', icon: Handshake },
    { view: View.DOCUMENTS, label: 'Documents', icon: FolderOpen },
    { view: View.ASSISTANT, label: 'Assistant IA', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl flex-shrink-0">
      <div className="p-6 border-b border-slate-700 flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-3 bg-white rounded-full p-1 shadow-lg overflow-hidden">
            {/* LOGO INTEGRATION: Assuming logo.png is in public folder */}
            <img src="/logo.png" alt="ASPFT Logo" className="w-full h-full object-contain" onError={(e) => {
                // Fallback if image fails
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=ASPFT';
            }}/>
        </div>
        <h1 className="text-lg font-bold">ASPFT Admin</h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">Amitié & Solidarité</p>
      </div>

      <div className="p-4 pb-0">
        <button
          onClick={() => setCurrentView(View.PUBLIC)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border border-slate-700 hover:bg-slate-800 ${currentView === View.PUBLIC ? 'bg-slate-800 text-blue-400' : 'text-slate-300'}`}
        >
          <Globe className="w-5 h-5" />
          <span className="font-medium">Voir le Site Public</span>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-500 px-4 py-2 uppercase tracking-wider">Gestion Globale</div>
        {navItems.slice(0, 3).map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
              currentView === item.view
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.view ? 'animate-pulse' : ''}`} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
        
        <div className="text-[10px] font-bold text-slate-500 px-4 py-2 uppercase tracking-wider mt-4">Opérations</div>
        {navItems.slice(3).map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
              currentView === item.view
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.view ? 'animate-pulse' : ''}`} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;