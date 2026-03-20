import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { permissionCatalog, roles } from "@/lib/erp-data";

export default function SettingsRolesPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Roles" description="Roles et permissions pour sales, finance, operations et administration." />

      <div className="two-columns">
        <SectionCard title="Roles actifs" description="Roles appliques dans le workspace.">
          <DataTable
            rows={roles}
            getRowId={(row) => row.id}
            columns={[
              { key: "name", label: "Role", render: (row) => row.name },
              { key: "users", label: "Users", align: "right", render: (row) => row.users },
              {
                key: "permissions",
                label: "Permissions",
                render: (row) => (
                  <div className="inline-stack">
                    {row.permissions.map((permission) => (
                      <StatusBadge key={permission} value={permission} />
                    ))}
                  </div>
                )
              }
            ]}
          />
        </SectionCard>

        <SectionCard title="Catalogue permissions" description="Granularite cible de l'IAM ERP.">
          <ul className="list">
            {permissionCatalog.map((permission) => (
              <li key={permission} className="list-item">
                <strong className="mono">{permission}</strong>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

