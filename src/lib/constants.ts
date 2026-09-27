// ============================================================
// SHOPIN30 — Constantes du site
// Modifiez les prix, la promo ou le numéro WhatsApp ici.
// ============================================================

/** WhatsApp — format international sans "+", utilisé par wa.me */
export const WHATSAPP_NUMBER = "2250501303343";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+225 05 01 30 33 43";

/** Lien WhatsApp avec message pré-rempli */
export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/** Promo de lancement */
export const PROMO = {
  percent: 30,
  code: "SHOPIN30",
  /** Fin de l'offre (1 mois après le lancement) — à ajuster si besoin */
  endDate: "2026-10-27T23:59:59",
};

/** Services commandables — les `id` sont envoyés à l'API puis convertis */
export type ServiceId = "site" | "app" | "crm";

/** Libellés EXACTS attendus par la colonne Airtable `Service` */
export const SERVICE_LABELS: Record<ServiceId, string> = {
  site: "Site web",
  app: "Application web",
  crm: "CRM connecté à WhatsApp",
};

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  /** Prix public "à partir de", en FCFA */
  price: number;
  features: string[];
  highlight?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "site",
    name: "Site web",
    tagline:
      "Vitrine ou boutique en ligne, rapide et impeccable sur tous les écrans.",
    price: 250000,
    features: [
      "Design sur mesure, 100 % responsive",
      "Optimisé mobile (90 % de vos visiteurs)",
      "Formulaire de commande + WhatsApp intégrés",
      "Livraison rapide : 7 à 14 jours",
      "SEO de base + hébergement 1 an offert",
    ],
  },
  {
    id: "app",
    name: "Application web",
    tagline:
      "Un outil sur mesure pour gérer votre activité, accessible partout.",
    price: 600000,
    highlight: true,
    features: [
      "Tableau de bord sur mesure",
      "Comptes utilisateurs & rôles",
      "Données en temps réel",
      "Connectable à WhatsApp & Airtable",
      "Formation de votre équipe incluse",
    ],
  },
  {
    id: "crm",
    name: "CRM connecté à WhatsApp",
    tagline:
      "Centralisez vos clients WhatsApp et ne perdez plus aucune vente.",
    price: 400000,
    features: [
      "Tous vos contacts WhatsApp centralisés",
      "Suivi des ventes & relances automatiques",
      "Messages de bienvenue automatiques",
      "Historique client complet",
      "Statistiques simples et claires",
    ],
  },
];

/** Formatte un prix FCFA : 250000 → "250 000 FCFA" */
export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR").replace(/ /g, " ")} FCFA`;
}

/** Prix après remise promo */
export function promoPrice(price: number): number {
  return Math.round((price * (100 - PROMO.percent)) / 100);
}
