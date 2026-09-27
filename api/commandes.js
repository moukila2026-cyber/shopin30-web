// ============================================================
// SHOPIN30 — Fonction serverless Vercel : /api/commandes
//
// Reçoit la commande du site, la valide, puis la relaie vers
// Airtable avec le jeton AIRTABLE_TOKEN (caché côté serveur,
// défini dans Vercel → Settings → Environment Variables).
//
// Le jeton n'apparaît JAMAIS dans le code envoyé au navigateur.
// ============================================================

/** Conversion id (site/app/crm) → libellé EXACT du select Airtable */
const SERVICE_LABELS = {
  site: "Site web",
  app: "Application web",
  crm: "CRM connecté à WhatsApp",
};

const DEFAULT_BASE_ID = "appRmYF6r2HGZzTWY";
const DEFAULT_TABLE = "Commandes";
const MAX_LENGTH = 200;

function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.send(JSON.stringify(payload));
}

function cleanString(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

export default async function handler(req, res) {
  // CORS : appels same-origin en pratique, mais on reste permissif sans risque
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "Méthode non autorisée" });
  }

  // ---- Lecture + validation des champs ----
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      return json(res, 400, { ok: false, error: "Corps de requête invalide" });
    }
  }
  body = body ?? {};

  const nom = cleanString(body.nom);
  const prenom = cleanString(body.prenom);
  const entreprise = cleanString(body.entreprise);
  const telephone = cleanString(body.telephone);
  const service = typeof body.service === "string" ? body.service : "";
  const serviceLabel = SERVICE_LABELS[service];

  const missing = [];
  if (!nom) missing.push("Nom");
  if (!prenom) missing.push("Prénom");
  if (!telephone) missing.push("Téléphone");
  if (missing.length > 0) {
    return json(res, 400, {
      ok: false,
      error: `Champs manquants : ${missing.join(", ")}`,
    });
  }
  if (telephone.replace(/\D/g, "").length < 8) {
    return json(res, 400, { ok: false, error: "Numéro de téléphone invalide" });
  }
  if (!serviceLabel) {
    return json(res, 400, {
      ok: false,
      error: "Service inconnu (attendu : site, app ou crm)",
    });
  }

  // ---- Jeton serveur ----
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.error("[/api/commandes] AIRTABLE_TOKEN manquant dans l'environnement");
    return json(res, 500, {
      ok: false,
      error:
        "Configuration serveur incomplète (AIRTABLE_TOKEN). Ajoutez-la dans Vercel → Settings → Environment Variables, puis redeployez.",
    });
  }

  const baseId = process.env.AIRTABLE_BASE_ID || DEFAULT_BASE_ID;
  const table = process.env.AIRTABLE_TABLE || DEFAULT_TABLE;

  // ---- Relais vers Airtable ----
  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Nom: nom,
            "Prénom": prenom,
            Entreprise: entreprise,
            "Téléphone": telephone,
            Service: serviceLabel,
          },
        }),
      },
    );

    if (!airtableRes.ok) {
      const detail = await airtableRes.text();
      console.error(`[/api/commandes] Airtable ${airtableRes.status} : ${detail}`);
      return json(res, 502, {
        ok: false,
        error:
          "Airtable a refusé l'enregistrement. Vérifiez les noms de colonnes (Nom, Prénom, Entreprise, Téléphone, Service) et les valeurs du select Service.",
      });
    }

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("[/api/commandes] Erreur réseau vers Airtable :", err);
    return json(res, 502, {
      ok: false,
      error: "Impossible de joindre Airtable. Réessayez dans un instant.",
    });
  }
}
