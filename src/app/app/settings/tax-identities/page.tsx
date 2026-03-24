import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { taxIdentities, taxProfiles } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function TaxIdentitiesPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Tax identities")}
        description={txt("Identites fiscales par pays, series rattachees et profils de taxation.")}
      />

      <SectionCard title={txt("Identites fiscales")} description={txt("Entites emettrices disponibles dans l'ERP.")}>
        <DataTable
          rows={taxIdentities}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "label", label: txt("Label"), render: (row) => row.label },
            { key: "legalName", label: txt("Legal name"), render: (row) => row.legalName },
            { key: "taxId", label: txt("Tax ID"), render: (row) => <span className="mono">{row.taxId}</span> },
            { key: "secondaryId", label: txt("Secondaire"), render: (row) => <span className="mono">{row.secondaryId}</span> },
            { key: "invoiceSeries", label: txt("Serie"), render: (row) => row.invoiceSeries },
            { key: "providerStatus", label: txt("Provider"), render: (row) => <StatusBadge value={txt(row.providerStatus)} /> }
          ]}
        />
      </SectionCard>

      <SectionCard title={txt("Tax profiles")} description={txt("Profils de taxe relies aux lignes facture.")}>
        <DataTable
          rows={taxProfiles}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "profileName", label: txt("Profil"), render: (row) => row.profileName },
            { key: "rates", label: txt("Taux"), render: (row) => row.rates },
            { key: "collectionModel", label: txt("Modele"), render: (row) => row.collectionModel }
          ]}
        />
      </SectionCard>
    </div>
  );
}
