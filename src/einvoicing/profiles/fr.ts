import type { ElectronicInvoicingProfile } from "../types";

const largeOrMidMarket = ["LARGE", "MID_MARKET"] as const;
const smallOrMicro = ["SMALL_MEDIUM", "MICRO"] as const;

export const franceProfile: ElectronicInvoicingProfile = {
  country: "FR",
  countryName: "France",
  legalFramework: "Réforme facturation électronique / e-reporting DGFiP-AIFE",
  activeVersion: "2026-2027",
  transmissionModel: "Plateforme agréée (PDP) avec annuaire central et e-reporting",
  supportedFormats: ["FACTUR_X", "UBL_2_1", "CII_16B"],
  milestones: [
    {
      flow: "reception",
      appliesTo: "ALL",
      effectiveFrom: "2026-09-01",
      state: "required",
      note: "Toutes les entreprises doivent pouvoir recevoir des factures électroniques."
    },
    {
      flow: "issuance",
      appliesTo: [...largeOrMidMarket],
      effectiveFrom: "2026-09-01",
      state: "required",
      note: "Les grandes entreprises et ETI doivent émettre électroniquement."
    },
    {
      flow: "issuance",
      appliesTo: [...smallOrMicro],
      effectiveFrom: "2026-09-01",
      state: "available",
      note: "Les PME et micro peuvent anticiper volontairement l'émission électronique."
    },
    {
      flow: "issuance",
      appliesTo: [...smallOrMicro],
      effectiveFrom: "2027-09-01",
      state: "required",
      note: "Les PME et micro doivent émettre électroniquement."
    },
    {
      flow: "e_reporting",
      appliesTo: [...largeOrMidMarket],
      effectiveFrom: "2026-09-01",
      state: "required",
      note: "Le e-reporting suit le même calendrier que l'émission."
    },
    {
      flow: "e_reporting",
      appliesTo: [...smallOrMicro],
      effectiveFrom: "2026-09-01",
      state: "available",
      note: "Les PME et micro peuvent préparer l'e-reporting avant l'obligation."
    },
    {
      flow: "e_reporting",
      appliesTo: [...smallOrMicro],
      effectiveFrom: "2027-09-01",
      state: "required",
      note: "Le e-reporting devient obligatoire pour PME et micro."
    }
  ],
  requiredFields: {
    company: [
      {
        key: "legalName",
        label: "Raison sociale",
        scope: "company",
        description: "Dénomination légale de l'émetteur."
      },
      {
        key: "siret",
        label: "SIRET",
        scope: "company",
        description: "Identifiant établissement utilisé dans les échanges structurés."
      },
      {
        key: "vatNumber",
        label: "TVA intracommunautaire",
        scope: "company",
        description: "Numéro TVA de l'entreprise."
      },
      {
        key: "billingAddressPostalCode",
        label: "Code postal",
        scope: "company",
        description: "Code postal de l'adresse de facturation."
      },
      {
        key: "billingAddressCountry",
        label: "Pays",
        scope: "company",
        description: "Pays de l'adresse de facturation."
      }
    ],
    buyer: [
      {
        key: "legalName",
        label: "Nom client",
        scope: "buyer",
        description: "Dénomination légale du client."
      },
      {
        key: "siret",
        label: "SIRET client",
        scope: "buyer",
        description: "SIRET du client lorsqu'il est assujetti en France."
      },
      {
        key: "vatNumber",
        label: "TVA client",
        scope: "buyer",
        description: "Numéro TVA du client."
      },
      {
        key: "billingAddressPostalCode",
        label: "Code postal client",
        scope: "buyer",
        description: "Code postal de l'adresse de facturation client."
      },
      {
        key: "billingAddressCountry",
        label: "Pays client",
        scope: "buyer",
        description: "Pays de l'adresse de facturation client."
      }
    ],
    invoice: [
      {
        key: "issueDate",
        label: "Date d'émission",
        scope: "invoice",
        description: "Date de la facture."
      },
      {
        key: "invoiceNumber",
        label: "Numéro de facture",
        scope: "invoice",
        description: "Référence unique de la facture."
      },
      {
        key: "supplyDate",
        label: "Date de livraison ou prestation",
        scope: "invoice",
        description: "Date ou période de réalisation de l'opération."
      },
      {
        key: "currency",
        label: "Devise",
        scope: "invoice",
        description: "Devise du document."
      },
      {
        key: "vatBreakdown",
        label: "Ventilation TVA",
        scope: "invoice",
        description: "Ventilation des montants et taux de TVA."
      },
      {
        key: "format",
        label: "Format",
        scope: "invoice",
        description: "Le flux doit être structuré en Factur-X, UBL ou CII."
      }
    ],
    provider: [
      {
        key: "platformType",
        label: "Type de plateforme",
        scope: "provider",
        description: "Plateforme agréée choisie pour les échanges et le reporting."
      },
      {
        key: "platformName",
        label: "Nom de plateforme",
        scope: "provider",
        description: "Nom du partenaire de dématérialisation."
      },
      {
        key: "routingAddress",
        label: "Adresse de routage",
        scope: "provider",
        description: "Adresse de facturation ou identifiant de routage déclaré."
      }
    ]
  },
  notes: [
    "Le PDF simple ou l'email seul ne répondent pas à la réforme B2B française.",
    "Le moteur ERP devra ensuite tracer statuts de cycle de vie, routage annuaire et e-reporting paiement."
  ],
  sources: [
    {
      label: "impots.gouv.fr - Je découvre la facturation électronique",
      url: "https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique",
      checkedAt: "2026-03-20"
    },
    {
      label: "impots.gouv.fr - Facturation électronique et plateformes agréées",
      url: "https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees",
      checkedAt: "2026-03-20"
    },
    {
      label: "AIFE - Facturation électronique interentreprises",
      url: "https://aife.economie.gouv.fr/nos-applications/facturation-electronique-b2b/",
      checkedAt: "2026-03-20"
    }
  ]
};
