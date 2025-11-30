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

export interface Donation {
  id: string;
  date: string;
  name: string;
  email: string;
  amount: number;
  method: 'Espèces' | 'Chèque' | 'Virement' | 'Autre' | 'Online';
  message?: string;
  receiptSent?: boolean;
}

export interface ContactMessage {
  id: string;
  date: string;
  name: string;
  email: string;
  subject: string;
  status: 'Nouveau' | 'En cours' | 'Traité';
  message: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  url?: string;
  note: string;
  status: 'Actif' | 'Inactif';
}

export interface DocFile {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'code' | 'text';
  size?: string;
  date: string;
  items?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
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
}

// Mission Control Types
export interface MissionTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export interface MissionEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'meeting' | 'travel' | 'field-work';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  status: 'draft' | 'published';
  excerpt: string;
  category: 'News' | 'Terrain' | 'Projet';
  image?: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: ('facebook' | 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'snapchat')[];
  scheduledDate: string;
  status: 'scheduled' | 'posted';
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Artisanat' | 'Goodies';
  description: string;
}

export interface Child {
  id: string;
  name: string; // Prénom seulement pour protection
  age: number;
  story: string;
  image: string; // Photo floutée ou stock
  isSponsored: boolean;
}