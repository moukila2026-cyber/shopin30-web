# SHOPIN30 — Guide : Airtable + GitHub + Vercel (formulaire connecté)

> Le formulaire du site envoie chaque commande dans votre base Airtable.
> Base ID : `appRmYF6r2HGZzTWY` — Table : `Commandes`
> Endpoint : `https://api.airtable.com/v0/appRmYF6r2HGZzTWY/Commandes`
> Durée totale : ~15 minutes.

---

## PARTIE 1 — Airtable : créer le jeton d'accès (5 min)

### 1.1 Vérifier votre table `Commandes`
Votre table doit contenir ces colonnes (noms EXACTS, avec accents) :
| Colonne | Type |
|---|---|
| `Nom` | Single line text |
| `Prénom` | Single line text |
| `Entreprise` | Single line text |
| `Téléphone` | Single line text (ou Phone) |
| `Service` | Single select avec EXACTEMENT : `Site web`, `Application web`, `CRM connecté à WhatsApp` |
| `Date de commande` | Created time (automatique) ✅ déjà géré |
| `Statut` | Single select + valeur par défaut (automatique) ✅ déjà géré |

⚠️ Si un nom diffère (espace, accent, majuscule), Airtable refusera l'enregistrement. Le site envoie exactement : `Nom, Prénom, Entreprise, Téléphone, Service`.

### 1.2 Créer le Personal Access Token
1. Allez sur **https://airtable.com** → cliquez votre **avatar** (bas gauche) → **Builder Hub** → **Personal access tokens** → **Create token**.
2. Renseignez :
   - **Name** : `shopin30-site`
   - **Scopes** : cochez `data.records:read` + `data.records:write`
   - **Access** : **uniquement** votre base SHOPIN30 (`appRmYF6r2HGZzTWY`)
3. **Create token** → **copiez le jeton** (`patXXXXXXXX...`). Il ne s'affichera qu'une fois !
4. Envoyez-le-moi séparément (WhatsApp) OU collez-le vous-même à l'étape Vercel ci-dessous.
   - ⛔ Ne le postez jamais en public, ne le commitez jamais dans Git.

---

## PARTIE 2 — GitHub : mettre le projet en ligne (5 min)

### 2.1 Créer le dépôt
1. **https://github.com/new** → **Repository name** : `shopin30-site` → **Public** (ou Private) → **Create repository**.
2. Gardez l'URL (ex. `https://github.com/votre-pseudo/shopin30-site.git`).

### 2.2 Pousser le code
Dans un terminal, à la racine du projet :

```bash
git init
git add .
git commit -m "Site SHOPIN30 : formulaire connecte a Airtable"
git branch -M main
git remote add origin https://github.com/votre-pseudo/shopin30-site.git
git push -u origin main
```

> Mises à jour suivantes : `git add .` → `git commit -m "description"` → `git push` (Vercel redéploie seul ✅).
>
> ⚠️ Ne commitez JAMAIS un fichier `.env` contenant le jeton. Vérifiez `.gitignore` :
> ```
> node_modules
> dist
> .env
> .env.local
> ```

---

## PARTIE 3 — Vercel : site en ligne + jeton caché (5 min)

### 3.1 Importer le projet
1. **https://vercel.com** → Sign Up avec GitHub → **Add New… → Project** → **Import** `shopin30-site`.
2. Framework : **Vite** (auto-détecté). Laissez `npm run build` / `dist`.

### 3.2 Ajouter le jeton CÔTÉ SERVEUR (jeton caché ✅)
Avant **Deploy**, ouvrez **Environment Variables** et ajoutez :
| Name | Value | Environnements |
|---|---|---|
| `AIRTABLE_TOKEN` | `patXXXXXXXX...` (votre jeton) | Production + Preview + Development |

> Notez : `AIRTABLE_TOKEN` **SANS** préfixe `VITE_` → il reste sur le serveur Vercel,
> utilisé uniquement par `api/commandes.js`. Il n'apparaît JAMAIS dans le code du navigateur.
> (Optionnel : `AIRTABLE_BASE_ID` et `AIRTABLE_TABLE` si vous changez de base un jour.)

Cliquez **Deploy**.

### 3.3 Vérifier que tout marche
1. Ouvrez votre URL Vercel (ex. `https://shopin30-site.vercel.app`) sur **Android, iPhone, tablette, PC**.
2. Remplissez le formulaire → vous devez voir :
   **« Votre commande a bien été reçue, nous vous contactons rapidement. »** ✅
3. Dans **Airtable → Commandes** : votre ligne apparaît avec Nom, Prénom, Entreprise, Téléphone, Service + Date/Statut auto. ✅
4. Testez un bouton **-30%** puis chaque bouton **WhatsApp** (`wa.me/2250501303343`).

### 3.4 Test local (optionnel)
```bash
# .env (jamais commité !)
VITE_AIRTABLE_TOKEN=patXXXXXXXX...   # test local uniquement
```
`npm run dev` → testez le formulaire → la ligne arrive dans Airtable.
Pour tester le proxy serverless en local : `npx vercel dev` (avec `AIRTABLE_TOKEN` dans `.env`).

---

## Comment ça marche (résumé technique)

```
Visiteur remplit le formulaire
        │  POST /api/commandes { nom, prenom, entreprise, telephone, service }
        ▼
Vercel (api/commandes.js) — AIRTABLE_TOKEN caché côté serveur
  • valide les champs
  • convertit site/app/crm → "Site web" / "Application web" / "CRM connecté à WhatsApp"
        │  POST https://api.airtable.com/v0/appRmYF6r2HGZzTWY/Commandes
        │  Authorization: Bearer <jeton>  +  { fields: { Nom, Prénom, Entreprise, Téléphone, Service } }
        ▼
Airtable → nouvelle ligne dans Commandes (+ Date de commande / Statut auto)
        │
        ▼
Site affiche : « Votre commande a bien été reçue, nous vous contactons rapidement. »
```

- **Sans proxy** (hébergeur statique pur) : le site tente l'appel direct avec `VITE_AIRTABLE_TOKEN` si défini.
- **Sans aucune config** : stockage local de secours (démo), aucune commande perdue.
- En cas d'échec Airtable : sauvegarde locale + message d'erreur clair (on vous invite à réessayer / WhatsApp).

## En cas de problème
| Symptôme | Cause probable | Solution |
|---|---|---|
| Message d'erreur à l'envoi | `AIRTABLE_TOKEN` absent sur Vercel | Vercel → Settings → Environment Variables → ajouter → **Redeploy** |
| Erreur 502 « Airtable a refusé » | Nom de colonne différent | Vérifiez `Nom, Prénom, Entreprise, Téléphone, Service` au caractère près |
| Erreur 502 « Airtable a refusé » | Valeur Service inconnue | Le select doit contenir exactement `Site web`, `Application web`, `CRM connecté à WhatsApp` |
| Erreur 401/403 | Jeton invalide ou scope insuffisant | Recréez le token avec `data.records:read` + `data.records:write` sur cette base |
| Build Vercel en échec | Erreur de code | Vérifiez `npm run build` en local d'abord |

Bonne mise en ligne ! 🚀
