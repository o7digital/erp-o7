import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { electronicInvoiceEvents, submissionLogs } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function InvoiceEventsPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Invoice Events")}
        description={txt("Journal complet des validations, soumissions, rejets et traces provider.")}
      />

      <SectionCard
        title={txt("Electronic invoice events")}
        description={txt("Flux metier et technique par facture.")}
      >
        <DataTable
          rows={electronicInvoiceEvents}
          getRowId={(row) => row.id}
          columns={[
            { key: "invoice", label: txt("Invoice"), render: (row) => row.invoiceNumber },
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "type", label: txt("Type"), render: (row) => txt(row.type) },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "provider", label: txt("Provider"), render: (row) => row.provider },
            { key: "occurredAt", label: txt("Date"), render: (row) => row.occurredAt },
            { key: "message", label: txt("Message"), render: (row) => txt(row.message) }
          ]}
        />
      </SectionCard>

      <SectionCard title={txt("Submission logs")} description={txt("Logs bruts d'appels fournisseurs et reponses.")}>
        <DataTable
          rows={submissionLogs}
          getRowId={(row) => row.id}
          columns={[
            { key: "provider", label: txt("Provider"), render: (row) => row.provider },
            { key: "invoice", label: txt("Invoice"), render: (row) => row.invoiceNumber },
            { key: "endpoint", label: txt("Endpoint"), render: (row) => <span className="mono">{row.endpoint}</span> },
            { key: "requestId", label: txt("Request ID"), render: (row) => <span className="mono">{row.requestId}</span> },
            { key: "status", label: txt("HTTP"), render: (row) => <StatusBadge value={row.status} /> },
            { key: "createdAt", label: txt("Date"), render: (row) => row.createdAt }
          ]}
        />
      </SectionCard>
    </div>
  );
}
