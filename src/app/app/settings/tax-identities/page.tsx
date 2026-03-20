import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { taxIdentities, taxProfiles } from "@/lib/erp-data";

export default function TaxIdentitiesPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Tax Identities"
        description="Identites fiscales par pays, series rattachees et profils de taxation."
      />

      <SectionCard title="Identites fiscales" description="Entites emettrices disponibles dans l'ERP.">
        <DataTable
          rows={taxIdentities}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "label", label: "Label", render: (row) => row.label },
            { key: "legalName", label: "Legal name", render: (row) => row.legalName },
            { key: "taxId", label: "Tax ID", render: (row) => <span className="mono">{row.taxId}</span> },
            { key: "secondaryId", label: "Secondaire", render: (row) => <span className="mono">{row.secondaryId}</span> },
            { key: "invoiceSeries", label: "Serie", render: (row) => row.invoiceSeries },
            { key: "providerStatus", label: "Provider", render: (row) => <StatusBadge value={row.providerStatus} /> }
          ]}
        />
      </SectionCard>

      <SectionCard title="Tax profiles" description="Profils de taxe relies aux lignes facture.">
        <DataTable
          rows={taxProfiles}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "profileName", label: "Profil", render: (row) => row.profileName },
            { key: "rates", label: "Taux", render: (row) => row.rates },
            { key: "collectionModel", label: "Modele", render: (row) => row.collectionModel }
          ]}
        />
      </SectionCard>
    </div>
  );
}

