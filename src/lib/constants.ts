// SHOPIN30 — contenu centralisé du site

/** WhatsApp au format international sans « + », utilisé par wa.me. */
export const WHATSAPP_NUMBER = "2250501303343";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+225 05 01 30 33 43";

export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export type ServiceId = "site" | "app" | "crm";

export const SERVICE_LABELS: Record<ServiceId, string> = {
  site: "Site web professionnel",
  app: "Application web sur mesure",
  crm: "CRM connecté à WhatsApp",
};

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  minPrice: number;
  maxPrice: number;
  scopeUnit: string;
  scopeQuestion: string;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "site",
    name: "Site web professionnel",
    tagline:
      "Pour présenter votre entreprise ou vos produits, et être visible partout, à tout moment.",
    minPrice: 150_000,
    maxPrice: 400_000,
    scopeUnit: "pages",
    scopeQuestion: "Combien de pages environ ?",
    features: [
      "Une expérience fluide sur mobile et ordinateur",
      "Une présentation claire de votre activité ou vos produits",
      "Des points de contact simples pour vos clients",
    ],
  },
  {
    id: "app",
    name: "Application web sur mesure",
    tagline:
      "Pour digitaliser vos processus et gérer votre activité plus efficacement.",
    minPrice: 500_000,
    maxPrice: 1_500_000,
    scopeUnit: "fonctionnalités",
    scopeQuestion: "Combien de fonctionnalités clés ?",
    features: [
      "Des parcours adaptés à votre façon de travailler",
      "Un espace de gestion accessible en ligne",
      "Des automatisations définies selon votre besoin",
    ],
  },
  {
    id: "crm",
    name: "CRM connecté à WhatsApp",
    tagline:
      "Pour centraliser vos échanges clients et ne plus jamais perdre un message.",
    minPrice: 100_000,
    maxPrice: 250_000,
    scopeUnit: "fonctionnalités",
    scopeQuestion: "Combien de fonctions de suivi ?",
    features: [
      "Une vue centralisée de vos échanges clients",
      "Un suivi des demandes et des prochaines actions",
      "Une connexion WhatsApp définie au cadrage",
    ],
  },
];

/** Format français lisible sur le site, par exemple « 150 000 FCFA ». */
export function formatFCFA(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/[\u202F\u00A0]/g, " ");
  return `${formatted} FCFA`;
}
