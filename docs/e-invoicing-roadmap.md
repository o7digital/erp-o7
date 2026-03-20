# Roadmap facture électronique

## Pays démarrés

- `MX` : CFDI 4.0, émission structurée XML avec timbrado via SAT/PAC.
- `FR` : e-invoicing / e-reporting via plateforme agréée, formats structurés `Factur-X`, `UBL`, `CII`.

## Ce qui est couvert maintenant

- registre de conformité par pays ;
- exigences minimales de configuration ;
- calendrier d'obligation ;
- validation du format de facture attendu.

## Ce qu'il faudra ajouter ensuite dans l'ERP

- `tenant_tax_identities`
- `customer_tax_profiles`
- `invoice_compliance_profiles`
- `electronic_invoice_documents`
- `provider_connections`
- `electronic_invoice_events`
- `payment_reporting_events`
- `compliance_audit_logs`

## Découpage conseillé

1. `core/einvoicing`
2. `modules/invoices`
3. `modules/integrations/pac`
4. `modules/integrations/pdp`
5. `modules/compliance/audit`

## Règle d'évolution

- aucune logique pays directement dans `invoice.ts` ;
- toute règle réglementaire passe par un profil pays ;
- les payloads envoyés aux plateformes sont versionnés ;
- chaque transmission garde une trace horodatée et rejouable.

