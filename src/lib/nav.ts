export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

type Translator = (value: string) => string;

export function getNavigationSections(txt: Translator): NavSection[] {
  return [
    {
      title: txt("Operations"),
      items: [
        { label: txt("Dashboard"), href: "/app/dashboard" },
        { label: txt("Clients"), href: "/app/clients" },
        { label: txt("Contacts"), href: "/app/contacts" },
        { label: txt("Tasks"), href: "/app/tasks" },
        { label: txt("Pipeline"), href: "/app/pipeline" },
        { label: txt("Quotes"), href: "/app/quotes" },
        { label: txt("Orders"), href: "/app/orders" },
        { label: txt("Invoices"), href: "/app/invoices" },
        { label: txt("Payments"), href: "/app/payments" },
        { label: txt("Documents"), href: "/app/documents" },
        { label: txt("Contracts"), href: "/app/contracts" }
      ]
    },
    {
      title: txt("Administration"),
      items: [
        { label: txt("Settings"), href: "/app/settings" },
        { label: txt("Users"), href: "/app/settings/users" },
        { label: txt("Roles"), href: "/app/settings/roles" },
        { label: txt("Company"), href: "/app/settings/company" },
        { label: txt("Billing"), href: "/app/settings/billing" },
        { label: txt("Compliance"), href: "/app/settings/compliance" }
      ]
    }
  ];
}

export function getSettingsLinks(txt: Translator): NavItem[] {
  return [
    { label: txt("Vue globale"), href: "/app/settings" },
    { label: txt("Users"), href: "/app/settings/users" },
    { label: txt("Roles"), href: "/app/settings/roles" },
    { label: txt("Company"), href: "/app/settings/company" },
    { label: txt("Billing"), href: "/app/settings/billing" },
    { label: txt("Compliance"), href: "/app/settings/compliance" },
    { label: txt("Tax identities"), href: "/app/settings/tax-identities" },
    { label: txt("Invoice series"), href: "/app/settings/invoice-series" }
  ];
}

export function getComplianceLinks(txt: Translator): NavItem[] {
  return [
    { label: txt("Overview"), href: "/app/settings/compliance" },
    { label: txt("Countries"), href: "/app/settings/compliance/countries" },
    { label: txt("Mexico"), href: "/app/settings/compliance/mexico" },
    { label: txt("France"), href: "/app/settings/compliance/france" },
    { label: txt("Providers"), href: "/app/settings/compliance/providers" }
  ];
}
