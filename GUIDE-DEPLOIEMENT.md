# SHOPIN30 — guide Supabase et mise en ligne

Ce dépôt est prêt à enregistrer les demandes du formulaire dans Supabase. La base utilise le nom de table `public.commandes` et une fonction Vercel pour garder la clé secrète côté serveur.

> **Organisation Supabase dédiée :** une organisation et un projet Supabase sont des ressources externes à ce dépôt. Ils doivent être créés depuis le compte Supabase du propriétaire du projet. Aucun identifiant Supabase n'est présent dans ce checkout. Ce guide décrit la configuration à faire une seule fois, sans demander de partager une clé secrète dans le chat.

## 1. Créer l'environnement Supabase dédié

1. Connectez-vous à [supabase.com](https://supabase.com) avec le compte qui doit posséder le projet.
2. Créez une nouvelle organisation réservée à SHOPIN30, puis un nouveau projet à l'intérieur.
3. Gardez le nom du projet et la région choisis pour le déploiement. Définissez un mot de passe fort pour la base et conservez-le dans votre gestionnaire de mots de passe.
4. Dans **SQL Editor**, ouvrez une nouvelle requête et exécutez le contenu du fichier :
   `supabase/migrations/20261004000000_create_commandes.sql`.
5. Dans **Table Editor**, vérifiez que `public.commandes` est créée avec les colonnes `nom`, `prenom`, `entreprise`, `telephone`, `service` et `created_at`.

La table applique la sécurité RLS : les visiteurs peuvent uniquement insérer une demande. Les demandes ne sont pas lisibles depuis la clé publique.

## 2. Configurer les secrets de production

Dans Supabase, ouvrez les réglages du projet et récupérez :

- l'URL du projet, par exemple `https://<project-ref>.supabase.co` ;
- la clé secrète JWT `service_role` du projet.

Dans Vercel → **Project → Settings → Environment Variables**, ajoutez pour Production, Preview et Development :

| Nom | Valeur | Exposition |
|---|---|---|
| `SUPABASE_URL` | URL du projet Supabase | Serveur uniquement |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé secrète du projet | Serveur uniquement — jamais `VITE_` |

Enregistrez, puis redéployez le projet. `api/commandes.js` valide les champs et envoie les demandes à Supabase. La clé secrète n'est jamais incluse dans le JavaScript du navigateur.

### Test local Vite (facultatif)

Pour tester le formulaire avec `npm run dev`, créez `.env.local` depuis `.env.example` et renseignez :

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<clé publique anon du projet>
```

Cette clé publique est limitée par la politique RLS de la migration : insertion uniquement, pas de lecture. Ne mettez jamais la clé `service_role` dans une variable `VITE_`.

## 3. Déployer le site sur Vercel

1. Importez le dépôt GitHub dans Vercel. Le framework Vite est détecté automatiquement.
2. Vérifiez les paramètres de build : commande `npm run build`, dossier de sortie `dist`.
3. Ajoutez les deux variables serveur de la section précédente avant ou après le premier déploiement.
4. Déclenchez **Deploy** ou **Redeploy** après l'ajout des variables.

Le fichier `vercel.json` garde la configuration des fonctions API. `/api/commandes` est la route utilisée par le formulaire de production.

## 4. Vérifier l'enregistrement

1. Ouvrez le site déployé et remplissez Nom, Prénom, Téléphone et Type de service.
2. Après l'envoi, le site confirme la réception uniquement si Supabase a enregistré la ligne.
3. Dans Supabase → **Table Editor → commandes**, vérifiez la nouvelle demande et sa date.
4. Testez aussi le lien WhatsApp flottant et le parcours mobile.

Si l'enregistrement ne fonctionne pas, vérifiez l'URL, la clé serveur, le nom `public.commandes`, l'exécution complète de la migration et le dernier déploiement Vercel. La clé `service_role` ne doit être ajoutée qu'aux variables serveur de l'hébergeur.

## Données enregistrées

| Colonne | Contenu |
|---|---|
| `id` | Identifiant UUID généré par Supabase |
| `nom`, `prenom` | Nom et prénom du demandeur |
| `entreprise` | Nom de l'entreprise / business (facultatif) |
| `telephone` | Numéro avec indicatif pays |
| `service` | Site web professionnel, Application web sur mesure ou CRM connecté à WhatsApp |
| `created_at` | Date de réception, générée automatiquement |

La politique RLS autorise l'insertion publique nécessaire au formulaire, mais n'accorde ni consultation ni modification des commandes avec la clé `anon`.
