import React from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Search, Plus, Mail, MoreHorizontal, UserCheck, UserX, Star } from 'lucide-react';

const Members: React.FC = () => {
  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold text-slate-800">Members</h2>
           <p className="text-slate-500 mt-1">Manage access and roles for your association.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all font-medium">
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search members by name, role or email..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none hover:bg-slate-50 cursor-pointer">
              <option>All Roles</option>
              <option>President</option>
              <option>Secretary</option>
              <option>Treasurer</option>
              <option>Member</option>
            </select>
             <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none hover:bg-slate-50 cursor-pointer">
              <option>Status: All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Skills</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MEMBERS.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm" src={member.avatar} alt="" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                        <span className="px-3 py-1 inline-flex w-fit text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {member.role}
                        </span>
                        <div className="flex gap-1">
                            {member.skills?.map(skill => (
                                <span key={skill} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 text-amber-400" /> {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.status === 'Active' ? (
                       <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                         <UserCheck className="w-4 h-4" />
                         Active
                       </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                         <UserX className="w-4 h-4" />
                         Inactive
                       </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                         <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;