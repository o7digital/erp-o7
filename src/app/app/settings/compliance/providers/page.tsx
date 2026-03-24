import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { providerConnections, submissionLogs } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ComplianceProvidersPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Compliance Providers")}
        description={txt("Connecteurs PAC/PDP, modes sandbox/prod et traces d'envoi.")}
      />

      <SectionCard title={txt("Provider connections")} description={txt("Connecteurs pays prepares pour l'ERP.")}>
        <DataTable
          rows={providerConnections}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "type", label: txt("Type"), render: (row) => row.type },
            { key: "name", label: txt("Provider"), render: (row) => row.name },
            { key: "mode", label: txt("Mode"), render: (row) => <StatusBadge value={txt(row.mode)} /> },
            { key: "status", label: txt("Status"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "lastSync", label: txt("Dernier sync"), render: (row) => row.lastSync }
          ]}
        />
      </SectionCard>

      <SectionCard title={txt("Submission logs")} description={txt("Historique brut des appels sortants.")}>
        <DataTable
          rows={submissionLogs}
          getRowId={(row) => row.id}
          columns={[
            { key: "provider", label: txt("Provider"), render: (row) => row.provider },
            { key: "invoice", label: txt("Invoice"), render: (row) => row.invoiceNumber },
            { key: "endpoint", label: txt("Endpoint"), render: (row) => <span className="mono">{row.endpoint}</span> },
            { key: "requestId", label: txt("Request"), render: (row) => <span className="mono">{row.requestId}</span> },
            { key: "status", label: txt("Status"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "createdAt", label: txt("Date"), render: (row) => row.createdAt }
          ]}
        />
      </SectionCard>
    </div>
  );
}
