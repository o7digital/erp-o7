import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { users } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsUsersPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Users")}
        description={txt("Utilisateurs actifs, role assigne, region et dernier acces.")}
      />

      <SectionCard title={txt("Workspace users")} description={txt("Administration equipe et securite d'acces.")}>
        <DataTable
          rows={users}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: txt("User"),
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.email}</div>
                </div>
              )
            },
            { key: "role", label: txt("Role"), render: (row) => txt(row.role) },
            { key: "region", label: txt("Region"), render: (row) => row.region },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> },
            { key: "lastSeen", label: txt("Dernier acces"), render: (row) => row.lastSeen }
          ]}
        />
      </SectionCard>
    </div>
  );
}
