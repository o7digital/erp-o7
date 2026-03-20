# O7 ERP

Première base du dépôt pour cadrer la facture électronique par pays.

Contenu de cette première tranche :

- un noyau TypeScript pour décrire les profils de conformité par pays ;
- deux profils initialisés : `MX` (CFDI 4.0) et `FR` (réforme facture électronique 2026/2027) ;
- des validations de readiness pour les données société, client, facture et plateforme ;
- des tests pour figer les règles de calendrier et de formats.

## Scripts

```bash
npm install
npm test
npm run build
```

## Portée de cette tranche

Cette base ne tente pas encore de générer des flux SAT/PAC ou PDP/PPF. Elle pose le socle produit et technique pour :

- savoir quels champs exiger par pays ;
- savoir à partir de quelle date un tenant est obligé d'émettre ou de recevoir ;
- préparer les futurs modules ERP `customers`, `invoices`, `tax`, `documents`, `integrations`.

## Suite logique

- brancher ce noyau sur le futur backend ERP ;
- persister les identités fiscales, plateformes et statuts de transmission ;
- ajouter les connecteurs réels `PAC` pour le Mexique et `PDP` pour la France.

