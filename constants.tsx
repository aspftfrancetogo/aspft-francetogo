import { Donation, ContactMessage, Partner, DocFile, Member, Product, Child, Language } from './types';
import { Folder, FileText, Image as ImageIcon, Code, File } from 'lucide-react';
import React from 'react';

// TRADUCTIONS ENRICHIES (i18n)
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Hero
    heroTitle: "Ensemble, changeons des vies",
    heroSubtitle: "Construire un avenir digne pour les enfants vulnérables du Togo, à travers l'éducation, l'accès à l'eau potable et l'autonomisation des communautés.",
    donate: "Faire un don",

    // Navigation
    projects: "Nos projets",
    impact: "Notre Impact",
    team: "L'Équipe",
    shop: "Boutique",
    sponsorship: "Parrainage",
    raised: "Dons collectés",
    children: "Enfants accompagnés",
    welcome: "Bienvenue sur ASPFT",

    // À propos - VERSION LONGUE ET QUALITATIVE
    aboutTitle: "Notre engagement au Togo",
    aboutText: "L'Amitié & Solidarité des Peuples France-Togo (ASPFT) est née d'une conviction profonde : chaque enfant mérite un avenir digne. Depuis 2023, nous œuvrons aux côtés des communautés togolaises pour bâtir des projets concrets, durables et respectueux des cultures locales. Nos actions couvrent l'éducation, l'accès à l'eau potable, l'autonomisation économique des femmes et l'aide d'urgence en cas de crise. Nous croyons en une solidarité horizontale, où les bénéficiaires sont acteurs de leur propre développement.",

    whoTitle: "Qui sommes-nous ?",
    whoText: "L'ASPFT est une association loi 1901 indépendante, sans affiliation politique ni religieuse. Nous réunissons des bénévoles en France et des partenaires locaux au Togo autour d'une vision commune : un développement humain, transparent et participatif. Chaque projet est co-construit avec les communautés, validé par des études de terrain, et suivi avec rigueur grâce à des indicateurs d'impact mesurables.",

    // Mission & Vision - TEXTES PERCUTANTS
    missionTitle: "Notre mission",
    missionText: "Accompagner les populations vulnérables vers l'autonomie, en leur donnant accès à l'éducation, aux soins de santé, à l'eau potable et à des formations professionnelles. Nous ne sommes pas là pour imposer, mais pour soutenir, former et valoriser les initiatives locales.",

    visionTitle: "Notre vision à 2030",
    visionText: "Un Togo où chaque enfant, quelle que soit son origine, peut grandir en sécurité, étudier dans de bonnes conditions, accéder à l'eau potable et rêver d'un avenir meilleur. Nous visons la création d'un centre d'accueil permanent à Tabligbo, capable d'héberger, nourrir et former 100 enfants par an.",

    // Valeurs - ENRICHIES
    valuesTitle: "Nos valeurs fondamentales",
    valuesText: "Solidarité internationale • Transparence financière totale • Respect des cultures locales • Durabilité environnementale et sociale • Autonomisation des bénéficiaires",

    // PROJETS - TEXTES LONGS ET DÉTAILLÉS
    project1Title: "Centre d'Accueil et d'Apprentissage (Projet pilote)",
    project1Desc: "Notre projet phare consiste à créer un centre polyvalent à proximité de Tabligbo. Ce centre sera un lieu d'hébergement temporaire pour les enfants en situation de grande vulnérabilité (orphelins, victimes de violences, déscolarisés), mais aussi un espace d'apprentissage ouvert à tous : ateliers de lecture, alphabétisation, formation aux métiers manuels. Le terrain n'est pas encore acquis, les études hydrogéologiques et architecturales sont en cours. Nous recherchons activement des financements et des partenaires techniques pour concrétiser ce rêve d'ici 2027.",

    project2Title: "Programme d'Aide Alimentaire et Hygiène",
    project2Desc: "Nous distribuons régulièrement des kits alimentaires composés de riz, haricots, huile, conserves et produits d'hygiène (savon, désinfectant, protections menstruelles) aux familles identifiées comme étant en grande précarité par nos partenaires locaux. Ces kits sont calibrés pour nourrir une famille de 5 personnes pendant 2 semaines. Chaque distribution fait l'objet d'un rapport photo et d'un suivi nominatif pour garantir la transparence.",

    project3Title: "Soutien Scolaire et Bibliothèque Mobile",
    project3Desc: "L'éducation est le socle de tout développement. Nous finançons des cours de rattrapage pour les enfants en difficulté, nous fournissons des fournitures scolaires (cahiers, stylos, uniformes) et nous avons lancé une bibliothèque mobile qui circule dans les villages isolés. Notre objectif : réduire l'analphabétisme chez les jeunes et redonner le goût d'apprendre. Nous organisons également des ateliers d'éveil artistique (dessin, musique, théâtre) pour stimuler la créativité des enfants.",

    project4Title: "Accès à l'Eau Potable : Forages et Puits",
    project4Desc: "L'eau, c'est la vie. Sans eau potable, pas d'hygiène, pas de santé, pas de développement. Nous ne nous contentons pas de réhabiliter d'anciens puits : nous voulons construire de véritables forages équipés de pompes solaires, capables de fournir de l'eau propre à des centaines de personnes. Le premier forage sera situé à proximité du futur centre, mais bénéficiera également aux villages environnants. Chaque projet hydraulique est précédé d'une étude géologique rigoureuse pour garantir un débit suffisant et durable.",

    project5Title: "Autonomisation Économique des Femmes",
    project5Desc: "Les femmes sont les piliers de la société togolaise. Nous leur offrons des formations professionnelles (couture, transformation alimentaire, maraîchage, savonnerie artisanale) et un accompagnement dans le montage de micro-entreprises. Chaque bénéficiaire reçoit un kit de démarrage et un suivi personnalisé sur 12 mois. L'objectif : leur permettre de générer un revenu stable, de subvenir aux besoins de leur famille et de gagner en indépendance.",

    project6Title: "Actions d'Urgence et Solidarité Immédiate",
    project6Desc: "Face aux crises (inondations, incendies, épidémies), nous intervenons rapidement en distribuant des vivres, des abris temporaires, des médicaments de première nécessité et en assurant un soutien psychosocial aux victimes. Nos équipes locales sont formées aux premiers secours et travaillent en coordination avec les autorités sanitaires. Chaque intervention d'urgence est documentée et fait l'objet d'un rapport public.",

    // Impact - CHIFFRES DÉTAILLÉS
    impactFamilies: "Plus de 1 500 familles soutenues depuis 2023",
    impactChildren: "Plus de 300 enfants bénéficiaires de nos programmes",
    impactProjects: "12 projets menés à terme avec succès",
    impactWater: "3 puits réhabilités, 1 forage en cours",
    impactEducation: "250 enfants équipés en fournitures scolaires",

    // Don
    donateWhyTitle: "Pourquoi vos dons sont essentiels",
    donateWhyText: "Chaque euro donné est tracé et investi directement sur le terrain. Pas de frais de structure excessifs, pas d'intermédiaires : 95% de vos dons financent les actions concrètes. Vous recevez un reçu fiscal vous permettant de déduire 66% de votre don de vos impôts. Nous publions chaque année un rapport financier détaillé, consultable en ligne.",
    donateCTA: "Je fais un don maintenant",

    // Contact
    contactTitle: "Nous contacter",
    contactEmail: "aspft.francetogo@gmail.com",
    contactAddress: "60 rue des Tours, 31670 Labège, France",
    contactPhone: "+33 6 XX XX XX XX (à venir)",

    // Footer
    footerRights: "© 2025 ASPFT — Tous droits réservés",
    footerMission: "Association Loi 1901 • RNA en cours • Transparence totale"
  },

  en: {
    heroTitle: "Together, let's change lives",
    heroSubtitle: "Building a dignified future for vulnerable children in Togo through education, clean water access and community empowerment.",
    donate: "Donate Now",
    projects: "Our Projects",
    impact: "Our Impact",
    team: "The Team",
    shop: "Shop",
    sponsorship: "Sponsorship",
    raised: "Funds Raised",
    children: "Children Supported",
    welcome: "Welcome to ASPFT",

    aboutTitle: "Our Commitment in Togo",
    aboutText: "Friendship & Solidarity of the Peoples France-Togo (ASPFT) was born from a deep conviction: every child deserves a dignified future. Since 2023, we work alongside Togolese communities to build concrete, sustainable and culturally respectful projects.",

    whoTitle: "Who we are",
    whoText: "ASPFT is an independent nonprofit association, with no political or religious affiliation. We bring together volunteers in France and local partners in Togo around a common vision: transparent, participatory human development.",

    missionTitle: "Our mission",
    missionText: "Support vulnerable populations towards autonomy by providing access to education, healthcare, clean water and vocational training.",

    visionTitle: "Our 2030 vision",
    visionText: "A Togo where every child, regardless of origin, can grow up safely, study in good conditions, access clean water and dream of a better future.",

    valuesTitle: "Our core values",
    valuesText: "International solidarity • Full financial transparency • Respect for local cultures • Environmental and social sustainability • Beneficiary empowerment",

    project1Title: "Welcome & Learning Center (Pilot Project)",
    project1Desc: "Our flagship project: create a multipurpose center near Tabligbo for temporary shelter and learning space for vulnerable children. Land not yet acquired, studies underway. Target: 2027 opening.",

    project2Title: "Food Aid & Hygiene Program",
    project2Desc: "Regular distribution of food kits (rice, beans, oil, hygiene products) to families in extreme poverty. Each kit feeds 5 people for 2 weeks. Full traceability guaranteed.",

    project3Title: "School Support & Mobile Library",
    project3Desc: "We fund remedial classes, provide school supplies and run a mobile library in isolated villages. Goal: reduce youth illiteracy and reignite love of learning.",

    project4Title: "Clean Water Access: Wells & Boreholes",
    project4Desc: "Water is life. We build solar-powered boreholes providing clean water to hundreds. First borehole near future center will also serve surrounding villages.",

    project5Title: "Women's Economic Empowerment",
    project5Desc: "Vocational training (sewing, food processing, gardening, soap making) and micro-enterprise support. Each beneficiary receives a starter kit and 12-month personalized follow-up.",

    project6Title: "Emergency Actions & Immediate Solidarity",
    project6Desc: "Rapid crisis response (floods, fires, epidemics): food, temporary shelter, essential medicines, psychosocial support. All interventions documented and publicly reported.",

    impactFamilies: "Over 1,500 families supported since 2023",
    impactChildren: "Over 300 children benefiting from programs",
    impactProjects: "12 successfully completed projects",
    impactWater: "3 wells rehabilitated, 1 borehole underway",
    impactEducation: "250 children equipped with school supplies",

    donateWhyTitle: "Why your donations matter",
    donateWhyText: "Every euro is tracked and invested directly in the field. No excessive overhead: 95% funds concrete actions. You receive a tax receipt. We publish detailed annual financial reports.",
    donateCTA: "Donate now",

    contactTitle: "Contact us",
    contactEmail: "aspft.francetogo@gmail.com",
    contactAddress: "60 rue des Tours, 31670 Labège, France",
    contactPhone: "+33 6 XX XX XX XX (coming soon)",

    footerRights: "© 2025 ASPFT — All rights reserved",
    footerMission: "Nonprofit Association • RNA pending • Full transparency"
  },

  ee: {
    heroTitle: "Míawo katã, míe trɔ agbe wo",
    heroSubtitle: "Míe tu xɔ kple suku le Tabligbo ɖe ɖeviwo kple agbeɖeviwo dzi.",
    donate: "Na Nusi",
    projects: "Míaƒe Dɔwo",
    impact: "Nu Si Miewɔ",
    team: "Dɔwɔlawo",
    shop: "Asiba",
    sponsorship: "Kpeɖeŋu",
    raised: "Ga si woƒo ƒu",
    children: "Ɖeviwo",
    welcome: "Woezɔ ɖe ASPFT",

    aboutTitle: "ASPFT ƒe ɖeɖe",
    aboutText: "ASPFT nye ɖeɖeɖoɖowo katã ɖe agbeɖeviwo kple nuɖeviwo dzi le Togo ƒe agbale.",
    whoTitle: "Míaƒe nya",
    whoText: "Míaƒe koenye kple asɔɖakɔwo ɖe France kple Togo.",
    missionTitle: "Míaƒe ɖokuiɖe",
    missionText: "Dɔdɔe, wɔgbláɖe kple nudɔlaɖe ɖe míaƒe nuɖeviwo dzi.",
    visionTitle: "Míaƒe ɖekakpɔ",
    visionText: "Yaŋlɔe ɖe, míaƒe ɖeviwo le gbedodoŋu dzi.",
    valuesTitle: "Míaƒe viɖɛ",
    valuesText: "Solidarité, Transparence, Respect, Durabilité, Autonomie.",

    project1Title: "Tabligbo Center",
    project1Desc: "Dzadzɔ ɖeɖe le ɖeviwo kple suku.",
    project2Title: "Nutrition Program",
    project2Desc: "Nutritional support.",
    project3Title: "Education",
    project3Desc: "Suku kple agbeɖeviwo.",
    project4Title: "Water Access",
    project4Desc: "Puits kple pompes.",
    project5Title: "Women's Empowerment",
    project5Desc: "Training.",
    project6Title: "Emergency Actions",
    project6Desc: "Aid in crisis.",

    impactFamilies: "+1500 families",
    impactChildren: "+300 children",
    impactProjects: "12 projects",
    impactWater: "3 wells",
    impactEducation: "250 children",

    donateWhyTitle: "Why donate?",
    donateWhyText: "Every donation helps.",
    donateCTA: "Donate",

    contactTitle: "Contact",
    contactEmail: "aspft.francetogo@gmail.com",
    contactAddress: "60 rue des Tours, 31670 Labège, France",
    contactPhone: "+33 6 XX XX XX XX",

    footerRights: "© 2025 ASPFT",
    footerMission: "Association • RNA • Transparency"
  }
};

