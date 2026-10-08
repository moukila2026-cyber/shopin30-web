# SHOPIN30 — déploiement du site

Le site ne stocke aucune donnée dans une base. Les demandes sont préparées dans WhatsApp à partir des informations saisies ; le visiteur doit confirmer l'envoi dans WhatsApp.

## Déploiement sur Vercel

1. Importez le dépôt GitHub `moukila2026-cyber/shopin30-web` dans Vercel.
2. Pour tester les changements de cette session, sélectionnez la branche `arena/01a105fd-shopin30-web` (ou déployez la branche principale après fusion).
3. Vérifiez les paramètres : framework **Vite**, commande de build `npm run build`, dossier de sortie `dist`.
4. Aucune variable d'environnement ni aucun secret n'est requis pour le formulaire WhatsApp.
5. Après déploiement, testez sur mobile et ordinateur : le bouton « Envoyer ma demande » ouvre WhatsApp avec le message prérempli. Il faut appuyer sur « Envoyer » dans WhatsApp pour transmettre la demande.

## Coordonnées et tarifs

Le numéro WhatsApp est défini dans `src/lib/constants.ts` au format international sans « + » pour le lien `wa.me`.

- Site web professionnel : 100 000–350 000 FCFA.
- Application web sur mesure : 200 000–400 000 FCFA.
- CRM connecté à WhatsApp : 100 000–250 000 FCFA.

La maintenance n'est incluse dans aucun forfait ; le site invite les prospects à contacter SHOPIN30 sur WhatsApp pour préciser leur besoin.
