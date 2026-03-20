import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { documents } from "@/lib/erp-data";

export default function DocumentsPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Documents" description="Pieces jointes ERP, payloads facture et stockage par entite." />

      <SectionCard title="Documents stockes" description="Vision centralisee des artefacts metier et fiscaux.">
        <DataTable
          rows={documents}
          getRowId={(row) => row.id}
          columns={[
            { key: "name", label: "Document", render: (row) => row.name },
            { key: "type", label: "Type", render: (row) => row.type },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "linkedTo", label: "Lie a", render: (row) => row.linkedTo },
            { key: "storage", label: "Storage", render: (row) => row.storage },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

