import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { jurisdictionProfiles } from "@/lib/erp-data";

export default function ComplianceCountriesPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Compliance Countries" description="Matrice des juridictions activees dans l'ERP." />

      <SectionCard title="Profils pays" description="Version reglementaire, formats et obligations actives.">
        <DataTable
          rows={jurisdictionProfiles}
          getRowId={(row) => row.country}
          columns={[
            {
              key: "country",
              label: "Pays",
              render: (row) => (
                <div>
                  <strong>{row.countryName}</strong>
                  <div className="muted">{row.activeVersion}</div>
                </div>
              )
            },
            { key: "transmission", label: "Mode", render: (row) => row.transmissionModel },
            {
              key: "formats",
              label: "Formats",
              render: (row) => <div className="inline-stack">{row.supportedFormats.map((format) => <StatusBadge key={format} value={format} />)}</div>
            },
            {
              key: "obligations",
              label: "Obligations",
              render: (row) => (
                <div className="inline-stack">
                  {row.obligations.map((obligation) => (
                    <StatusBadge key={obligation.flow} value={`${obligation.flow}: ${obligation.state}`} />
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