// Mock data - ENRICHIS
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

// PRODUITS ENRICHIS avec FCFA
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirt ASPFT Officiel',
    price: 20,
    category: 'Goodies',
    description: 'Coton bio équitable. Logo brodé. Tailles S à XXL. Soutenez nos actions en portant nos couleurs !',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'
  },
  {
    id: '2',
    name: 'Sac Artisanal Togo',
    price: 35,
    category: 'Artisanat',
    description: 'Tissé main à Kpalimé par des artisanes locales. Dimensions 40x30 cm. Résistant et unique.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80'
  },
  {
    id: '3',
    name: 'Café Togolais (250g)',
    price: 12,
    category: 'Artisanat',
    description: 'Arabica récolté sur les plateaux de Kpalimé. Torréfaction artisanale. Arômes fruités et cacaotés.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80'
  },
  {
    id: '4',
    name: 'Bracelet Wax Solidaire',
    price: 8,
    category: 'Goodies',
    description: 'Bracelet en tissu wax authentique. Fait main au Togo. Réglable. Chaque achat finance 1 repas.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80'
  },
  {
    id: '5',
    name: 'Savon Karité Bio (100g)',
    price: 6,
    category: 'Artisanat',
    description: 'Savon au beurre de karité pur. Fabriqué par une coopérative de femmes. Hydratant et doux.',
    image: 'https://images.unsplash.com/photo-1600857544200-242879aa56f8?w=500&q=80'
  }
];

export const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    name: 'Kossi',
    age: 8,
    story: "Kossi rêve de devenir médecin pour soigner sa communauté. Orphelin, il vit chez son oncle et a besoin de soutien pour continuer l'école.",
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80',
    isSponsored: false
  },
  {
    id: '2',
    name: 'Afi',
    age: 6,
    story: "Afi adore les mathématiques et dessiner. Elle vit avec sa grand-mère qui peine à subvenir à ses besoins. Votre soutien lui offrira un avenir.",
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80',
    isSponsored: true
  },
  {
    id: '3',
    name: 'Kodjo',
    age: 10,
    story: "Passionné de football et de construction, Kodjo veut devenir maçon pour bâtir des écoles dans son village. Il a besoin de matériel scolaire.",
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80',
    isSponsored: false
  }
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

// Taux de conversion (indicatifs)
export const EXCHANGE_RATES = {
  EUR_TO_FCFA: 655.957,
  USD_TO_EUR: 0.92,
  GBP_TO_EUR: 1.17
};
