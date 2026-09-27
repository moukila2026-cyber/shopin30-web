# SHOPIN30 — Sites web, Apps & CRM WhatsApp pour l'Afrique

Site one-page moderne (React + Vite + Tailwind) avec formulaire de commande connecté à **Airtable**.

- **WhatsApp :** +225 05 01 30 33 43 → https://wa.me/2250501303343
- **Base Airtable :** `appRmYF6r2HGZzTWY` — table `Commandes`
- **Promo :** -30 % pendant 1 mois (code `SHOPIN30`, voir `src/lib/constants.ts`)

## Démarrage local

```bash
npm install
cp .env.example .env   # puis collez votre jeton de TEST dans .env
npm run dev            # http://localhost:5173
npm run build          # vérifie que le build passe (dist/)
```

> Le fichier `.env` ne doit **jamais** être commité (déjà dans `.gitignore`).

## Variables d'environnement

| Variable | Où ? | Obligatoire | Rôle |
|---|---|---|---|
| `AIRTABLE_TOKEN` | Vercel uniquement (serveur) | ✅ Oui en prod | Jeton Airtable, **caché**, utilisé par `api/commandes.js` |
| `AIRTABLE_BASE_ID` | Vercel (serveur, optionnel) | Non | Défaut : `appRmYF6r2HGZzTWY` |
| `AIRTABLE_TABLE` | Vercel (serveur, optionnel) | Non | Défaut : `Commandes` |
| `VITE_AIRTABLE_TOKEN` | `.env` local uniquement | Non | Secours : appel direct navigateur → Airtable (visible, test uniquement) |

Créer le jeton : airtable.com → Avatar → Builder Hub → Personal access tokens → Create token
(`shopin30-site`, scopes `data.records:read` + `data.records:write`, accès = base SHOPIN30 uniquement).

## Déploiement GitHub + Vercel (résumé)

```bash
git init
git add .
git commit -m "Site SHOPIN30 : formulaire connecte a Airtable"
git branch -M main
git remote add origin https://github.com/VOTRE-PSEUDO/shopin30-site.git
git push -u origin main
```

Puis sur **vercel.com** : Add New → Project → Import `shopin30-site` (Vite auto-détecté) →
Environment Variables → ajouter `AIRTABLE_TOKEN` (+ cocher Production/Preview/Development) → Deploy.

Mises à jour : `git add .` → `git commit -m "..."` → `git push` (Vercel redéploie seul).

📖 **Guide complet pas à pas : voir `GUIDE-DEPLOIEMENT.md`.**

## Structure

```
├── api/commandes.js          # Proxy serverless Vercel → Airtable (jeton caché)
├── src/
│   ├── App.tsx               # Assemblage des sections
│   ├── components/           # Header, Hero, Promo, Services, WhyUs, Realisations,
│   │                         # Process, Calculator, FAQ, OrderForm, Footer, WhatsAppFloat…
│   ├── lib/
│   │   ├── airtable.ts       # Envoi commande : proxy → direct → local (secours)
│   │   └── constants.ts      # WhatsApp, promo -30 %, prix, services
│   └── hooks/useCountdown.ts # Compte à rebours de l'offre
├── .env.example              # Modèle des variables (à copier en .env)
├── vercel.json               # Config build Vite + fonctions /api
└── GUIDE-DEPLOIEMENT.md      # Guide Airtable + GitHub + Vercel détaillé
```

## Fonctionnement du formulaire

1. Le visiteur remplit Nom, Prénom, Entreprise, Téléphone, Service.
2. `POST /api/commandes` → validation → conversion `site/app/crm` vers
   `Site web` / `Application web` / `CRM connecté à WhatsApp`.
3. `POST https://api.airtable.com/v0/appRmYF6r2HGZzTWY/Commandes`
   avec `{ Nom, Prénom, Entreprise, Téléphone, Service }`.
4. Airtable ajoute Date de commande + Statut automatiquement.
5. Le site affiche : « Votre commande a bien été reçue, nous vous contactons rapidement. »
