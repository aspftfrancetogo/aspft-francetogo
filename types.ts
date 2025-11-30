export enum View {
  PUBLIC = 'PUBLIC',
  DASHBOARD = 'DASHBOARD',
  DONATIONS = 'DONATIONS',
  CONTACTS = 'CONTACTS',
  PARTNERS = 'PARTNERS',
  DOCUMENTS = 'DOCUMENTS',
  ASSISTANT = 'ASSISTANT',
  CALCULATOR = 'CALCULATOR',
  MISSION = 'MISSION',
  COMMUNICATION = 'COMMUNICATION',
  VOLUNTEERS = 'VOLUNTEERS'
}

export type Language = 'fr' | 'en' | 'ee';

// ============================================================================
// SYSTÈME DE DEVISES MULTI-PAYS
// ============================================================================

export type Currency = 'EUR' | 'FCFA' | 'USD' | 'GBP' | 'CAD' | 'CHF';

export interface CurrencyPrice {
  EUR: number;
  FCFA: number;
  USD: number;
  GBP: number;
  CAD: number;
  CHF: number;
}

export interface ExchangeRate {
  base: Currency;
  rates: Record<Currency, number>;
  lastUpdated: string;
}

// ============================================================================
// SYSTÈME DE BADGES DONATEURS (Gamification)
// ============================================================================

export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'legend';

export interface Badge {
  id: string;
  name: string;
  level: BadgeLevel;
  description: string;
  icon: string; // Emoji ou URL d'avatar
  minAmount: number; // Montant minimum en EUR pour débloquer
  benefits: string[]; // Avantages (ex: "Accès early-bird événements")
  color: string; // Couleur du badge (hex)
  isUnlocked?: boolean;
  unlockedDate?: string;
}

export interface DonorProfile {
  id: string;
  name: string;
  email: string;
  totalDonated: number; // En EUR
  currentBadge: Badge;
  badges: Badge[]; // Historique des badges débloqués
  donationCount: number;
  firstDonationDate: string;
  lastDonationDate: string;
  isRecurring: boolean;
  avatar?: string;
  isPublic: boolean; // Apparaître dans le "mur des donateurs"
}

// ============================================================================
// DONS ENRICHIS
// ============================================================================

export interface Donation {
  id: string;
  date: string;
  name: string;
  email: string;
  amount: number;
  currency: Currency; // Devise utilisée
  amountInEur: number; // Montant converti en EUR (référence)
  method: 'Espèces' | 'Chèque' | 'Virement' | 'PayPal' | 'Stripe' | 'Autre' | 'Online';
  message?: string;
  receiptSent?: boolean;
  receiptNumber?: string;
  isRecurring?: boolean; // Don mensuel
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
  project?: string; // Projet spécifique financé (optionnel)
  isAnonymous?: boolean;
  taxDeductible?: boolean;
  country?: string; // Pays du donateur
}

export interface ContactMessage {
  id: string;
  date: string;
  name: string;
  email: string;
  subject: string;
  status: 'Nouveau' | 'En cours' | 'Traité';
  message: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  assignedTo?: string;
  response?: string;
  responseDate?: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  url?: string;
  note: string;
  status: 'Actif' | 'Inactif';
  logo?: string;
  country?: string;
  contactPerson?: string;
  contactEmail?: string;
  partnershipStartDate?: string;
  contributionType?: 'financial' | 'material' | 'expertise' | 'volunteer';
}

export interface DocFile {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'code' | 'text' | 'video' | 'audio';
  size?: string;
  date: string;
  items?: number;
  path?: string;
  tags?: string[];
  description?: string;
  uploadedBy?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
  attachments?: { type: string; url: string; name: string }[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  avatar: string;
  skills: string[];
  location?: string;
  availability?: 'High' | 'Medium' | 'Low';
  phone?: string;
  languages?: Language[];
  hoursContributed?: number;
  badges?: Badge[];
}

// ============================================================================
// MISSION CONTROL TYPES
// ============================================================================

export interface MissionTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  description?: string;
  attachments?: string[];
  comments?: { author: string; text: string; date: string }[];
  relatedProject?: string;
}

