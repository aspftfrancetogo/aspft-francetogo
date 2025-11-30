import { Donation, ContactMessage, Partner, DocFile, Member, Product, Child, Language } from './types';
import { Folder, FileText, Image as ImageIcon, Code, File } from 'lucide-react';
import React from 'react';

// TRADUCTIONS (i18n)
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    heroTitle: "Ensemble, changeons des vies",
    heroSubtitle: "Création d'un centre d'accueil et d'apprentissage à Tabligbo (Togo).",
    donate: "Faire un don",
    projects: "Nos projets",
    impact: "Notre Impact",
    team: "L'Équipe",
    shop: "Boutique",
    sponsorship: "Parrainage",
    raised: "Dons collectés",
    children: "Enfants visés",
    welcome: "Bienvenue sur ASPFT"
  },
  en: {
    heroTitle: "Together, let's change lives",
    heroSubtitle: "Creating a welcome and learning center in Tabligbo (Togo).",
    donate: "Donate Now",
    projects: "Our Projects",
    impact: "Our Impact",
    team: "The Team",
    shop: "Shop",
    sponsorship: "Sponsorship",
    raised: "Funds Raised",
    children: "Target Children",
    welcome: "Welcome to ASPFT"
  },
  ee: {
    heroTitle: "Đekawɔwɔ, míe trɔ agbe wo", // Ewe approximation
    heroSubtitle: "Suku kple xɔtuɖoɖo le Tabligbo (Togo).",
    donate: "Na Nusi",
    projects: "Míaƒe Dɔwo",
    impact: "Nu Si Miewɔ",
    team: "Dɔwɔlawo",
    shop: "Asiba",
    sponsorship: "Kpeɖeŋu",
    raised: "Ga si woƒo ƒu",
    children: "Ɖeviwo",
    welcome: "Woezɔ ɖe ASPFT"
  }
};

export const MOCK_DONATIONS: Donation[] = [
  { id: '1', date: '2023-10-25', name: 'Jean Dupont', email: 'jean.d@email.com', amount: 50, method: 'Online', message: 'Bravo pour le projet !', receiptSent: true },
  { id: '2', date: '2023-10-24', name: 'Marie Martin', email: 'marie.m@email.com', amount: 100, method: 'Virement', receiptSent: false },
  { id: '3', date: '2023-10-20', name: 'Anonyme', email: '', amount: 20, method: 'Espèces', receiptSent: false },
  { id: '4', date: '2023-10-18', name: 'Pierre Durand', email: 'pierre.d@email.com', amount: 200, method: 'Chèque', message: 'Pour le forage.', receiptSent: true },
];

export const MOCK_CONTACTS: ContactMessage[] = [
  { id: '1', date: '2023-10-26', name: 'Sophie Legrand', email: 'sophie@asso.org', subject: 'Bénévolat', status: 'Nouveau', message: 'Bonjour, je souhaite aider pour le voyage 2026.' },
  { id: '2', date: '2023-10-22', name: 'Marc Voisin', email: 'marc@company.com', subject: 'Partenariat', status: 'En cours', message: 'Nous pouvons fournir du matériel informatique.' },
  { id: '3', date: '2023-10-15', name: 'Lucie Fer', email: 'lucie@email.com', subject: 'Question don', status: 'Traité', message: 'Comment obtenir le reçu fiscal ?' },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: '1', name: 'Support Education Togo', type: 'ONG locale', note: 'Éducation', status: 'Actif', url: '#' },
  { id: '2', name: 'UNICEF France', type: 'Institution', note: 'Enfance', status: 'Actif', url: 'https://www.unicef.fr' },
  { id: '3', name: 'IMINC', type: 'ONG', note: 'Projets éducation', status: 'Actif', url: '#' },
  { id: '4', name: 'Mairie de Tabligbo', type: 'Institution', note: 'Local', status: 'Inactif', url: '#' },
];

export const MOCK_FILES: DocFile[] = [
  { id: '1', name: 'Statuts_Association.pdf', type: 'pdf', size: '2.4 MB', date: '2023-10-01' },
  { id: '2', name: 'Budget_Previsionnel_2025.xlsx', type: 'text', size: '1.2 MB', date: '2023-10-20' },
  { id: '3', name: 'Photos_Voyage', type: 'folder', items: 24, date: '2023-09-15' },
  { id: '4', name: 'Logo_ASPFT.png', type: 'image', size: '1.2 MB', date: '2023-09-01' },
  { id: '5', name: 'Rapport_Moral_2024.pdf', type: 'pdf', size: '3.5 MB', date: '2024-01-10' },
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Toni Cat.',
    email: 'toni@aspft.org',
    role: 'President',
    status: 'Active',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Gestion', 'Logistique', 'Leadership'],
    availability: 'High',
    location: 'Toulouse'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@aspft.org',
    role: 'Secretary',
    status: 'Active',
    joinDate: '2023-02-20',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Communication', 'Anglais', 'Réseaux Sociaux'],
    availability: 'Medium',
    location: 'Lyon'
  },
  {
    id: '3',
    name: 'James Carter',
    email: 'james@aspft.org',
    role: 'Treasurer',
    status: 'Inactive',
    joinDate: '2023-03-10',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Comptabilité', 'Finance', 'Juridique'],
    availability: 'Low',
    location: 'Paris'
  },
  {
    id: '4',
    name: 'Dr. Alice K.',
    email: 'alice@aspft.org',
    role: 'Member',
    status: 'Active',
    joinDate: '2023-05-12',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Médical', 'Pédiatrie', 'Santé Publique'],
    availability: 'High',
    location: 'Bordeaux'
  },
  {
    id: '5',
    name: 'Paul BTP',
    email: 'paul@aspft.org',
    role: 'Volunteer',
    status: 'Active',
    joinDate: '2023-06-01',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Maçonnerie', 'Plomberie', 'BTP'],
    availability: 'High',
    location: 'Lomé'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'T-Shirt ASPFT Officiel', price: 20, category: 'Goodies', description: 'Coton bio, soutenez le projet.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
  { id: '2', name: 'Sac Artisanal Togo', price: 35, category: 'Artisanat', description: 'Fait main à Kpalimé.', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80' },
  { id: '3', name: 'Café Togolais (250g)', price: 12, category: 'Artisanat', description: 'Récolté sur les plateaux.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80' },
];

export const MOCK_CHILDREN: Child[] = [
  { id: '1', name: 'Kossi', age: 8, story: "Kossi rêve de devenir médecin. Il a besoin de soutien pour l'école.", image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80', isSponsored: false },
  { id: '2', name: 'Afi', age: 6, story: "Afi adore les mathématiques. Elle vit avec sa grand-mère.", image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80', isSponsored: true },
  { id: '3', name: 'Kodjo', age: 10, story: "Passionné de football, Kodjo veut construire des maisons plus tard.", image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80', isSponsored: false },
];

export const getFileIcon = (type: DocFile['type']) => {
  switch (type) {
    case 'folder': return <Folder className="w-6 h-6 text-blue-500" />;
    case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
    case 'image': return <ImageIcon className="w-6 h-6 text-purple-500" />;
    case 'code': return <Code className="w-6 h-6 text-yellow-500" />;
    default: return <File className="w-6 h-6 text-gray-500" />;
  }
};