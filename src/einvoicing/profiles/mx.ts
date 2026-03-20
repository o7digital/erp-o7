import type { ElectronicInvoicingProfile } from "../types";

export const mexicoProfile: ElectronicInvoicingProfile = {
  country: "MX",
  countryName: "Mexico",
  legalFramework: "CFDI 4.0 / SAT",
  activeVersion: "4.0",
  transmissionModel: "XML timbrado via SAT o PAC",
  supportedFormats: ["CFDI_4_0_XML", "PDF_REPRESENTATION"],
  milestones: [
    {
      flow: "issuance",
      appliesTo: "ALL",
      effectiveFrom: "2023-04-01",
      state: "required",
      note: "La version 4.0 du CFDI est la seule version valide."
    },
    {
      flow: "reception",
      appliesTo: "ALL",
      effectiveFrom: "2023-04-01",
      state: "required",
      note: "Le récepteur doit être identifié avec les données fiscales attendues par le CFDI 4.0."
    }
  ],
  requiredFields: {
    company: [
      {
        key: "legalName",
        label: "Raison sociale",
        scope: "company",
        description: "Nom ou raison sociale tel qu'enregistré auprès du SAT."
      },
      {
        key: "rfc",
        label: "RFC émetteur",
        scope: "company",
        description: "Identifiant fiscal du contribuable émetteur."
      },
      {
        key: "taxRegimeCode",
        label: "Régimen fiscal",
        scope: "company",
        description: "Clé de régime fiscal de l'émetteur."
      },
      {
        key: "fiscalZipCode",
        label: "Código postal fiscal",
        scope: "company",
        description: "Code postal du domicile fiscal de l'émetteur."
      }
    ],
    buyer: [
      {
        key: "legalName",
        label: "Nom du récepteur",
        scope: "buyer",
        description: "Nom tel qu'enregistré dans la constancia fiscal."
      },
      {
        key: "rfc",
        label: "RFC récepteur",
        scope: "buyer",
        description: "RFC du client destinataire."
      },
      {
        key: "taxRegimeCode",
        label: "Régimen fiscal récepteur",
        scope: "buyer",
        description: "Régime fiscal du récepteur."
      },
      {
        key: "fiscalZipCode",
        label: "Código postal récepteur",
        scope: "buyer",
        description: "Code postal du domicile fiscal du récepteur."
      },
      {
        key: "cfdiUse",
        label: "Uso CFDI",
        scope: "buyer",
        description: "Usage fiscal déclaré par le récepteur."
      }
    ],
    invoice: [
      {
        key: "issueDate",
        label: "Date d'émission",
        scope: "invoice",
        description: "Date/heure d'émission du CFDI."
      },
      {
        key: "documentType",
        label: "Tipo de comprobante",
        scope: "invoice",
        description: "Type du CFDI, par exemple I pour ingreso."
      },
      {
        key: "currency",
        label: "Monnaie",
        scope: "invoice",
        description: "Devise du document."
      },
      {
        key: "paymentMethod",
        label: "Método de pago",
        scope: "invoice",
        description: "Méthode de paiement, par exemple PUE ou PPD."
      },
      {
        key: "paymentWay",
        label: "Forma de pago",
        scope: "invoice",
        description: "Code de forme de paiement du catalogue SAT."
      },
      {
        key: "placeOfIssueZipCode",
        label: "Lugar de expedición",
        scope: "invoice",
        description: "Code postal du lieu d'émission."
      },
      {
        key: "taxObjectCode",
        label: "Objeto de impuesto",
        scope: "invoice",
        description: "Code indiquant si le concept est objet d'impôt."
      },
      {
        key: "format",
        label: "Format",
        scope: "invoice",
        description: "Le flux officiel doit être émis en XML CFDI 4.0."
      }
    ],
    provider: [
      {
        key: "stampingMode",
        label: "Mode de timbrado",
        scope: "provider",
        description: "Mode d'émission, SAT ou PAC."
      },
      {
        key: "platformName",
        label: "Prestataire de certification",
        scope: "provider",
        description: "Nom du PAC ou du service utilisé pour timbrer."
      }
    ]
  },
  notes: [
    "Le PDF seul n'est pas le document fiscal opposable. Le flux de référence est le XML CFDI 4.0.",
    "Le moteur ERP devra ensuite gérer timbrado, cancelación et accusés."
  ],
  sources: [
    {
      label: "SAT - Factura electrónica CFDI 4.0",
      url: "https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1461175167996&ssbinary=true",
      checkedAt: "2026-03-20"
    },
    {
      label: "SAT - Formato de Factura (Anexo 20)",
      url: "https://wwwmat.sat.gob.mx/consultas/35025/formato-de-factura-electronica-%28anexo-20%29",
      checkedAt: "2026-03-20"
    }
  ]
};
