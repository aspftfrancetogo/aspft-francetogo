import React, { useState } from 'react';
import { Users, Search, Filter, Star, MapPin, Award } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants';
import { Member } from '../types';

const Volunteers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  // Extract all unique skills
  const allSkills = Array.from(new Set(MOCK_MEMBERS.flatMap(m => m.skills)));

  const filteredMembers = MOCK_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill ? member.skills.includes(selectedSkill) : true;
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          Annuaire des Bénévoles
        </h2>
        <p className="text-slate-500 mt-1">Trouvez les compétences clés pour vos missions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtres
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom, rôle..." 
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Compétences</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedSkill('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSkill === '' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Tout
                </button>
                {allSkills.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedSkill === skill ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex gap-4 hover:shadow-md transition-shadow">
              <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover bg-slate-100" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{member.name}</h4>
                    <p className="text-slate-500 text-sm">{member.role}</p>
                  </div>
                  {member.availability === 'High' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> Dispo
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-400 mt-1 mb-3">
                  <MapPin className="w-3 h-3" /> {member.location || 'France'}
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteers;