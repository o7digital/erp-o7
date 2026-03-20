import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { clients } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

export default function ClientsPage() {
  const franceClients = clients.filter((client) => client.country === "FR").length;
  const mexicoClients = clients.filter((client) => client.country === "MX").length;
  const openInvoices = clients.reduce((total, client) => total + client.openInvoices, 0);

  return (
    <div className="page-stack">
      <PageHeader
        title="Clients"
        description="Base comptes clients avec ownership, statut financier et readiness de facturation electronique."
      />

      <div className="stats-grid">
        <StatCard label="Clients actifs" value={String(clients.length)} detail="portefeuille multi-pays" />
        <StatCard label="Clients FR" value={String(franceClients)} detail="sujets PDP / TVA" />
        <StatCard label="Clients MX" value={String(mexicoClients)} detail="sujets CFDI 4.0" />
        <StatCard label="Factures ouvertes" value={String(openInvoices)} detail="sur comptes clients" />
      </div>

      <SectionCard title="Liste clients" description="Vue exploitable pour sales, finance et operations.">
        <DataTable
          rows={clients}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: "Client",
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.sector}</div>
                </div>
              )
            },
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "owner", label: "Owner", render: (row) => row.owner },
            { key: "arr", label: "ARR", align: "right", render: (row) => formatCurrency(row.arr, "EUR") },
            { key: "openInvoices", label: "Invoices ouvertes", align: "right", render: (row) => row.openInvoices },
            { key: "compliance", label: "Compliance", render: (row) => <StatusBadge value={row.compliance} /> },
            {
              key: "tags",
              label: "Tags",
              render: (row) => <div className="inline-stack">{row.tags.map((tag) => <StatusBadge key={tag} value={tag} />)}</div>
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}

