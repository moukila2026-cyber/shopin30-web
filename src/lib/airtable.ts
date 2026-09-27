// ============================================================
// SHOPIN30 — Envoi d'une commande vers Airtable
//
// Stratégie en 3 niveaux (voir GUIDE-DEPLOIEMENT.md) :
//   1. POST /api/commandes        → proxy serverless Vercel (jeton caché) ✅
//   2. Appel direct navigateur    → seulement si VITE_AIRTABLE_TOKEN est défini
//   3. Stockage local (démo)      → aucune config : rien n'est perdu
// ============================================================

import { SERVICE_LABELS, type ServiceId } from "./constants";

export interface CommandePayload {
  nom: string;
  prenom: string;
  entreprise: string;
  telephone: string;
  service: ServiceId;
}

/** Canal par lequel la commande a été enregistrée */
export type SubmitMode = "proxy" | "direct" | "local";

export interface SubmitResult {
  mode: SubmitMode;
}

/** Erreur métier : la commande n'a PAS pu être enregistrée */
export class CommandeError extends Error {}

const LOCAL_KEY = "shopin30_commandes_hors_ligne";
const DEFAULT_BASE_ID = "appRmYF6r2HGZzTWY";
const DEFAULT_TABLE = "Commandes";

/** Sauvegarde locale de secours : aucune commande perdue */
function saveLocally(payload: CommandePayload): void {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const list: unknown[] = raw ? JSON.parse(raw) : [];
    list.push({ ...payload, serviceLabel: SERVICE_LABELS[payload.service], date: new Date().toISOString() });
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    // localStorage indisponible (navigation privée…) : on continue sans planter
  }
}

/** Champs au format attendu par la table Airtable `Commandes` */
function airtableFields(payload: CommandePayload) {
  return {
    Nom: payload.nom.trim(),
    "Prénom": payload.prenom.trim(),
    Entreprise: payload.entreprise.trim(),
    "Téléphone": payload.telephone.trim(),
    Service: SERVICE_LABELS[payload.service],
  };
}

async function readError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) return data.error;
  } catch {
    /* corps non JSON */
  }
  return fallback;
}

/**
 * Envoie la commande. Résout avec le canal utilisé,
 * ou rejette une CommandeError (commande sauvegardée localement).
 */
export async function submitCommande(payload: CommandePayload): Promise<SubmitResult> {
  // ---- Niveau 1 : proxy serverless (/api/commandes) ----
  try {
    const res = await fetch("/api/commandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { mode: "proxy" };

    // 404 / pas de réponse JSON = hébergeur statique sans fonctions → on tente le niveau 2
    const looksLikeMissingFunction = res.status === 404 || res.status === 405;
    if (!looksLikeMissingFunction) {
      const message = await readError(res, "Le serveur n'a pas pu enregistrer la commande.");
      saveLocally(payload);
      throw new CommandeError(message);
    }
  } catch (err) {
    if (err instanceof CommandeError) throw err;
    // Erreur réseau (proxy injoignable) → on tente le niveau 2
  }

  // ---- Niveau 2 : appel direct navigateur → Airtable (secours) ----
  const token = import.meta.env.VITE_AIRTABLE_TOKEN as string | undefined;
  if (token) {
    const baseId = (import.meta.env.VITE_AIRTABLE_BASE_ID as string | undefined) ?? DEFAULT_BASE_ID;
    const table = (import.meta.env.VITE_AIRTABLE_TABLE as string | undefined) ?? DEFAULT_TABLE;
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: airtableFields(payload) }),
        },
      );
      if (res.ok) return { mode: "direct" };
      saveLocally(payload);
      throw new CommandeError(
        "Airtable a refusé la commande. Réessayez ou passez par WhatsApp.",
      );
    } catch (err) {
      if (err instanceof CommandeError) throw err;
      saveLocally(payload);
      throw new CommandeError(
        "Connexion impossible. Vérifiez votre réseau puis réessayez, ou passez par WhatsApp.",
      );
    }
  }

  // ---- Niveau 3 : mode démo / statique — rien n'est perdu ----
  saveLocally(payload);
  return { mode: "local" };
}
