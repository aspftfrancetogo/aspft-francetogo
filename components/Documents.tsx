import React, { useState } from 'react';
import { MOCK_FILES, getFileIcon } from '../constants';
import { Search, Plus, Filter, LayoutGrid, List as ListIcon, MoreHorizontal, Download, Share2, Trash2 } from 'lucide-react';

const Documents: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState<string>('/home/toni/Documents/AssoProject');

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Documents</h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-lg w-fit">
            <span className="text-blue-600 font-semibold">root</span>
            <span>/</span>
            {currentPath.split('/').filter(Boolean).map((part, i) => (
               <React.Fragment key={i}>
                 <span>{part}</span>
                 {i < currentPath.split('/').filter(Boolean).length - 1 && <span>/</span>}
               </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64 shadow-sm"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Upload</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {MOCK_FILES.map((file) => (
              <div key={file.id} className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer relative">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {getFileIcon(file.type)}
                  </div>
                  <h3 className="font-medium text-slate-700 text-sm truncate w-full mb-1">{file.name}</h3>
                  <p className="text-xs text-slate-400">
                    {file.type === 'folder' ? `${file.items} items` : file.size}
                  </p>
                  <p className="text-[10px] text-slate-300 mt-2">{file.date}</p>
                </div>
              </div>
            ))}
            {/* Add New Placeholders */}
             <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer min-h-[160px]">
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">New Folder</span>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Modified</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_FILES.map((file) => (
                  <tr key={file.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          {getFileIcon(file.type)}
                        </div>
                        <span className="font-medium text-slate-700">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{file.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {file.type === 'folder' ? '-' : file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                         <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                         <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;