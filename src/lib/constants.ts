// SHOPIN30 — contenu centralisé du site

/** WhatsApp au format international sans « + », utilisé par wa.me. */
export const WHATSAPP_NUMBER = "2250501303343";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+225 05 01 30 33 43";

export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export type ServiceId = "site" | "app" | "crm" | "video";

export const SERVICE_LABELS: Record<ServiceId, string> = {
  site: "Site web professionnel",
  app: "Application web sur mesure",
  crm: "CRM connecté à WhatsApp",
  video: "Conception de vidéo IA & Motion Design (PUB)",
};

export interface Service {
  id: ServiceId;
  name: string;
  /** Libellé court utilisé dans les boutons compacts (calculateur, etc.). */
  shortName: string;
  tagline: string;
  minPrice?: number;
  maxPrice?: number;
  scopeUnit: string;
  scopeQuestion: string;
  features: string[];
  /** Mis en avant visuellement comme nouveauté. */
  isNew?: boolean;
  /** Service sur devis : contact direct sur WhatsApp, sans estimation ni formulaire. */
  contactOnly?: boolean;
  /** Message WhatsApp prérempli pour les services en contact direct. */
  contactMessage?: string;
}

export const SERVICES: Service[] = [
  {
    id: "site",
    name: "Site web professionnel",
    shortName: "Site web",
    tagline:
      "Pour présenter votre entreprise ou vos produits, et être visible partout, à tout moment.",
    minPrice: 100_000,
    maxPrice: 350_000,
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
    shortName: "Application web",
    tagline:
      "Pour digitaliser vos processus et gérer votre activité plus efficacement.",
    minPrice: 200_000,
    maxPrice: 400_000,
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
    shortName: "CRM WhatsApp",
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
  {
    id: "video",
    name: "Conception de vidéo IA & Motion Design",
    shortName: "Vidéo IA & Motion Design",
    tagline:
      "Pour des publicités vidéo percutantes créées par IA et en motion design, prêtes à diffuser sur vos réseaux sociaux.",
    scopeUnit: "vidéos",
    scopeQuestion: "Combien de vidéos publicitaires ?",
    features: [
      "Des vidéos IA et motion design adaptées à votre marque",
      "Des formats pensés pour WhatsApp, TikTok et Facebook",
      "Un message publicitaire clair qui attire vos clients",
    ],
    isNew: true,
    contactOnly: true,
    contactMessage:
      "Bonjour SHOPIN30, je suis intéressé par la conception de vidéo IA / Motion Design pour ma publicité. J'aimerais en discuter avec vous.",
  },
];

/** Format français lisible sur le site, par exemple « 100 000 FCFA ». */
export function formatFCFA(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/[\u202F\u00A0]/g, " ");
  return `${formatted} FCFA`;
}
