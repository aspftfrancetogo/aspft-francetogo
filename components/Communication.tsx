import React, { useState } from 'react';
import { PenTool, Share2, Youtube, Facebook, Send, Instagram, Twitter, Plus, Image as ImageIcon, Calendar } from 'lucide-react';
import { BlogPost, SocialPost } from '../types';

const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'social'>('blog');

  // Mocks
  const [posts, setPosts] = useState<BlogPost[]>([
    { id: '1', title: 'Retour de mission : Tabligbo 2024', author: 'Toni', date: '2024-02-15', status: 'published', excerpt: 'Un voyage riche en émotions et en rencontres.', category: 'Terrain' },
    { id: '2', title: 'Avancée du forage', author: 'Sarah', date: '2024-03-01', status: 'draft', excerpt: 'Les études hydrogéologiques sont terminées.', category: 'Projet' }
  ]);

  const [socials, setSocials] = useState<SocialPost[]>([
    { id: '1', content: 'Découvrez notre nouvelle vidéo sur le projet Forage ! 💧 #Togo #Humanitaire', platforms: ['tiktok', 'instagram'], scheduledDate: '2024-03-10T18:00', status: 'scheduled' }
  ]);

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Share2 className="w-8 h-8 text-blue-600" />
            Communication Hub
          </h2>
          <p className="text-slate-500 mt-1">Gérez votre présence web et réseaux sociaux</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'blog' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <PenTool className="w-4 h-4" /> Blog
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'social' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Share2 className="w-4 h-4" /> Réseaux Sociaux
          </button>
        </div>
      </div>

      {activeTab === 'blog' ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold text-slate-800">Articles de Blog</h3>
              <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm">
                <Plus className="w-4 h-4" /> Nouvel Article
              </button>
            </div>
            <div className="grid gap-4">
              {posts.map(post => (
                <div key={post.id} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-white">
                  <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800">{post.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-3 mt-3 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="bg-slate-100 px-2 rounded">{post.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Composer */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">Nouveau Post Social</h3>
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 text-sm"
                placeholder="Quoi de neuf aujourd'hui ?"
              ></textarea>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Facebook', 'TikTok', 'Instagram', 'YouTube', 'Telegram', 'Snapchat'].map(p => (
                  <label key={p} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 text-sm">
                    <input type="checkbox" className="rounded text-purple-600" />
                    {p}
                  </label>
                ))}
              </div>
              <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Planifier la publication
              </button>
            </div>

            {/* Queue */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">File d'attente</h3>
              <div className="space-y-4">
                {socials.map(social => (
                  <div key={social.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 mb-3">{social.content}</p>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex gap-2">
                        {social.platforms.includes('tiktok') && <span className="bg-black text-white px-2 py-0.5 rounded">TikTok</span>}
                        {social.platforms.includes('instagram') && <span className="bg-pink-600 text-white px-2 py-0.5 rounded">Insta</span>}
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(social.scheduledDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communication;