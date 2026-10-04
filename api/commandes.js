// API Vercel — enregistrement sécurisé des demandes dans Supabase.
// SUPABASE_SERVICE_ROLE_KEY est uniquement utilisée sur le serveur.

const SERVICE_LABELS = {
  site: "Site web professionnel",
  app: "Application web sur mesure",
  crm: "CRM connecté à WhatsApp",
};
const MAX_LENGTH = 180;

function json(res, status, payload) {
  res
    .status(status)
    .setHeader("Content-Type", "application/json; charset=utf-8")
    .setHeader("Cache-Control", "no-store")
    .send(JSON.stringify(payload));
}

function clean(value, maxLength = MAX_LENGTH) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u001F\u007F]/g, "").slice(0, maxLength) : "";
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Méthode non autorisée." });

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      return json(res, 400, { ok: false, error: "La demande est invalide." });
    }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json(res, 400, { ok: false, error: "La demande est invalide." });
  }

  const nom = clean(body.nom, 100);
  const prenom = clean(body.prenom, 100);
  const entreprise = clean(body.entreprise, 160);
  const telephone = clean(body.telephone, 40);
  const serviceId = typeof body.service === "string" ? body.service : "";
  const service = SERVICE_LABELS[serviceId];

  if (!nom || !prenom || !telephone) {
    return json(res, 400, { ok: false, error: "Merci de renseigner le nom, le prénom et le téléphone." });
  }
  const phoneDigits = telephone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return json(res, 400, { ok: false, error: "Le numéro de téléphone ne semble pas valide." });
  }
  if (!service) return json(res, 400, { ok: false, error: "Choisissez un service proposé par SHOPIN30." });

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[/api/commandes] Variables Supabase manquantes.");
    return json(res, 503, {
      ok: false,
      error: "L'enregistrement des demandes n'est pas encore configuré. Contactez-nous directement sur WhatsApp.",
    });
  }

  try {
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/commandes`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ nom, prenom, entreprise: entreprise || null, telephone, service }),
    });

    if (!supabaseResponse.ok) {
      console.error(`[/api/commandes] Supabase a répondu avec le statut ${supabaseResponse.status}.`);
      return json(res, 502, {
        ok: false,
        error: "La demande n'a pas pu être enregistrée. Réessayez ou contactez-nous sur WhatsApp.",
      });
    }

    return json(res, 201, { ok: true });
  } catch (error) {
    console.error("[/api/commandes] Erreur de connexion à Supabase:", error);
    return json(res, 502, {
      ok: false,
      error: "Connexion à la base indisponible. Réessayez dans un instant ou écrivez-nous sur WhatsApp.",
    });
  }
}
