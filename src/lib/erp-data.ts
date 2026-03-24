import {
  getComplianceStatus,
  getCountryProfile,
  listCountryProfiles,
  validateSetup
} from "@/einvoicing/registry";
import type { CountryCode, EInvoicingSetup } from "@/einvoicing/types";
import type {
  ComplianceCountrySetting,
  ElectronicInvoiceStatus,
  ErpInvoiceStatus
} from "@/lib/erp-types";

export const workspaceProfile = {
  productName: "O7 ERP SaaS",
  workspaceName: "Pulse Workspace Americas",
  planName: "Growth",
  activeSeats: 18,
  seatLimit: 25,
  locale: "en-US",
  defaultCurrency: "USD"
};

export interface ClientRecord {
  id: string;
  name: string;
  country: CountryCode;
  sector: string;
  owner: string;
  arr: number;
  currency: string;
  openInvoices: number;
  compliance: string;
  tags: string[];
}

export const clients: ClientRecord[] = [
  {
    id: "cli-asteria",
    name: "Asteria Studio",
    country: "FR",
    sector: "Agence digitale",
    owner: "Nadia",
    arr: 42000,
    currency: "USD",
    openInvoices: 2,
    compliance: "PDP ready",
    tags: ["retainer", "france"]
  },
  {
    id: "cli-grupo-nativo",
    name: "Grupo Nativo",
    country: "MX",
    sector: "Services terrain",
    owner: "Luis",
    arr: 51000,
    currency: "USD",
    openInvoices: 1,
    compliance: "Timbrado ready",
    tags: ["mexico", "field"]
  },
  {
    id: "cli-delta",
    name: "Delta Conseil",
    country: "FR",
    sector: "Conseil B2B",
    owner: "Alicia",
    arr: 29000,
    currency: "USD",
    openInvoices: 3,
    compliance: "Review routing",
    tags: ["france", "consulting"]
  },
  {
    id: "cli-nova",
    name: "Nova Servicios",
    country: "MX",
    sector: "Support ops",
    owner: "Luis",
    arr: 36000,
    currency: "USD",
    openInvoices: 2,
    compliance: "Validation required",
    tags: ["mexico", "operations"]
  }
];

export const contacts = [
  {
    id: "ct-1",
    name: "Sophie Martin",
    client: "Asteria Studio",
    title: "Directrice financiere",
    email: "s.martin@asteria.fr",
    phone: "+33 6 11 22 33 44",
    lastTouch: "2026-03-18",
    status: "Active"
  },
  {
    id: "ct-2",
    name: "Jorge Ramirez",
    client: "Grupo Nativo",
    title: "Controller",
    email: "jorge@gruponativo.mx",
    phone: "+52 55 1122 3344",
    lastTouch: "2026-03-19",
    status: "Active"
  },
  {
    id: "ct-3",
    name: "Claire Dubois",
    client: "Delta Conseil",
    title: "Office manager",
    email: "claire@deltaconseil.fr",
    phone: "+33 6 55 44 33 22",
    lastTouch: "2026-03-15",
    status: "Waiting reply"
  },
  {
    id: "ct-4",
    name: "Paula Vega",
    client: "Nova Servicios",
    title: "Admin y facturacion",
    email: "paula@novaservicios.mx",
    phone: "+52 81 5566 7788",
    lastTouch: "2026-03-17",
    status: "Needs tax update"
  }
];

export const tasks = [
  {
    id: "tsk-1",
    title: "Valider identite fiscale client Delta",
    client: "Delta Conseil",
    owner: "Alicia",
    dueDate: "2026-03-21",
    priority: "High",
    status: "In progress"
  },
  {
    id: "tsk-2",
    title: "Envoyer relance facture FAC-FR-2026-0143",
    client: "Asteria Studio",
    owner: "Nadia",
    dueDate: "2026-03-20",
    priority: "Medium",
    status: "Due today"
  },
  {
    id: "tsk-3",
    title: "Configurer serie CFDI Monterrey",
    client: "Nova Servicios",
    owner: "Luis",
    dueDate: "2026-03-22",
    priority: "High",
    status: "Blocked"
  },
  {
    id: "tsk-4",
    title: "Verifier permissions Finance France",
    client: "Interne",
    owner: "Marc",
    dueDate: "2026-03-25",
    priority: "Low",
    status: "Scheduled"
  }
];

