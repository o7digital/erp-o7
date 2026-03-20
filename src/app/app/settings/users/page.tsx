import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { users } from "@/lib/erp-data";

export default function SettingsUsersPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Users" description="Utilisateurs actifs, role assigne, region et dernier acces." />

      <SectionCard title="Workspace users" description="Administration equipe et securite d'acces.">
        <DataTable
          rows={users}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: "User",
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.email}</div>
                </div>
              )
            },
            { key: "role", label: "Role", render: (row) => row.role },
            { key: "region", label: "Region", render: (row) => row.region },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> },
            { key: "lastSeen", label: "Dernier acces", render: (row) => row.lastSeen }
          ]}
        />
      </SectionCard>
    </div>
  );
}

