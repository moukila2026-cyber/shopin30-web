import { SERVICE_LABELS, type ServiceId } from "./constants";

export interface CommandePayload {
  nom: string;
  prenom: string;
  entreprise: string;
  telephone: string;
  service: ServiceId;
}

export class CommandeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommandeError";
  }
}

async function responseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    // Le serveur peut renvoyer une page HTML, notamment en aperçu local.
  }
  return "L'enregistrement est momentanément indisponible. Réessayez ou contactez-nous sur WhatsApp.";
}

function databaseRecord(payload: CommandePayload) {
  return {
    nom: payload.nom.trim(),
    prenom: payload.prenom.trim(),
    entreprise: payload.entreprise.trim() || null,
    telephone: payload.telephone.trim(),
    service: SERVICE_LABELS[payload.service],
  };
}

/**
 * En production, la clé Supabase de service reste côté serveur dans /api/commandes.
 * Pour le développement Vite uniquement, un appel avec la clé anon est disponible
 * si la politique RLS de la migration Supabase est appliquée.
 */
export async function submitCommande(payload: CommandePayload): Promise<void> {
  const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (import.meta.env.DEV && supabaseUrl && anonKey) {
    let directResponse: Response;
    try {
      directResponse = await fetch(`${supabaseUrl}/rest/v1/commandes`, {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(databaseRecord(payload)),
      });
    } catch {
      throw new CommandeError("Connexion à Supabase impossible. Vérifiez votre réseau et la configuration locale.");
    }

    if (!directResponse.ok) throw new CommandeError(await responseError(directResponse));
    return;
  }

  let response: Response;
  try {
    response = await fetch(`${import.meta.env.BASE_URL}api/commandes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new CommandeError("Le serveur ne répond pas. Réessayez ou envoyez-nous votre demande sur WhatsApp.");
  }

  if (response.ok) return;
  if (response.status === 404 || response.status === 405) {
    throw new CommandeError(
      "L'API Supabase n'est pas disponible dans cet aperçu. Configurez le projet Supabase et ses variables d'environnement pour enregistrer votre demande.",
    );
  }
  throw new CommandeError(await responseError(response));
}
