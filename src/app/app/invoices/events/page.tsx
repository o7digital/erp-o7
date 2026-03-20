import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { electronicInvoiceEvents, submissionLogs } from "@/lib/erp-data";

export default function InvoiceEventsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Invoice Events"
        description="Journal complet des validations, soumissions, rejets et traces provider."
      />

      <SectionCard title="Electronic invoice events" description="Flux metier et technique par facture.">
        <DataTable
          rows={electronicInvoiceEvents}
          getRowId={(row) => row.id}
          columns={[
            { key: "invoice", label: "Invoice", render: (row) => row.invoiceNumber },
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "type", label: "Type", render: (row) => row.type },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "provider", label: "Provider", render: (row) => row.provider },
            { key: "occurredAt", label: "Date", render: (row) => row.occurredAt },
            { key: "message", label: "Message", render: (row) => row.message }
          ]}
        />
      </SectionCard>

      <SectionCard title="Submission logs" description="Logs bruts d'appels fournisseurs et reponses.">
        <DataTable
          rows={submissionLogs}
          getRowId={(row) => row.id}
          columns={[
            { key: "provider", label: "Provider", render: (row) => row.provider },
            { key: "invoice", label: "Invoice", render: (row) => row.invoiceNumber },
            { key: "endpoint", label: "Endpoint", render: (row) => <span className="mono">{row.endpoint}</span> },
            { key: "requestId", label: "Request ID", render: (row) => <span className="mono">{row.requestId}</span> },
            { key: "status", label: "HTTP", render: (row) => <StatusBadge value={row.status} /> },
            { key: "createdAt", label: "Date", render: (row) => row.createdAt }
          ]}
        />
      </SectionCard>
    </div>
  );
}

