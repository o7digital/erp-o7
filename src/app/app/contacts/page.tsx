import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { contacts } from "@/lib/erp-data";

export default function ContactsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Contacts"
        description="Contacts client rattaches aux comptes, avec suivi des interactions et alertes fiscales."
      />

      <SectionCard title="Carnet de contacts" description="Vue transversale sales, finance et operations.">
        <DataTable
          rows={contacts}
          getRowId={(row) => row.id}
          columns={[
            {
              key: "name",
              label: "Contact",
              render: (row) => (
                <div>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.title}</div>
                </div>
              )
            },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "email", label: "Email", render: (row) => row.email },
            { key: "phone", label: "Telephone", render: (row) => row.phone },
            { key: "lastTouch", label: "Dernier contact", render: (row) => row.lastTouch },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

