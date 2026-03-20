export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Operations",
    items: [
      { label: "Dashboard", href: "/app/dashboard" },
      { label: "Clients", href: "/app/clients" },
      { label: "Contacts", href: "/app/contacts" },
      { label: "Tasks", href: "/app/tasks" },
      { label: "Pipeline", href: "/app/pipeline" },
      { label: "Quotes", href: "/app/quotes" },
      { label: "Orders", href: "/app/orders" },
      { label: "Invoices", href: "/app/invoices" },
      { label: "Payments", href: "/app/payments" },
      { label: "Documents", href: "/app/documents" },
      { label: "Contracts", href: "/app/contracts" }
    ]
  },
  {
    title: "Administration",
    items: [
      { label: "Settings", href: "/app/settings" },
      { label: "Users", href: "/app/settings/users" },
      { label: "Roles", href: "/app/settings/roles" },
      { label: "Company", href: "/app/settings/company" },
      { label: "Billing", href: "/app/settings/billing" },
      { label: "Compliance", href: "/app/settings/compliance" }
    ]
  }
];

export const settingsLinks: NavItem[] = [
  { label: "Vue globale", href: "/app/settings" },
  { label: "Users", href: "/app/settings/users" },
  { label: "Roles", href: "/app/settings/roles" },
  { label: "Company", href: "/app/settings/company" },
  { label: "Billing", href: "/app/settings/billing" },
  { label: "Compliance", href: "/app/settings/compliance" },
  { label: "Tax identities", href: "/app/settings/tax-identities" },
  { label: "Invoice series", href: "/app/settings/invoice-series" }
];

export const complianceLinks: NavItem[] = [
  { label: "Overview", href: "/app/settings/compliance" },
  { label: "Countries", href: "/app/settings/compliance/countries" },
  { label: "Mexico", href: "/app/settings/compliance/mexico" },
  { label: "France", href: "/app/settings/compliance/france" },
  { label: "Providers", href: "/app/settings/compliance/providers" }
];

