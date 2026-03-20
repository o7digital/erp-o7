import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { providerConnections, submissionLogs } from "@/lib/erp-data";

export default function ComplianceProvidersPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Compliance Providers" description="Connecteurs PAC/PDP, modes sandbox/prod et traces d'envoi." />

      <SectionCard title="Provider connections" description="Connecteurs pays prepares pour l'ERP.">
        <DataTable
          rows={providerConnections}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "type", label: "Type", render: (row) => row.type },
            { key: "name", label: "Provider", render: (row) => row.name },
            { key: "mode", label: "Mode", render: (row) => <StatusBadge value={row.mode} /> },
            { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "lastSync", label: "Dernier sync", render: (row) => row.lastSync }
          ]}
        />
      </SectionCard>

      <SectionCard title="Submission logs" description="Historique brut des appels sortants.">
        <DataTable
          rows={submissionLogs}
          getRowId={(row) => row.id}
          columns={[
            { key: "provider", label: "Provider", render: (row) => row.provider },
            { key: "invoice", label: "Invoice", render: (row) => row.invoiceNumber },
            { key: "endpoint", label: "Endpoint", render: (row) => <span className="mono">{row.endpoint}</span> },
            { key: "requestId", label: "Request", render: (row) => <span className="mono">{row.requestId}</span> },
            { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "createdAt", label: "Date", render: (row) => row.createdAt }
          ]}
        />
      </SectionCard>
    </div>
  );
}

