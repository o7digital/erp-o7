import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { complianceModels, erpCoreModels, firstTechnicalTickets } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

const routes = [
  "/app/dashboard",
  "/app/clients",
  "/app/contacts",
  "/app/tasks",
  "/app/pipeline",
  "/app/quotes",
  "/app/orders",
  "/app/invoices",
  "/app/invoices/[id]",
  "/app/invoices/events",
  "/app/payments",
  "/app/documents",
  "/app/contracts",
  "/app/settings",
  "/app/settings/users",
  "/app/settings/roles",
  "/app/settings/company",
  "/app/settings/billing",
  "/app/settings/compliance",
  "/app/settings/compliance/countries",
  "/app/settings/compliance/mexico",
  "/app/settings/compliance/france",
  "/app/settings/compliance/providers",
  "/app/settings/tax-identities",
  "/app/settings/invoice-series"
];

export default async function SettingsPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Settings")}
        description={txt(
          "Centre d'administration ERP pour structure applicative, modeles a creer et priorites d'implementation."
        )}
      />

      <div className="two-columns">
        <SectionCard
          title={txt("Arbre de pages ERP")}
          description={txt("Routes internes actuellement posees dans l'application.")}
        >
          <ul className="route-tree">
            {routes.map((route) => (
              <li key={route}>
                <code>{route}</code>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title={txt("Premiers tickets techniques")}
          description={txt("Execution prioritaire pour transformer le shell en ERP complet.")}
        >
          <DataTable
            rows={firstTechnicalTickets}
            getRowId={(row) => row.id}
            columns={[
              { key: "id", label: txt("Ticket"), render: (row) => row.id },
              {
                key: "priority",
                label: txt("Priorite"),
                render: (row) => <StatusBadge value={txt(row.priority)} />
              },
              { key: "title", label: txt("Titre"), render: (row) => txt(row.title) },
              { key: "scope", label: txt("Scope"), render: (row) => txt(row.scope) }
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard title={txt("Modeles ERP core")} description={txt("Tables/metiers a poser dans le backend.")}>
        <DataTable
          rows={erpCoreModels}
          getRowId={(row) => row.name}
          columns={[
            { key: "name", label: txt("Table"), render: (row) => <span className="mono">{row.name}</span> },
            { key: "scope", label: txt("Scope"), render: (row) => txt(row.scope) },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "note", label: txt("Usage"), render: (row) => txt(row.note) }
          ]}
        />
      </SectionCard>

      <SectionCard
        title={txt("Modeles facture electronique")}
        description={txt("Tables specialisees pour FR/MX et futurs connecteurs.")}
      >
        <DataTable
          rows={complianceModels}
          getRowId={(row) => row.name}
          columns={[
            { key: "name", label: txt("Table"), render: (row) => <span className="mono">{row.name}</span> },
            { key: "scope", label: txt("Scope"), render: (row) => txt(row.scope) },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "note", label: txt("Usage"), render: (row) => txt(row.note) }
          ]}
        />
      </SectionCard>
    </div>
  );
}
