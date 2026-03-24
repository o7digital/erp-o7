import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { clients } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ClientsPage() {
  const { languageTag, txt } = await getDemoI18n();
  const franceClients = clients.filter((client) => client.country === "FR").length;
  const mexicoClients = clients.filter((client) => client.country === "MX").length;
  const openInvoices = clients.reduce((total, client) => total + client.openInvoices, 0);

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Clients")}
        description={txt(
          "Base comptes clients avec ownership, statut financier et readiness de facturation electronique."
        )}
      />

      <div className="stats-grid">
        <StatCard label={txt("Clients actifs")} value={String(clients.length)} detail={txt("portefeuille multi-pays")} />
        <StatCard label={txt("Clients FR")} value={String(franceClients)} detail={txt("sujets PDP / TVA")} />
        <StatCard label={txt("Clients MX")} value={String(mexicoClients)} detail={txt("sujets CFDI 4.0")} />
        <StatCard label={txt("Factures ouvertes")} value={String(openInvoices)} detail={txt("sur comptes clients")} />
      </div>

      <SectionCard
        title={txt("Liste clients")}
        description={txt("Vue exploitable pour sales, finance et operations.")}
      >
        <DataTable
          rows={clients}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: txt("Client"),
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{txt(row.sector)}</div>
                </div>
              )
            },
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "owner", label: txt("Owner"), render: (row) => row.owner },
            {
              key: "arr",
              label: txt("ARR"),
              align: "right",
              render: (row) => formatCurrency(row.arr, row.currency, languageTag)
            },
            {
              key: "openInvoices",
              label: txt("Invoices ouvertes"),
              align: "right",
              render: (row) => row.openInvoices
            },
            {
              key: "compliance",
              label: txt("Compliance"),
              render: (row) => <StatusBadge value={txt(row.compliance)} />
            },
            {
              key: "tags",
              label: txt("Tags"),
              render: (row) => <div className="inline-stack">{row.tags.map((tag) => <StatusBadge key={tag} value={txt(tag)} />)}</div>
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}
