import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Heart, MessageSquare, Handshake, TrendingUp, MoreVertical, Bell, CheckCircle, Clock, AlertCircle, FileText, Download } from 'lucide-react';
import { MOCK_DONATIONS, MOCK_CONTACTS, MOCK_PARTNERS } from '../constants';
import { View, Donation, ContactMessage, Partner } from '../types';
import { generateTaxReceipt } from '../utils/pdfGenerator'; // IMPORT DU GENERATEUR

const data = [
  { name: 'Jan', amount: 250 },
  { name: 'Feb', amount: 500 },
  { name: 'Mar', amount: 750 },
  { name: 'Apr', amount: 1200 },
  { name: 'May', amount: 1800 },
  { name: 'Jun', amount: 2200 },
];

const StatCard = ({ title, value, subtext, icon: Icon, gradient }: any) => (
  <div className={`p-6 rounded-2xl shadow-lg text-white ${gradient} relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
    <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-32 h-32" />
    </div>
    <div className="relative z-10">
      <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <div className="flex items-baseline gap-2 mt-2">
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <p className="text-white/70 text-sm mt-1">{subtext}</p>
    </div>
  </div>
);

interface DashboardProps {
  currentTab?: View;
}

const Dashboard: React.FC<DashboardProps> = ({ currentTab = View.DASHBOARD }) => {
  const [activeTab, setActiveTab] = useState<View>(currentTab);

  React.useEffect(() => {
    if (currentTab !== View.DASHBOARD) {
        setActiveTab(currentTab);
    }
  }, [currentTab]);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total des dons" 
          value="2 200 €" 
          subtext="4 donateur(s)"
          icon={Heart} 
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600" 
        />
        <StatCard 
          title="Messages Contact" 
          value={MOCK_CONTACTS.filter(c => c.status === 'Nouveau').length.toString()} 
          subtext={`${MOCK_CONTACTS.length} total`}
          icon={MessageSquare} 
          gradient="bg-gradient-to-br from-purple-500 to-pink-500" 
        />
        <StatCard 
          title="Partenaires Actifs" 
          value={MOCK_PARTNERS.filter(p => p.status === 'Actif').length.toString()} 
          subtext={`${MOCK_PARTNERS.length} total`}
          icon={Handshake} 
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500" 
        />
        <StatCard 
          title="Objectif 2025" 
          value="6.3%" 
          subtext="35 000 € visés"
          icon={TrendingUp} 
          gradient="bg-gradient-to-br from-emerald-500 to-green-500" 
        />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Évolution des Dons</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderDonations = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Historique des Dons</h3>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            + Ajouter un don manuel
            </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nom</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Montant</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Méthode</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Reçu Fiscal</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_DONATIONS.map((don) => (
            <tr key={don.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-600">{new Date(don.date).toLocaleDateString('fr-FR')}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">{don.name}</div>
                <div className="text-xs text-slate-500">{don.email || 'Email non fourni'}</div>
              </td>
              <td className="px-6 py-4 font-bold text-green-600">{don.amount.toFixed(2)} €</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-xs">{don.method}</span>
              </td>
              <td className="px-6 py-4 text-sm">
                {don.receiptSent ? (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded w-fit text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> Envoyé
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit text-xs font-medium">
                        <Clock className="w-3 h-3" /> En attente
                    </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                  {/* GENERATE PDF BUTTON */}
                  <button 
                    onClick={() => generateTaxReceipt(don)}
                    className="text-slate-400 hover:text-blue-600 transition-colors" 
                    title="Télécharger PDF Officiel"
                  >
                      <FileText className="w-5 h-5" />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContacts = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Messages de Contact</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">De</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sujet</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Statut</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Message</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_CONTACTS.map((contact) => (
            <tr key={contact.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm text-slate-600">{new Date(contact.date).toLocaleDateString('fr-FR')}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-slate-800">{contact.name}</div>
                <div className="text-xs text-slate-500">{contact.email}</div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{contact.subject}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit
                  ${contact.status === 'Nouveau' ? 'bg-amber-100 text-amber-700' : 
                    contact.status === 'Traité' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {contact.status === 'Nouveau' && <AlertCircle className="w-3 h-3" />}
                  {contact.status === 'Traité' && <CheckCircle className="w-3 h-3" />}
                  {contact.status === 'En cours' && <Clock className="w-3 h-3" />}
                  {contact.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">{contact.message}</td>
              <td className="px-6 py-4 text-right">
                <select className="text-sm border-slate-200 rounded-lg p-1 bg-white border cursor-pointer hover:border-blue-400 focus:outline-none">
                  <option>Action</option>
                  <option>Marquer Traité</option>
                  <option>Répondre</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPartners = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Partenaires</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Ajouter
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nom</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Note</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Statut</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Lien</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_PARTNERS.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{p.type}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{p.note}</td>
              <td className="px-6 py-4">
                 <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${p.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                    Visiter
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-8 h-full overflow-y-auto space-y-8 bg-slate-50">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {activeTab === View.DASHBOARD && 'Dashboard'}
            {activeTab === View.DONATIONS && 'Gestion des Dons'}
            {activeTab === View.CONTACTS && 'Messagerie'}
            {activeTab === View.PARTNERS && 'Partenaires'}
          </h2>
          <p className="text-slate-500 mt-1">Administration ASPFT</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full border border-slate-200 shadow-sm">
             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">T</div>
            <span className="font-semibold text-sm text-slate-700">Toni Cat.</span>
          </div>
        </div>
      </div>

      {activeTab === View.DASHBOARD && renderOverview()}
      {activeTab === View.DONATIONS && renderDonations()}
      {activeTab === View.CONTACTS && renderContacts()}
      {activeTab === View.PARTNERS && renderPartners()}
    </div>
  );
};

export default Dashboard;