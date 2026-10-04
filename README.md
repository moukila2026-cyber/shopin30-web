# SHOPIN30 — solutions digitales pour l'Afrique

Site vitrine responsive construit avec React, TypeScript et Vite. Il présente les offres de création de sites web, d'applications web sur mesure et de CRM connectés à WhatsApp, avec réalisations, estimateur de prix et formulaire de demande connecté à Supabase.

## Démarrage local

```bash
npm install
cp .env.example .env.local
npm run dev
```

L'accueil et toutes les sections sont consultables sans configuration. Pour enregistrer réellement les demandes pendant le développement local, renseignez dans `.env.local` `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` après avoir créé le projet Supabase et exécuté la migration SQL. Sinon, le formulaire explique que l'enregistrement n'est pas configuré et propose WhatsApp — il ne simule pas une sauvegarde.

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

## Supabase

- La migration de la table se trouve dans `supabase/migrations/20261004000000_create_commandes.sql`.
- En production, `api/commandes.js` enregistre les demandes dans `public.commandes` côté serveur.
- Variables serveur à définir dans Vercel : `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`.
- Ne préfixez jamais la clé `service_role` avec `VITE_` et ne la commitez pas.
- Pour un test local Vite uniquement, utilisez l'URL et la clé `anon`/publishable (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). La migration autorise l'insertion anonyme, sans autoriser la lecture des demandes.

Consultez `GUIDE-DEPLOIEMENT.md` pour créer l'organisation/le projet Supabase dédié, appliquer la migration et configurer le déploiement.

## Contenu et personnalisation

- `src/lib/constants.ts` : tarifs, services et coordonnées WhatsApp.
- `src/components/` : sections, estimateur, formulaire et maquettes d'interfaces.
- `src/index.css` : identité visuelle, responsive design et animations.
- `public/shopin30-logo.svg` et `public/favicon.svg` : logo vectoriel et favicon.

Le site comprend des maquettes d'interface développées en HTML/CSS pour comptaCI, Kaisse et le tableau de bord du hero. Elles sont clairement présentées comme des aperçus visuels avec données illustratives.
