import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { jurisdictionProfiles } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function ComplianceCountriesPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Compliance Countries")}
        description={txt("Matrice des juridictions activees dans l'ERP.")}
      />

      <SectionCard title={txt("Profils pays")} description={txt("Version reglementaire, formats et obligations actives.")}>
        <DataTable
          rows={jurisdictionProfiles}
          getRowId={(row) => row.country}
          columns={[
            {
              key: "country",
              label: txt("Pays"),
              render: (row) => (
                <div>
                  <strong>{row.countryName}</strong>
                  <div className="muted">{row.activeVersion}</div>
                </div>
              )
            },
            { key: "transmission", label: txt("Mode"), render: (row) => txt(row.transmissionModel) },
            {
              key: "formats",
              label: txt("Formats"),
              render: (row) => <div className="inline-stack">{row.supportedFormats.map((format) => <StatusBadge key={format} value={format} />)}</div>
            },
            {
              key: "obligations",
              label: txt("Obligations"),
              render: (row) => (
                <div className="inline-stack">
                  {row.obligations.map((obligation) => (
                    <StatusBadge key={obligation.flow} value={`${txt(obligation.flow)}: ${txt(obligation.state)}`} />
                  ))}
                </div>
              )
            }
          ]}
        />
      </SectionCard>
    </div>
  );
}