export interface MissionEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'meeting' | 'travel' | 'field-work' | 'fundraising' | 'conference';
  description?: string;
  attendees?: string[];
  budget?: number;
  status?: 'planned' | 'confirmed' | 'completed' | 'cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  status: 'draft' | 'published';
  excerpt: string;
  content?: string;
  category: 'News' | 'Terrain' | 'Projet' | 'Témoignage' | 'Tutoriel';
  image?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  language?: Language;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: ('facebook' | 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'snapchat')[];
  scheduledDate: string;
  status: 'scheduled' | 'posted' | 'failed';
  image?: string;
  video?: string;
  hashtags?: string[];
  mentions?: string[];
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// ============================================================================
// BOUTIQUE SOLIDAIRE - SYSTÈME ÉTENDU
// ============================================================================

export interface Product {
  id: string;
  name: string;
  prices: CurrencyPrice; // Prix dans toutes les devises
  image: string;
  images?: string[]; // Galerie d'images
  category: 'Artisanat' | 'Goodies' | 'Textile' | 'Cosmétique' | 'Alimentaire' | 'Autre';
  description: string;
  longDescription?: string;
  origin?: string; // Pays/région d'origine
  artisan?: string; // Nom de l'artisan/producteur
  materials?: string[]; // Matériaux utilisés
  dimensions?: string; // Dimensions (ex: "15x10x5 cm")
  weight?: number; // Poids en grammes
  stock: number;
  isFairTrade?: boolean;
  isBio?: boolean;
  isHandmade?: boolean;
  partnerContribution?: number; // % reversé à l'artisan partenaire
  impactDescription?: string; // Description de l'impact social
  createdDate: string;
  soldCount?: number;
  rating?: number; // Note moyenne /5
  reviews?: ProductReview[];
  tags?: string[];
  isPartnerProduct?: boolean; // Produit vendu par une autre association partenaire
  partnerInfo?: {
    associationName: string;
    contactEmail: string;
    commissionRate: number; // Taux de commission pour ASPFT (%)
  };
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean; // Achat vérifié
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCurrency: Currency;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  totalAmount: number;
  currency: Currency;
  shippingCost: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'paypal' | 'transfer' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
}

// ============================================================================
// PARRAINAGE ENFANTS - VERSION ENRICHIE
// ============================================================================

export interface Child {
  id: string;
  firstName: string; // Prénom seulement (protection RGPD)
  age: number;
  gender: 'M' | 'F';
  story: string; // Histoire longue et empathique (300-500 mots)
  image: string; // Photo floutée ou illustration
  village?: string; // Village/région (sans adresse précise)
  familyContext: {
    siblings: number;
    guardianType: 'parents' | 'single_parent' | 'grandparents' | 'uncle_aunt' | 'orphanage';
    guardianOccupation?: string;
    householdMembers: number;
    challenges: string[]; // Ex: ["Accès eau", "Malnutrition", "Scolarité"]
  };
  education: {
    schoolLevel: string; // Ex: "CM2" ou "Non scolarisé"
    favoriteSubject?: string;
    dreams: string; // Rêves/aspirations
  };
  health: {
    generalStatus: 'good' | 'fragile' | 'chronic_condition';
    notes?: string;
  };
  sponsorship: {
    isSponsored: boolean;
    sponsorName?: string; // Anonymisé si demandé
    startDate?: string;
    monthlyCost: number; // En EUR
    benefits: string[]; // Ce que le parrainage apporte
  };
  personality?: string; // Traits de caractère, passions
  recentUpdate?: {
    date: string;
    text: string;
    photos?: string[];
  };
  createdDate: string;
  priority?: 'urgent' | 'high' | 'normal'; // Urgence du besoin
}

