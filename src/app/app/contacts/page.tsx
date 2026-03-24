import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { contacts } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ContactsPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Contacts")}
        description={txt(
          "Contacts client rattaches aux comptes, avec suivi des interactions et alertes fiscales."
        )}
      />

      <SectionCard
        title={txt("Carnet de contacts")}
        description={txt("Vue transversale sales, finance et operations.")}
      >
        <DataTable
          rows={contacts}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: txt("Contact"),
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{txt(row.title)}</div>
                </div>
              )
            },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "email", label: "Email", render: (row) => row.email },
            { key: "phone", label: txt("Telephone"), render: (row) => row.phone },
            { key: "lastTouch", label: txt("Dernier contact"), render: (row) => row.lastTouch },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}
