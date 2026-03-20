import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { complianceModels, erpCoreModels, firstTechnicalTickets } from "@/lib/erp-data";

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

export default function SettingsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Settings"
        description="Centre d'administration ERP pour structure applicative, modeles a creer et priorites d'implementation."
      />

      <div className="two-columns">
        <SectionCard title="Arbre de pages ERP" description="Routes internes actuellement posees dans l'application.">
          <ul className="route-tree">
            {routes.map((route) => (
              <li key={route}>
                <code>{route}</code>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Premiers tickets techniques" description="Execution prioritaire pour transformer le shell en ERP complet.">
          <DataTable
            rows={firstTechnicalTickets}
            getRowId={(row) => row.id}
            columns={[
              { key: "id", label: "Ticket", render: (row) => row.id },
              { key: "priority", label: "Priorite", render: (row) => <StatusBadge value={row.priority} /> },
              { key: "title", label: "Titre", render: (row) => row.title },
              { key: "scope", label: "Scope", render: (row) => row.scope }
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard title="Modeles ERP core" description="Tables/metiers a poser dans le backend.">
        <DataTable
          rows={erpCoreModels}
          getRowId={(row) => row.name}
          columns={[
            { key: "name", label: "Table", render: (row) => <span className="mono">{row.name}</span> },
            { key: "scope", label: "Scope", render: (row) => row.scope },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "note", label: "Usage", render: (row) => row.note }
          ]}
        />
      </SectionCard>

      <SectionCard title="Modeles facture electronique" description="Tables specialisees pour FR/MX et futurs connecteurs.">
        <DataTable
          rows={complianceModels}
          getRowId={(row) => row.name}
          columns={[
            { key: "name", label: "Table", render: (row) => <span className="mono">{row.name}</span> },
            { key: "scope", label: "Scope", render: (row) => row.scope },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "note", label: "Usage", render: (row) => row.note }
          ]}
        />
      </SectionCard>
    </div>
  );
}