export const deals = [
  {
    id: "deal-1",
    name: "Retainer 2026 Asteria",
    client: "Asteria Studio",
    stage: "Negotiation",
    amount: 18000,
    currency: "USD",
    probability: 70,
    owner: "Nadia",
    nextStep: "Relecture devis"
  },
  {
    id: "deal-2",
    name: "Deploy finance ops MX",
    client: "Grupo Nativo",
    stage: "Proposal sent",
    amount: 22000,
    currency: "USD",
    probability: 55,
    owner: "Luis",
    nextStep: "Valider CFDI flow"
  },
  {
    id: "deal-3",
    name: "Migration ERP Delta",
    client: "Delta Conseil",
    stage: "Qualified",
    amount: 12000,
    currency: "USD",
    probability: 45,
    owner: "Alicia",
    nextStep: "Workshop mapping"
  }
];

export const pipelineStages = [
  { id: "stg-1", name: "Qualified", deals: 1, amount: 12000 },
  { id: "stg-2", name: "Proposal sent", deals: 1, amount: 22000 },
  { id: "stg-3", name: "Negotiation", deals: 1, amount: 18000 },
  { id: "stg-4", name: "Won", deals: 2, amount: 64000 }
];

export const quotes = [
  {
    id: "quo-1",
    number: "DEV-2026-021",
    client: "Asteria Studio",
    amount: 9800,
    currency: "USD",
    status: "Approved",
    validUntil: "2026-03-29",
    owner: "Nadia"
  },
  {
    id: "quo-2",
    number: "DEV-2026-022",
    client: "Grupo Nativo",
    amount: 12000,
    currency: "USD",
    status: "Sent",
    validUntil: "2026-03-27",
    owner: "Luis"
  },
  {
    id: "quo-3",
    number: "DEV-2026-023",
    client: "Delta Conseil",
    amount: 6400,
    currency: "USD",
    status: "Draft",
    validUntil: "2026-04-02",
    owner: "Alicia"
  }
];

export const orders = [
  {
    id: "ord-1",
    number: "CMD-FR-301",
    client: "Asteria Studio",
    amount: 9800,
    currency: "USD",
    fulfillment: "Ready",
    invoicing: "Invoiced",
    status: "Active"
  },
  {
    id: "ord-2",
    number: "CMD-MX-188",
    client: "Grupo Nativo",
    amount: 12000,
    currency: "USD",
    fulfillment: "In progress",
    invoicing: "Pending",
    status: "Active"
  },
  {
    id: "ord-3",
    number: "CMD-FR-302",
    client: "Delta Conseil",
    amount: 6400,
    currency: "USD",
    fulfillment: "Blocked",
    invoicing: "Draft",
    status: "At risk"
  }
];

