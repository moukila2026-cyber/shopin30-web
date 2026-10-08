# SHOPIN30 — solutions digitales pour l'Afrique

Site vitrine responsive construit avec React, TypeScript et Vite. Il présente les offres de création de sites web, d'applications web sur mesure et de CRM connectés à WhatsApp, avec les réalisations ComptaCI et KAISSE, un estimateur et un formulaire de contact.

## Démarrage local

```bash
npm install
npm run dev
```

Pour vérifier le build :

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

## Contact et commandes

Aucune base de données n'est utilisée. Le formulaire prépare un message WhatsApp contenant les informations saisies (nom, prénom, entreprise, téléphone et service), puis ouvre la conversation SHOPIN30 au **+225 05 01 30 33 43**. Le visiteur vérifie le message et appuie sur **Envoyer** dans WhatsApp.

Le bouton flottant, les boutons de commande et les liens de contact utilisent le même numéro.

## Prestations

- Site web professionnel : **100 000 à 350 000 FCFA**.
- Application web sur mesure : **200 000 à 400 000 FCFA**.
- CRM connecté à WhatsApp : **100 000 à 250 000 FCFA**.
- Pour les sites web et les applications web (y compris les mini-applications), le nom de domaine ou sous-domaine, l’hébergement, leurs coûts et leurs renouvellements sont précisés dans le devis.
- La maintenance n'est pas incluse dans les forfaits.

## Réalisations

- ComptaCI : https://comptaci.vercel.app
- KAISSE : https://kaissseapp.vercel.app

Les aperçus dessinés dans la section Réalisations sont des maquettes d'interface avec des données illustratives ; les liens ouvrent les App web réelles.

## Structure

- `src/components/` : sections, calculateur, formulaire WhatsApp et maquettes.
- `src/lib/constants.ts` : tarifs, services et coordonnées WhatsApp.
- `src/index.css` : identité visuelle, responsive design et animations.
- `public/` : logo vectoriel et favicon.
- `public-preview/` : build statique utilisé pour l'aperçu public temporaire.
