
import React, { useState } from 'react';
import { Calendar, CheckSquare, FileText, PenTool, Plus, Clock, AlertTriangle, CheckCircle, Plane, User, MapPin } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants';
import { MissionTask, MissionEvent, BlogPost } from '../types';

// Local Mock Data for Mission Control
const MOCK_TASKS: MissionTask[] = [
  { id: '1', title: 'Réserver billets avion', assignee: 'Toni Cat.', dueDate: '2025-12-15', status: 'todo', priority: 'high' },
  { id: '2', title: 'Vaccins Fièvre Jaune', assignee: 'All Team', dueDate: '2026-02-01', status: 'in-progress', priority: 'high' },
  { id: '3', title: 'Acheter matériel scolaire', assignee: 'Sarah Wilson', dueDate: '2026-03-01', status: 'todo', priority: 'medium' },
];

const MOCK_EVENTS: MissionEvent[] = [
  { id: '1', title: 'Départ Paris CDG', date: '2026-05-10T08:00', location: 'CDG T2E', type: 'travel' },
  { id: '2', title: 'Arrivée Lomé', date: '2026-05-10T16:00', location: 'Lomé Airport', type: 'travel' },
  { id: '3', title: 'Réunion Mairie Tabligbo', date: '2026-05-12T10:00', location: 'Mairie', type: 'meeting' },
];

const MOCK_POSTS: BlogPost[] = [
  { id: '1', title: 'Préparatifs du voyage', author: 'Toni Cat.', date: '2025-10-01', status: 'published', excerpt: 'Nous avons finalisé la liste des participants pour la mission 2026.', category: 'News' },
];

const MissionControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'calendar' | 'blog'>('overview');

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-green-600 bg-green-50 border-green-100';
    }
  };

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Plane className="w-8 h-8 text-blue-600" />
            Mission Togo 2026
          </h2>
          <p className="text-slate-500 mt-1">Gestion opérationnelle du voyage (Mai 2026)</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {[
            { id: 'overview', icon: CheckSquare, label: 'Vue d\'ensemble' },
            { id: 'tasks', icon: CheckSquare, label: 'Tâches' },
            { id: 'calendar', icon: Calendar, label: 'Planning' },
            { id: 'blog', icon: PenTool, label: 'Journal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tasks Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-500" /> Tâches Prioritaires
              </h3>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_TASKS.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <button className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 bg-white'}`}>
                      {task.status === 'done' && <CheckCircle className="w-3 h-3" />}
                    </button>
                    <div>
                      <div className={`font-medium ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><User className="w-3 h-3"/> {task.assignee}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-600"><Clock className="w-3 h-3"/> {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Docs Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" /> Documents de Voyage
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-400 cursor-pointer transition-colors group">
                <div className="flex items-start justify-between mb-2">
                   <div className="p-2 bg-red-50 rounded-lg text-red-500 group-hover:bg-red-100">
                     <FileText className="w-6 h-6" />
                   </div>
                   <span className="text-xs font-mono text-slate-400">PDF</span>
                </div>
                <div className="font-medium text-slate-700 text-sm">Passeports_Equipe.pdf</div>
                <div className="text-xs text-slate-400 mt-1">Sécurisé • 2.4 MB</div>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-400 cursor-pointer transition-colors group">
                <div className="flex items-start justify-between mb-2">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-500 group-hover:bg-blue-100">
                     <FileText className="w-6 h-6" />
                   </div>
                   <span className="text-xs font-mono text-slate-400">DOC</span>
                </div>
                <div className="font-medium text-slate-700 text-sm">Plan_Vol_AirFrance.doc</div>
                <div className="text-xs text-slate-400 mt-1">Misa à jour hier</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Schedule & Team */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" /> Prochains RDV
             </h3>
             <div className="relative border-l-2 border-slate-100 space-y-6 pl-6 ml-3">
               {MOCK_EVENTS.map(event => (
                 <div key={event.id} className="relative">
                   <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm bg-blue-500"></div>
                   <div className="text-xs font-bold text-slate-400 mb-1">
                     {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                   <div className="font-medium text-slate-800 text-sm">{event.title}</div>
                   <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                     <MapPin className="w-3 h-3" /> {event.location}
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-amber-400" /> Alertes Voyage
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                Visa Togo à demander avant le 15 Mars
              </li>
               <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                Rappel vaccin Fièvre Jaune pour Sarah
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