export interface InvoiceLine {
  id: string;
  label: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface InvoiceRecord {
  id: string;
  number: string;
  client: string;
  clientId: string;
  country: CountryCode;
  currency: string;
  issueDate: string;
  dueDate: string;
  total: number;
  balance: number;
  businessStatus: ErpInvoiceStatus;
  electronicStatus: ElectronicInvoiceStatus;
  providerStatus: string;
  format: string;
  series: string;
  provider: string;
  owner: string;
  taxIdentityId: string;
  payloadRefs: { id: string; type: string; storage: string; status: string }[];
  lines: InvoiceLine[];
  setup: EInvoicingSetup;
}

export const invoices: InvoiceRecord[] = [
  {
    id: "inv-fr-142",
    number: "FAC-FR-2026-0142",
    client: "Asteria Studio",
    clientId: "cli-asteria",
    country: "FR",
    currency: "USD",
    issueDate: "2026-03-18",
    dueDate: "2026-03-31",
    total: 9800,
    balance: 2800,
    businessStatus: "partially_paid",
    electronicStatus: "submitted",
    providerStatus: "ready",
    format: "FACTUR_X",
    series: "FAC-FR",
    provider: "PDP Axway Sandbox",
    owner: "Nadia",
    taxIdentityId: "tax-fr-paris",
    payloadRefs: [
      {
        id: "payload-1",
        type: "factur-x",
        storage: "s3://erp-o7/fr/FAC-FR-2026-0142.xml",
        status: "Stored"
      },
      {
        id: "payload-2",
        type: "submission-json",
        storage: "s3://erp-o7/fr/FAC-FR-2026-0142-submission.json",
        status: "Stored"
      }
    ],
    lines: [
      { id: "line-1", label: "Retainer mars", quantity: 1, unitPrice: 6500, taxRate: 20, total: 7800 },
      { id: "line-2", label: "Pilotage KPI", quantity: 2, unitPrice: 1000, taxRate: 20, total: 2400 }
    ],
    setup: {
      country: "FR",
      companySize: "SMALL_MEDIUM",
      company: {
        legalName: "O7 DIGITAL FRANCE SAS",
        siret: "12345678900012",
        vatNumber: "FR12123456789",
        billingAddressPostalCode: "75008",
        billingAddressCountry: "FR"
      },
      buyer: {
        legalName: "Asteria Studio SAS",
        siret: "49382746500021",
        vatNumber: "FR93493827465",
        billingAddressPostalCode: "75011",
        billingAddressCountry: "FR"
      },
      invoice: {
        issueDate: "2026-03-18",
        invoiceNumber: "FAC-FR-2026-0142",
        supplyDate: "2026-03-18",
        currency: "USD",
        vatBreakdown: "20",
        format: "FACTUR_X"
      },
      provider: {
        platformType: "PDP",
        platformName: "PDP Axway Sandbox",
        routingAddress: "finance@asteria.fr"
      }
    }
  },
  {
    id: "inv-mx-45",
    number: "CFDI-MX-2026-0045",
    client: "Grupo Nativo",
    clientId: "cli-grupo-nativo",
    country: "MX",
    currency: "MXN",
    issueDate: "2026-03-19",
    dueDate: "2026-03-26",
    total: 215000,
    balance: 0,
    businessStatus: "paid",
    electronicStatus: "accepted",
    providerStatus: "ready",
    format: "CFDI_4_0_XML",
    series: "CFDI-MTY",
    provider: "PAC Finkok Sandbox",
    owner: "Luis",
    taxIdentityId: "tax-mx-mty",
    payloadRefs: [
      {
        id: "payload-3",
        type: "cfdi-xml",
        storage: "s3://erp-o7/mx/CFDI-MX-2026-0045.xml",
        status: "Stored"
      }
    ],
    lines: [
      { id: "line-3", label: "Mesa de control", quantity: 1, unitPrice: 150000, taxRate: 16, total: 174000 },
      { id: "line-4", label: "Soporte operativo", quantity: 1, unitPrice: 35344.83, taxRate: 16, total: 41000 }
    ],
    setup: {
      country: "MX",
      companySize: "SMALL_MEDIUM",
      company: {
        legalName: "O7 DIGITAL MEXICO SA DE CV",
        rfc: "ABC010203AB1",
        taxRegimeCode: "601",
        fiscalZipCode: "11560"
      },
      buyer: {
        legalName: "GRUPO NATIVO SA DE CV",
        rfc: "GNA020304CD2",
        taxRegimeCode: "601",
        fiscalZipCode: "64000",
        cfdiUse: "G03"
      },
      invoice: {
        issueDate: "2026-03-19",
        documentType: "I",
        currency: "MXN",
        paymentMethod: "PUE",
        paymentWay: "03",
        placeOfIssueZipCode: "11560",
        taxObjectCode: "02",
        format: "CFDI_4_0_XML"
      },
      provider: {
        stampingMode: "PAC",
        platformName: "PAC Finkok Sandbox"
      }
    }
  },
  {
    id: "inv-fr-143",
    number: "FAC-FR-2026-0143",
    client: "Delta Conseil",
    clientId: "cli-delta",
    country: "FR",
    currency: "USD",
    issueDate: "2026-03-20",
    dueDate: "2026-04-03",
    total: 6400,
    balance: 6400,
    businessStatus: "draft",
    electronicStatus: "ready_to_submit",
    providerStatus: "ready",
    format: "FACTUR_X",
    series: "FAC-FR",
    provider: "PDP Axway Sandbox",
    owner: "Alicia",
    taxIdentityId: "tax-fr-paris",
    payloadRefs: [],
    lines: [
      { id: "line-5", label: "Atelier cadrage", quantity: 2, unitPrice: 2000, taxRate: 20, total: 4800 },
      { id: "line-6", label: "Mapping Access", quantity: 1, unitPrice: 1333.33, taxRate: 20, total: 1600 }
    ],
    setup: {
      country: "FR",
      companySize: "SMALL_MEDIUM",
      company: {
        legalName: "O7 DIGITAL FRANCE SAS",
        siret: "12345678900012",
        vatNumber: "FR12123456789",
        billingAddressPostalCode: "75008",
        billingAddressCountry: "FR"
      },
      buyer: {
        legalName: "Delta Conseil SAS",
        siret: "55112233400016",
        vatNumber: "FR66551122334",
        billingAddressPostalCode: "69002",
        billingAddressCountry: "FR"
      },
      invoice: {
        issueDate: "2026-03-20",
        invoiceNumber: "FAC-FR-2026-0143",
        supplyDate: "2026-03-20",
        currency: "USD",
        vatBreakdown: "20",
        format: "FACTUR_X"
      },
      provider: {
        platformType: "PDP",
        platformName: "PDP Axway Sandbox"
      }
    }
  },
  {
    id: "inv-mx-46",
    number: "CFDI-MX-2026-0046",
    client: "Nova Servicios",
    clientId: "cli-nova",
    country: "MX",
    currency: "MXN",
    issueDate: "2026-03-20",
    dueDate: "2026-03-28",
    total: 118000,
    balance: 118000,
    businessStatus: "issued",
    electronicStatus: "rejected",
    providerStatus: "validation_error",
    format: "CFDI_4_0_XML",
    series: "CFDI-MTY",
    provider: "PAC Finkok Sandbox",
    owner: "Luis",
    taxIdentityId: "tax-mx-mty",
    payloadRefs: [
      {
        id: "payload-4",
        type: "cfdi-xml",
        storage: "s3://erp-o7/mx/CFDI-MX-2026-0046.xml",
        status: "Rejected"
      }
    ],
    lines: [
      { id: "line-7", label: "Backoffice mensual", quantity: 1, unitPrice: 101724.14, taxRate: 16, total: 118000 }
    ],
    setup: {
      country: "MX",
      companySize: "SMALL_MEDIUM",
      company: {
        legalName: "O7 DIGITAL MEXICO SA DE CV",
        rfc: "ABC010203AB1",
        taxRegimeCode: "601",
        fiscalZipCode: "11560"
      },
      buyer: {
        legalName: "NOVA SERVICIOS SA DE CV",
        rfc: "NSV220101ZZ9",
        taxRegimeCode: "626",
        fiscalZipCode: "64000"
      },
      invoice: {
        issueDate: "2026-03-20",
        documentType: "I",
        currency: "MXN",
        paymentMethod: "PPD",
        paymentWay: "99",
        placeOfIssueZipCode: "11560",
        taxObjectCode: "02",
        format: "CFDI_4_0_XML"
      },
      provider: {
        stampingMode: "PAC",
        platformName: "PAC Finkok Sandbox"
      }
    }
  }
];

export const invoiceMap = new Map(invoices.map((invoice) => [invoice.id, invoice]));

export function getInvoiceById(id: string) {
  return invoiceMap.get(id);
}

export const invoiceValidations = invoices.map((invoice) => ({
  invoiceId: invoice.id,
  invoiceNumber: invoice.number,
  country: invoice.country,
  issues: validateSetup(invoice.setup)
}));

export const payments = [
  {
    id: "pay-1",
    invoiceId: "inv-fr-142",
    invoiceNumber: "FAC-FR-2026-0142",
    client: "Asteria Studio",
    amount: 7000,
    currency: "USD",
    method: "SEPA",
    paidAt: "2026-03-19",
    status: "paid"
  },
  {
    id: "pay-2",
    invoiceId: "inv-mx-45",
    invoiceNumber: "CFDI-MX-2026-0045",
    client: "Grupo Nativo",
    amount: 0,
    currency: "MXN",
    method: "Transfer",
    paidAt: "2026-03-26",
    status: "scheduled"
  },
  {
    id: "pay-3",
    invoiceId: "inv-mx-46",
    invoiceNumber: "CFDI-MX-2026-0046",
    client: "Nova Servicios",
    amount: 0,
    currency: "MXN",
    method: "Transfer",
    paidAt: "2026-03-28",
    status: "blocked"
  }
];

export const documents = [
  {
    id: "doc-1",
    name: "Bon de commande Asteria",
    type: "Order attachment",
    client: "Asteria Studio",
    linkedTo: "CMD-FR-301",
    storage: "S3 US",
    status: "Stored"
  },
  {
    id: "doc-2",
    name: "XML CFDI 0045",
    type: "Invoice payload",
    client: "Grupo Nativo",
    linkedTo: "CFDI-MX-2026-0045",
    storage: "S3 MX",
    status: "Stored"
  },
  {
    id: "doc-3",
    name: "Factur-X FAC-FR-2026-0142",
    type: "Invoice payload",
    client: "Asteria Studio",
    linkedTo: "FAC-FR-2026-0142",
    storage: "S3 US",
    status: "Stored"
  }
];

export const contracts = [
  {
    id: "ctr-1",
    name: "MSA Asteria 2026",
    client: "Asteria Studio",
    renewalDate: "2026-12-31",
    value: 42000,
    currency: "USD",
    status: "Active"
  },
  {
    id: "ctr-2",
    name: "Operacion MX Grupo Nativo",
    client: "Grupo Nativo",
    renewalDate: "2026-09-30",
    value: 215000,
    currency: "MXN",
    status: "Signature pending"
  }
];

export const users = [
  {
    id: "usr-1",
    name: "Nadia Laurent",
    email: "nadia@o7.digital",
    role: "Sales Admin",
    region: "FR",
    status: "Active",
    lastSeen: "2026-03-20 09:14"
  },
  {
    id: "usr-2",
    name: "Luis Navarro",
    email: "luis@o7.digital",
    role: "Finance Ops MX",
    region: "MX",
    status: "Active",
    lastSeen: "2026-03-20 08:48"
  },
  {
    id: "usr-3",
    name: "Alicia Gomez",
    email: "alicia@o7.digital",
    role: "Implementation Lead",
    region: "FR",
    status: "Active",
    lastSeen: "2026-03-19 18:10"
  },
  {
    id: "usr-4",
    name: "Marc Favier",
    email: "marc@o7.digital",
    role: "Owner",
    region: "Global",
    status: "MFA review",
    lastSeen: "2026-03-20 09:31"
  }
];

export const roles = [
  {
    id: "role-1",
    name: "Owner",
    users: 1,
    permissions: [
      "tenants.manage",
      "billing.manage",
      "compliance.manage",
      "users.manage"
    ]
  },
  {
    id: "role-2",
    name: "Sales Admin",
    users: 1,
    permissions: [
      "clients.manage",
      "quotes.manage",
      "orders.manage",
      "invoices.read"
    ]
  },
  {
    id: "role-3",
    name: "Finance Ops MX",
    users: 1,
    permissions: [
      "invoices.manage",
      "payments.manage",
      "compliance.mexico",
      "documents.read"
    ]
  },
  {
    id: "role-4",
    name: "Implementation Lead",
    users: 1,
    permissions: [
      "tasks.manage",
      "pipeline.manage",
      "documents.manage",
      "contracts.read"
    ]
  }
];

export const permissionCatalog = [
  "tenants.manage",
  "users.manage",
  "roles.manage",
  "clients.manage",
  "contacts.manage",
  "tasks.manage",
  "pipeline.manage",
  "quotes.manage",
  "orders.manage",
  "invoices.read",
  "invoices.manage",
  "payments.manage",
  "documents.manage",
  "contracts.manage",
  "compliance.manage",
  "compliance.france",
  "compliance.mexico",
  "billing.manage"
];

export const taxIdentities = [
  {
    id: "tax-fr-paris",
    country: "FR" as CountryCode,
    label: "O7 France Entity",
    legalName: "O7 DIGITAL FRANCE SAS",
    taxId: "FR12123456789",
    secondaryId: "12345678900012",
    regime: "TVA reelle normale",
    postalCode: "75008",
    invoiceSeries: "FAC-FR",
    providerStatus: "ready"
  },
  {
    id: "tax-mx-mty",
    country: "MX" as CountryCode,
    label: "O7 Mexico Norte",
    legalName: "O7 DIGITAL MEXICO SA DE CV",
    taxId: "ABC010203AB1",
    secondaryId: "601",
    regime: "General de Ley Personas Morales",
    postalCode: "11560",
    invoiceSeries: "CFDI-MTY",
    providerStatus: "ready"
  }
];

export const taxProfiles = [
  {
    id: "tax-profile-fr",
    country: "FR" as CountryCode,
    profileName: "FR B2B services 20%",
    rates: "20%",
    collectionModel: "TVA collecte"
  },
  {
    id: "tax-profile-mx",
    country: "MX" as CountryCode,
    profileName: "MX services IVA 16%",
    rates: "16%",
    collectionModel: "IVA trasladado"
  }
];

export const invoiceSeries = [
  {
    id: "series-fr",
    country: "FR" as CountryCode,
    code: "FAC-FR",
    nextNumber: "0144",
    formatPattern: "FAC-FR-{YEAR}-{SEQ}",
    status: "active"
  },
  {
    id: "series-mx",
    country: "MX" as CountryCode,
    code: "CFDI-MTY",
    nextNumber: "0047",
    formatPattern: "CFDI-MX-{YEAR}-{SEQ}",
    status: "active"
  }
];

export const providerConnections = [
  {
    id: "prov-1",
    country: "FR" as CountryCode,
    type: "PDP",
    name: "PDP Axway Sandbox",
    mode: "sandbox",
    status: "connected",
    lastSync: "2026-03-20 08:55"
  },
  {
    id: "prov-2",
    country: "MX" as CountryCode,
    type: "PAC",
    name: "PAC Finkok Sandbox",
    mode: "sandbox",
    status: "connected",
    lastSync: "2026-03-20 09:02"
  },
  {
    id: "prov-3",
    country: "FR" as CountryCode,
    type: "PDP",
    name: "PDP Prod cible",
    mode: "pending",
    status: "review",
    lastSync: "2026-03-18 11:20"
  }
];

export const electronicInvoiceEvents = [
  {
    id: "evt-1",
    invoiceId: "inv-fr-142",
    invoiceNumber: "FAC-FR-2026-0142",
    country: "FR" as CountryCode,
    type: "validation",
    status: "accepted",
    provider: "PDP Axway Sandbox",
    occurredAt: "2026-03-18 14:12",
    message: "Payload Factur-X valide et routable."
  },
  {
    id: "evt-2",
    invoiceId: "inv-fr-142",
    invoiceNumber: "FAC-FR-2026-0142",
    country: "FR" as CountryCode,
    type: "submission",
    status: "submitted",
    provider: "PDP Axway Sandbox",
    occurredAt: "2026-03-18 14:15",
    message: "Soumission envoyee a la plateforme."
  },
  {
    id: "evt-3",
    invoiceId: "inv-mx-45",
    invoiceNumber: "CFDI-MX-2026-0045",
    country: "MX" as CountryCode,
    type: "validation",
    status: "accepted",
    provider: "PAC Finkok Sandbox",
    occurredAt: "2026-03-19 10:22",
    message: "RFC, regimen et uso CFDI conformes."
  },
  {
    id: "evt-4",
    invoiceId: "inv-mx-46",
    invoiceNumber: "CFDI-MX-2026-0046",
    country: "MX" as CountryCode,
    type: "rejection",
    status: "rejected",
    provider: "PAC Finkok Sandbox",
    occurredAt: "2026-03-20 09:14",
    message: "Uso CFDI manquant sur le recepteur."
  }
];

export const submissionLogs = [
  {
    id: "sub-1",
    provider: "PDP Axway Sandbox",
    invoiceNumber: "FAC-FR-2026-0142",
    endpoint: "/pdp/submissions",
    requestId: "fr-req-141",
    status: "202 accepted",
    createdAt: "2026-03-18 14:15"
  },
  {
    id: "sub-2",
    provider: "PAC Finkok Sandbox",
    invoiceNumber: "CFDI-MX-2026-0045",
    endpoint: "/pac/stamp",
    requestId: "mx-req-045",
    status: "200 validated",
    createdAt: "2026-03-19 10:23"
  },
  {
    id: "sub-3",
    provider: "PAC Finkok Sandbox",
    invoiceNumber: "CFDI-MX-2026-0046",
    endpoint: "/pac/stamp",
    requestId: "mx-req-046",
    status: "422 rejected",
    createdAt: "2026-03-20 09:14"
  }
];

export const rejectionLogs = [
  {
    id: "rej-1",
    invoiceNumber: "CFDI-MX-2026-0046",
    country: "MX" as CountryCode,
    field: "cfdiUse",
    code: "CFDI40162",
    message: "Uso CFDI requerido para receptor."
  }
];

export const activities = [
  {
    id: "act-1",
    entity: "FAC-FR-2026-0142",
    event: "Soumission PDP envoyee",
    actor: "Nadia",
    occurredAt: "2026-03-18 14:15"
  },
  {
    id: "act-2",
    entity: "CFDI-MX-2026-0045",
    event: "Validation fiscale MX terminee",
    actor: "Luis",
    occurredAt: "2026-03-19 10:22"
  },
  {
    id: "act-3",
    entity: "Delta Conseil",
    event: "Contact fiscal a relancer",
    actor: "Alicia",
    occurredAt: "2026-03-19 17:05"
  },
  {
    id: "act-4",
    entity: "Workspace",
    event: "Role Finance Ops MX modifie",
    actor: "Marc",
    occurredAt: "2026-03-20 08:10"
  }
];

export const auditLogs = [
  {
    id: "aud-1",
    area: "compliance",
    action: "provider_connection.updated",
    actor: "Marc",
    target: "PDP Prod cible",
    createdAt: "2026-03-18 11:21"
  },
  {
    id: "aud-2",
    area: "users",
    action: "role.assigned",
    actor: "Marc",
    target: "Luis Navarro",
    createdAt: "2026-03-19 09:10"
  },
  {
    id: "aud-3",
    area: "invoices",
    action: "invoice.submitted",
    actor: "Nadia",
    target: "FAC-FR-2026-0142",
    createdAt: "2026-03-18 14:15"
  }
];

export const jurisdictionProfiles = listCountryProfiles().map((profile) => ({
  country: profile.country,
  countryName: profile.countryName,
  activeVersion: profile.activeVersion,
  transmissionModel: profile.transmissionModel,
  supportedFormats: profile.supportedFormats,
  obligations: getComplianceStatus(profile.country, "SMALL_MEDIUM", new Date("2026-03-20"))
}));

export const complianceRules = [
  {
    id: "rule-fr-1",
    country: "FR" as CountryCode,
    code: "FR_FORMAT_STRUCTURED",
    description: "Facture B2B FR emise en Factur-X, UBL ou CII.",
    status: "Required"
  },
  {
    id: "rule-fr-2",
    country: "FR" as CountryCode,
    code: "FR_PDP_ROUTING",
    description: "Routage via plateforme agreee et journal de transmission.",
    status: "Required"
  },
  {
    id: "rule-mx-1",
    country: "MX" as CountryCode,
    code: "MX_CFDI_XML",
    description: "Emission XML CFDI 4.0 timbrado-ready.",
    status: "Required"
  },
  {
    id: "rule-mx-2",
    country: "MX" as CountryCode,
    code: "MX_RECEIVER_FISCAL_DATA",
    description: "RFC, regimen, codigo postal et uso CFDI requis pour le recepteur.",
    status: "Required"
  }
];

export const erpCoreModels = [
  { name: "tenants", scope: "Core", status: "A creer", note: "Workspace multi-tenant et branding." },
  { name: "users", scope: "IAM", status: "A creer", note: "Utilisateurs et rattachement tenant." },
  { name: "roles", scope: "IAM", status: "A creer", note: "Roles metier et systeme." },
  { name: "permissions", scope: "IAM", status: "A creer", note: "Matrice d'autorisations par module." },
  { name: "clients", scope: "CRM", status: "A creer", note: "Societes clientes." },
  { name: "contacts", scope: "CRM", status: "A creer", note: "Contacts lies aux clients." },
  { name: "tasks", scope: "Ops", status: "A creer", note: "Taches et affectations." },
  { name: "pipelines", scope: "Sales", status: "A creer", note: "Pipelines de vente." },
  { name: "stages", scope: "Sales", status: "A creer", note: "Etapes de pipeline." },
  { name: "deals", scope: "Sales", status: "A creer", note: "Opportunites commerciales." },
  { name: "quotes", scope: "Sales", status: "A creer", note: "Devis." },
  { name: "orders", scope: "Sales", status: "A creer", note: "Commandes clients." },
  { name: "invoices", scope: "Finance", status: "A creer", note: "En-tete facture." },
  { name: "invoice_lines", scope: "Finance", status: "A creer", note: "Lignes facture." },
  { name: "payments", scope: "Finance", status: "A creer", note: "Paiements et allocations." },
  { name: "documents", scope: "Docs", status: "A creer", note: "Pieces et stockage." },
  { name: "contracts", scope: "Docs", status: "A creer", note: "Contrats et renouvellements." },
  { name: "notes", scope: "CRM", status: "A creer", note: "Notes rattachees aux entites." },
  { name: "activities", scope: "Audit", status: "A creer", note: "Timeline metier." },
  { name: "tags", scope: "CRM", status: "A creer", note: "Classification transversale." },
  { name: "custom_fields", scope: "Core", status: "A creer", note: "Extensions de schema metier." },
  { name: "audit_logs", scope: "Audit", status: "A creer", note: "Traçabilite admin et metier." }
];

export const complianceModels = [
  { name: "tax_identities", scope: "Compliance", status: "Priorite haute", note: "Identites fiscales par pays et entite." },
  { name: "jurisdiction_profiles", scope: "Compliance", status: "Priorite haute", note: "Activation pays et version reglementaire." },
  { name: "compliance_rules", scope: "Compliance", status: "Priorite haute", note: "Regles par juridiction." },
  { name: "provider_connections", scope: "Integration", status: "Priorite haute", note: "PAC/PDP et secrets." },
  { name: "electronic_invoice_events", scope: "Compliance", status: "Priorite haute", note: "Evenements du cycle d'emission." },
  { name: "invoice_payloads", scope: "Storage", status: "Priorite haute", note: "XML, Factur-X, JSON, accusés." },
  { name: "compliance_validations", scope: "Compliance", status: "Priorite haute", note: "Erreurs, warnings et checklists." },
  { name: "submission_logs", scope: "Integration", status: "Priorite haute", note: "Trace des appels sortants." },
  { name: "rejection_logs", scope: "Compliance", status: "Priorite haute", note: "Codes et motifs de rejet." },
  { name: "invoice_series", scope: "Finance", status: "Priorite haute", note: "Series par pays et entite." },
  { name: "tax_profiles", scope: "Finance", status: "Priorite haute", note: "Profils de taxes et taux." }
];

export const firstTechnicalTickets = [
  {
    id: "ERP-1",
    priority: "P1",
    title: "Creer le shell ERP Next.js et les routes /app/*",
    scope: "Front app router"
  },
  {
    id: "ERP-2",
    priority: "P1",
    title: "Creer le module invoices avec detail, lignes et events",
    scope: "Finance"
  },
  {
    id: "ERP-3",
    priority: "P1",
    title: "Creer tax_identities, invoice_series, provider_connections",
    scope: "Compliance core"
  },
  {
    id: "ERP-4",
    priority: "P1",
    title: "Creer settings/compliance/mexico et france",
    scope: "Front compliance"
  },
  {
    id: "ERP-5",
    priority: "P2",
    title: "Ajouter roles, permissions et audit logs",
    scope: "IAM"
  }
];

export const billingProfile = {
  provider: "Stripe",
  subscriptionStatus: "active",
  nextBillingDate: "2026-04-01",
  monthlyAmount: 790,
  currency: "USD",
  seatsIncluded: 25,
  seatsUsed: 18
};

export const countryProfiles = {
  FR: getCountryProfile("FR"),
  MX: getCountryProfile("MX")
};

export const complianceCountrySettings: ComplianceCountrySetting[] = [
  {
    country: "MX",
    countryName: "Mexico",
    moduleLabel: "CFDI 4.0",
    readiness: "ready",
    providerLabel: "PAC Finkok Sandbox",
    invoiceSeries: "CFDI-MTY",
    taxIdentityLabel: "O7 Mexico Norte"
  },
  {
    country: "FR",
    countryName: "France",
    moduleLabel: "e-invoicing B2B",
    readiness: "ready_to_submit",
    providerLabel: "PDP Axway Sandbox",
    invoiceSeries: "FAC-FR",
    taxIdentityLabel: "O7 France Entity"
  }
];

export function getInvoiceTaxSummary(invoice: InvoiceRecord) {
  const subtotal = invoice.lines.reduce(
    (total, line) => total + line.quantity * line.unitPrice,
    0
  );
  const taxTotal = Number((invoice.total - subtotal).toFixed(2));

  return {
    subtotal,
    taxTotal,
    total: invoice.total
  };
}

export function getInvoiceComplianceFields(invoice: InvoiceRecord) {
  if (invoice.country === "MX") {
    return [
      { key: "rfc_emisor", value: invoice.setup.company?.rfc ?? "-" },
      { key: "rfc_receptor", value: invoice.setup.buyer?.rfc ?? "-" },
      { key: "razon_social", value: invoice.setup.company?.legalName ?? "-" },
      { key: "regimen_fiscal", value: invoice.setup.company?.taxRegimeCode ?? "-" },
      { key: "codigo_postal", value: invoice.setup.company?.fiscalZipCode ?? "-" },
      { key: "uso_cfdi", value: invoice.setup.buyer?.cfdiUse ?? "-" }
    ];
  }

  return [
    { key: "legal_company_name", value: invoice.setup.company?.legalName ?? "-" },
    { key: "siren", value: invoice.setup.company?.siret ?? "-" },
    { key: "vat_number", value: invoice.setup.company?.vatNumber ?? "-" },
    { key: "company_size_profile", value: invoice.setup.companySize ?? "-" },
    { key: "pdp_status", value: invoice.providerStatus },
    { key: "supported_format", value: invoice.format }
  ];
}
