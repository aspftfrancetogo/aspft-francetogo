import jsPDF from 'jspdf';
import { Donation } from '../types';

export const generateTaxReceipt = (donation: Donation) => {
  const doc = new jsPDF();

  // Logo Placeholder
  // doc.addImage('/logo.png', 'PNG', 15, 15, 30, 30);

  // Header
  doc.setFontSize(18);
  doc.setTextColor(44, 62, 80);
  doc.text('REÇU FISCAL / DON', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Article 200 du Code Général des Impôts', 105, 26, { align: 'center' });

  // Association Info
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('BÉNÉFICIAIRE :', 15, 50);
  doc.setFontSize(10);
  doc.text('Association ASPFT', 15, 56);
  doc.text('60 rue des Tours', 15, 61);
  doc.text('31670 Labège, France', 15, 66);
  doc.text('Email: aspft.francetogo@gmail.com', 15, 71);

  // Donor Info
  doc.setFontSize(12);
  doc.text('DONATEUR :', 120, 50);
  doc.setFontSize(10);
  doc.text(donation.name, 120, 56);
  doc.text(donation.email || 'Adresse non renseignée', 120, 61);

  // Donation Details Box
  doc.setDrawColor(0);
  doc.setFillColor(245, 247, 250);
  doc.rect(15, 90, 180, 40, 'F');
  
  doc.setFontSize(11);
  doc.text(`Montant du don : ${donation.amount.toFixed(2)} €`, 25, 105);
  doc.text(`Date du versement : ${new Date(donation.date).toLocaleDateString('fr-FR')}`, 25, 115);
  doc.text(`Mode de versement : ${donation.method}`, 110, 105);
  doc.text(`Numéro de référence : REF-${donation.id}-${new Date().getFullYear()}`, 110, 115);

  // Legal Text
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(
    "L'association reconnaît avoir reçu la somme ci-dessus à titre de don manuel.\nCe don n'a donné lieu à aucune contrepartie directe ou indirecte sous forme de biens ou de services.",
    15, 145
  );

  // Signature
  doc.text('Fait à Labège, le ' + new Date().toLocaleDateString('fr-FR'), 120, 170);
  doc.text('Le Président, Toni Cat.', 120, 180);
  
  // Fake Signature
  doc.setFontSize(20);
  doc.setTextColor(20, 50, 150);
  doc.text('Toni C.', 130, 195, { angle: -10 });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('ASPFT - Association Loi 1901 - Amitié & Solidarité France-Togo', 105, 280, { align: 'center' });

  doc.save(`Recu_Fiscal_${donation.name.replace(' ', '_')}_${donation.date}.pdf`);
};