import React, { useEffect, useRef, useState } from 'react';
import { Download, Heart, Map, Menu, X, Globe, Check, Flag, Mail, Users, HelpCircle, ChevronDown, ChevronUp, PlayCircle, ShoppingBag, Baby, MapPin } from 'lucide-react';
import { MOCK_MEMBERS, MOCK_PRODUCTS, MOCK_CHILDREN, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Fix Leaflet Icons
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PublicSite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('fr');

  const t = (key: string) => {
    return TRANSLATIONS[currentLang][key] || key;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'accueil', label: t('accueil') || 'Accueil' },
    { id: 'projets', label: t('projects') },
    { id: 'impact', label: t('impact') },
    { id: 'boutique', label: t('shop') },
    { id: 'parrainage', label: t('sponsorship') },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="font-sans text-slate-900 bg-slate-50 w-full overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="ASPFT" className="w-full h-full object-contain" onError={(e) => (e.target as HTMLImageElement).src='https://via.placeholder.com/48'} />
             </div>
            <div className={`${scrolled ? 'text-slate-800' : 'text-slate-800 lg:text-white'} transition-colors`}>
              <h1 className="text-xl font-bold leading-none">ASPFT</h1>
              <p className="text-[10px] font-medium opacity-80">Amitié & Solidarité France-Togo</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-sm font-medium hover:text-blue-500 transition-colors relative group ${scrolled ? 'text-slate-600' : 'text-slate-700 lg:text-slate-100'}`}>
                {link.label}
              </button>
            ))}
            
            {/* Lang Switcher */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
              <button onClick={() => setCurrentLang('fr')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'fr' ? 'bg-white text-blue-600' : 'text-white'}`}>FR</button>
              <button onClick={() => setCurrentLang('en')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'en' ? 'bg-white text-blue-600' : 'text-white'}`}>EN</button>
              <button onClick={() => setCurrentLang('ee')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'ee' ? 'bg-white text-blue-600' : 'text-white'}`}>TG</button>
            </div>

            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
              {t('donate')}
            </button>
          </nav>

          <button className={`md:hidden p-2 ${scrolled ? 'text-slate-800' : 'text-slate-800 lg:text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20">
                 <source src="/logo_animated.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-50/50 to-slate-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 pt-20">
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-200">
                <Globe className="w-3 h-3" /> Association Loi 1901
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
              {t('heroTitle')}
            </h2>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center gap-2">
                <Heart className="w-5 h-5" /> {t('donate')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Solidaire */}
      <section id="boutique" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" /> {t('shop')} Solidaire
            </h2>
            <p className="text-slate-500">100% des bénéfices financent le centre de Tabligbo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-lg">{product.name}</h3>
                    <span className="font-bold text-blue-600">{product.price} €</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">{product.description}</p>
                  <button className="w-full py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                    Acheter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parrainage */}
      <section id="parrainage" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
              <Baby className="w-8 h-8 text-pink-500" /> {t('sponsorship')}
            </h2>
            <p className="text-slate-500">Offrez un avenir à un enfant avec un soutien mensuel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_CHILDREN.map(child => (
              <div key={child.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
                {child.isSponsored && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Parrainé
                  </div>
                )}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50">
                  <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{child.name}, {child.age} ans</h3>
                <p className="text-slate-500 text-sm mt-2 mb-6 italic">"{child.story}"</p>
                <button 
                  disabled={child.isSponsored}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${child.isSponsored ? 'bg-slate-100 text-slate-400' : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/30'}`}
                >
                  {child.isSponsored ? 'Déjà Parrainé' : 'Parrainer (15€/mois)'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carte Storytelling */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Map className="w-8 h-8 text-green-600" /> Notre Terrain d'Action
          </h2>
          <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <MapContainer center={[6.5, 1.3]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[6.6028, 1.5048]}>
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold text-lg">Tabligbo - Le Centre</h3>
                    <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=200" className="rounded-lg my-2 w-full h-24 object-cover" alt="Tabligbo"/>
                    <p className="text-sm">Futur site du centre d'accueil.</p>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[6.1375, 1.2125]}>
                <Popup>
                  <div className="text-center p-2">
                    <h3 className="font-bold">Lomé - Siège Local</h3>
                    <p className="text-sm">Point de logistique pour les conteneurs.</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-white rounded-full p-0.5">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => (e.target as HTMLImageElement).src='https://via.placeholder.com/32'} />
                 </div>
                 <h4 className="text-lg font-bold">ASPFT</h4>
              </div>
              <p className="text-slate-400 text-sm">
                Amitié & Solidarité France-Togo.<br/>
                Ensemble, changeons des vies.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Statuts</li>
                <li>Rapports annuels</li>
                <li>Mentions légales</li>
              </ul>
            </div>
             <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>aspft.francetogo@gmail.com</li>
                <li>60 rue des Tours</li>
                <li>31670 Labège, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <span>© 2025 ASPFT — Tous droits réservés</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicSite;