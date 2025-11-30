import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Heart,
  Map,
  Menu,
  X,
  Globe,
  Check,
  Flag,
  Mail,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  ShoppingBag,
  Baby,
  MapPin,
} from 'lucide-react';
import {
  MOCK_MEMBERS,
  MOCK_PRODUCTS,
  MOCK_CHILDREN,
  TRANSLATIONS,
} from '../constants';
import { Language } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Leaflet icons fix
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PublicSite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('fr');

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = (key: string) => TRANSLATIONS[currentLang][key] || key;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'accueil', label: t('welcome') || 'Accueil' },
    { id: 'projets', label: t('projects') },
    { id: 'impact', label: t('impact') },
    { id: 'boutique', label: t('shop') },
    { id: 'parrainage', label: t('sponsorship') },
    { id: 'contact', label: 'Contact' },
  ];

  const faqs = [
    {
      q: "Comment faire un don ?",
      a: "Vous pouvez cliquer sur 'Faire un don' et suivre les instructions. Pour l'instant la page est en mode test — intégration Stripe à venir.",
    },
    {
      q: "Comment devenir bénévole ?",
      a: "Contactez-nous via le formulaire ou envoyez un e-mail à aspft.francetogo@gmail.com — nous traiterons votre demande rapidement.",
    },
    {
      q: "Où se situe le centre ?",
      a: "Le projet principal se situe à Tabligbo, région maritime du Togo — voir la carte plus bas.",
    },
  ];

  return (
    <div className="font-sans text-slate-900 bg-slate-50 w-full overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md overflow-hidden flex items-center justify-center">
              <img src="/assets/logo.png" alt="ASPFT" className="w-full h-full object-contain" onError={(e) => ((e.target as HTMLImageElement).src = 'https://via.placeholder.com/48')} />
            </div>
            <div className={`${scrolled ? 'text-slate-800' : 'text-slate-800 lg:text-white'} transition-colors`}>
              <h1 className="text-xl font-bold leading-none">ASPFT</h1>
              <p className="text-[10px] font-medium opacity-80">Amitié & Solidarité France-Togo</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-sm font-medium hover:text-blue-500 transition-colors relative group ${scrolled ? 'text-slate-600' : 'text-slate-700 lg:text-slate-100'}`}>
                {link.label}
              </button>
            ))}

            <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
              <button onClick={() => setCurrentLang('fr')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'fr' ? 'bg-white text-blue-600' : 'text-white'}`}>FR</button>
              <button onClick={() => setCurrentLang('en')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'en' ? 'bg-white text-blue-600' : 'text-white'}`}>EN</button>
              <button onClick={() => setCurrentLang('ee')} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentLang === 'ee' ? 'bg-white text-blue-600' : 'text-white'}`}>TG</button>
            </div>

            <button onClick={() => scrollTo('don')} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
              {t('donate')}
            </button>
          </nav>

          <button className={`md:hidden p-2 ${scrolled ? 'text-slate-800' : 'text-slate-800 lg:text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg">
            <div className="flex flex-col items-start p-6 space-y-4">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="text-base font-medium text-slate-700 w-full text-left">
                  {link.label}
                </button>
              ))}

              <div className="flex items-center gap-3 pt-4 border-t w-full">
                <button onClick={() => setCurrentLang('fr')} className={`px-3 py-1 rounded-full text-sm ${currentLang === 'fr' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>FR</button>
                <button onClick={() => setCurrentLang('en')} className={`px-3 py-1 rounded-full text-sm ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>EN</button>
                <button onClick={() => setCurrentLang('ee')} className={`px-3 py-1 rounded-full text-sm ${currentLang === 'ee' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>TG</button>
              </div>

              <div className="pt-4 w-full border-t">
                <button onClick={() => scrollTo('don')} className="w-full py-3 bg-blue-600 text-white rounded-lg">{t('donate')}</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="accueil" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-30 bg-[url('/assets/togo_landscape_1.jpg')] bg-center bg-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-28">
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wide border border-white/10">
              <Globe className="w-3 h-3" /> Association Loi 1901
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="text-lg md:text-xl max-w-lg leading-relaxed opacity-90">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('don')} className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition flex items-center gap-2">
                <Heart className="w-5 h-5" /> {t('donate')}
              </button>

              <button onClick={() => scrollTo('projets')} className="px-6 py-3 border border-white/20 rounded-lg text-white/90 hover:bg-white/10 transition flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Découvrir nos projets
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img src="/assets/togo_children_1.jpg" alt="Enfants" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About / Mission / Vision */}
      <section id="mission" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t('aboutTitle')}</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{t('aboutText')}</p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-blue-700">{t('missionTitle')}</h3>
                <p className="mt-2 text-sm text-slate-600">{t('missionText')}</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-blue-700">{t('visionTitle')}</h3>
                <p className="mt-2 text-sm text-slate-600">{t('visionText')}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold">{t('valuesTitle')}</h3>
              <p className="mt-3 text-slate-600">{t('valuesText')}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow text-sm">
                  <strong>Transparence</strong>
                  <div className="text-xs text-slate-500 mt-1">Rapports publics annuels</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-sm">
                  <strong>Impact</strong>
                  <div className="text-xs text-slate-500 mt-1">Actions mesurables</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-sm">
                  <strong>Communauté</strong>
                  <div className="text-xs text-slate-500 mt-1">Partenariats locaux</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-sm">
                  <strong>Durabilité</strong>
                  <div className="text-xs text-slate-500 mt-1">Projets à long terme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projets" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Projets</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-lg">
              <img src="/assets/togo_village_1.jpg" alt="Tabligbo" className="w-full h-44 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg">{t('project1Title')}</h3>
                <p className="text-sm text-slate-600 mt-2">{t('project1Desc')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-lg">
              <img src="/assets/togo_children_1.jpg" alt="Program" className="w-full h-44 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg">{t('project2Title')}</h3>
                <p className="text-sm text-slate-600 mt-2">{t('project2Desc')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl overflow-hidden shadow-lg">
              <img src="/assets/togo_landscape_1.jpg" alt="Education" className="w-full h-44 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg">{t('project3Title')}</h3>
                <p className="text-sm text-slate-600 mt-2">{t('project3Desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h4 className="font-bold">{t('project4Title')}</h4>
              <p className="text-sm text-slate-600 mt-2">{t('project4Desc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h4 className="font-bold">{t('project5Title')}</h4>
              <p className="text-sm text-slate-600 mt-2">{t('project5Desc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h4 className="font-bold">{t('project6Title')}</h4>
              <p className="text-sm text-slate-600 mt-2">{t('project6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Notre Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow">
              <div className="text-4xl font-extrabold text-blue-700">+1500</div>
              <div className="text-sm text-slate-600 mt-2">Familles aidées</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow">
              <div className="text-4xl font-extrabold text-blue-700">+300</div>
              <div className="text-sm text-slate-600 mt-2">Enfants accompagnés</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow">
              <div className="text-4xl font-extrabold text-blue-700">12</div>
              <div className="text-sm text-slate-600 mt-2">Projets réalisés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique */}
      <section id="boutique" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('shop')} Solidaire</h2>
            <p className="text-slate-500">100% des bénéfices financent le centre de Tabligbo.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow overflow-hidden border">
                <div className="h-56 bg-slate-100 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{p.name}</h3>
                    <div className="font-bold text-blue-600">{p.price} €</div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">{p.description}</p>
                  <div className="mt-4">
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg">Acheter</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parrainage */}
      <section id="parrainage" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{t('sponsorship')}</h2>
            <p className="text-slate-500">Offrez un avenir à un enfant avec un soutien mensuel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_CHILDREN.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 shadow relative text-center">
                {c.isSponsored && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Parrainé
                  </div>
                )}
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-slate-50">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-4 font-bold">{c.name}, {c.age} ans</h3>
                <p className="text-sm text-slate-600 italic mt-2">"{c.story}"</p>
                <div className="mt-4">
                  <button disabled={c.isSponsored} className={`px-6 py-2 rounded-full font-bold transition ${c.isSponsored ? 'bg-slate-100 text-slate-400' : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg'}`}>
                    {c.isSponsored ? 'Déjà parrainé' : 'Parrainer (15€/mois)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Storytelling */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Map className="w-6 h-6 text-green-600" /> Notre terrain d'action</h2>
          <div className="h-[520px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <MapContainer center={[6.5, 1.3]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[6.6028, 1.5048]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">Tabligbo - Le Centre</h3>
                    <p className="text-sm">Futur site du centre d'accueil.</p>
                  </div>
                </Popup>
              </Marker>

              <Marker position={[6.1375, 1.2125]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">Lomé - Siège local</h3>
                    <p className="text-sm">Point logistique pour les conteneurs.</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* FAQ & Newsletter */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="flex items-center justify-between w-full text-left">
                    <div>
                      <div className="font-semibold">{f.q}</div>
                      <div className="text-sm text-slate-500">{activeFaq === i ? f.a : ''}</div>
                    </div>
                    <div className="text-slate-400">{activeFaq === i ? <ChevronUp /> : <ChevronDown />}</div>
                  </button>
                  {activeFaq === i && <div className="mt-3 text-sm text-slate-600">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
            <p className="text-sm text-slate-600 mb-4">Inscrivez-vous pour recevoir nos actualités et rapports d'impact.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Merci — inscription enregistrée (factice).'); }} className="flex gap-2">
              <input type="email" placeholder="Votre email" className="flex-1 p-3 rounded-lg border" required />
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg">S'inscrire</button>
            </form>

            <div className="mt-6 text-sm text-slate-500">
              <strong>Contact:</strong>
              <div className="mt-2">aspft.francetogo@gmail.com</div>
            </div>
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
                  <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => ((e.target as HTMLImageElement).src = 'https://via.placeholder.com/32')} />
                </div>
                <h4 className="text-lg font-bold">ASPFT</h4>
              </div>
              <p className="text-slate-400 text-sm">Amitié & Solidarité France-Togo.<br/>Ensemble, changeons des vies.</p>
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

            <div>
              <h4 className="text-lg font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => scrollTo('accueil')} className="text-left">Accueil</button></li>
                <li><button onClick={() => scrollTo('projets')} className="text-left">Projets</button></li>
                <li><button onClick={() => scrollTo('mission')} className="text-left">Mission</button></li>
                <li><button onClick={() => scrollTo('don')} className="text-left">Don</button></li>
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
