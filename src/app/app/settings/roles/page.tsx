import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { permissionCatalog, roles } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsRolesPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Roles")}
        description={txt("Roles et permissions pour sales, finance, operations et administration.")}
      />

      <div className="two-columns">
        <SectionCard title={txt("Roles actifs")} description={txt("Roles appliques dans le workspace.")}>
          <DataTable
            rows={roles}
            getRowId={(row) => row.id}
            columns={[
              { key: "name", label: txt("Role"), render: (row) => txt(row.name) },
              { key: "users", label: txt("Users"), align: "right", render: (row) => row.users },
              {
                key: "permissions",
                label: txt("Permissions"),
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

        <SectionCard title={txt("Catalogue permissions")} description={txt("Granularite cible de l'IAM ERP.")}>
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