// ============================================================================
// PROJETS - VERSION DÉTAILLÉE
// ============================================================================

export interface Project {
  id: string;
  title: string;
  slug: string; // URL-friendly (ex: "construction-centre-enfants")
  category: 'education' | 'health' | 'water' | 'women' | 'emergency' | 'infrastructure';
  status: 'idea' | 'planning' | 'funding' | 'in-progress' | 'completed' | 'on-hold';
  shortDescription: string; // 1-2 phrases
  longDescription: string; // 500-1000 mots, style reportage
  objective: string; // Objectif principal
  targetBeneficiaries: number;
  location: {
    country: string;
    region?: string;
    village?: string;
    coordinates?: { lat: number; lng: number }; // Pour carte interactive
  };
  timeline: {
    startDate?: string;
    expectedEndDate?: string;
    actualEndDate?: string;
    milestones: Milestone[];
  };
  budget: {
    totalNeeded: number; // En EUR
    raised: number;
    currency: Currency;
    breakdown: BudgetItem[];
  };
  impact: {
    description: string;
    metrics: ImpactMetric[];
  };
  images: string[];
  videos?: string[];
  documents?: string[]; // PDFs, plans, études
  updates: ProjectUpdate[];
  partners?: string[]; // IDs des partenaires
  donationLink?: string;
  isHighlighted?: boolean; // Projet vedette
  needsUrgent?: boolean;
  tags?: string[];
  createdDate: string;
  lastUpdated: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  progress: number; // 0-100%
}

export interface BudgetItem {
  category: string; // Ex: "Matériaux", "Main d'œuvre", "Transport"
  amount: number;
  description?: string;
}

export interface ImpactMetric {
  label: string; // Ex: "Enfants scolarisés", "Litres d'eau/jour"
  value: number;
  unit?: string;
  icon?: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  title: string;
  content: string;
  images?: string[];
  type: 'progress' | 'news' | 'milestone' | 'emergency';
}

// ============================================================================
// GÉNÉRATEUR D'ÉTIQUETTES D'ENVOI
// ============================================================================

export interface ShippingLabel {
  id: string;
  createdDate: string;
  sender: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  receiver: {
    name: string; // ASPFT
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  package: {
    type: 'colis' | 'palette' | 'enveloppe';
    weight?: number;
    dimensions?: string;
    description: string; // Contenu
    value?: number; // Valeur déclarée
  };
  carrier?: 'La Poste' | 'Colissimo' | 'Chronopost' | 'UPS' | 'DHL' | 'Autre';
  trackingNumber?: string;
  qrCode?: string; // QR code pour traçabilité
  specialInstructions?: string;
}

// ============================================================================
// SYSTÈME DE NEWSLETTER / COMMUNICATION
// ============================================================================

export interface Newsletter {
  id: string;
  title: string;
  subject: string;
  content: string; // HTML
  status: 'draft' | 'scheduled' | 'sent';
  scheduledDate?: string;
  sentDate?: string;
  recipients: number;
  openRate?: number;
  clickRate?: number;
  template?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribeDate: string;
  isActive: boolean;
  interests?: string[]; // Préférences (projets, boutique, etc.)
  language?: Language;
  country?: string;
}

// ============================================================================
// STATISTIQUES & IMPACT
// ============================================================================

export interface ImpactStats {
  totalDonations: number;
  totalDonors: number;
  projectsCompleted: number;
  beneficiaries: number;
  volunteersActive: number;
  partnersActive: number;
  childrenSponsored: number;
  litersWaterProvided?: number;
  treesPlanted?: number;
  mealsProvided?: number;
  schoolKitsDistributed?: number;
  updatedDate: string;
}

// ============================================================================
// TYPES UTILITAIRES
// ============================================================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLink?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ApiResponse<T> {
  success
