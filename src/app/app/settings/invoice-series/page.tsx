import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { invoiceSeries } from "@/lib/erp-data";

export default function InvoiceSeriesPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Invoice Series" description="Series de numerotation par pays, entite et format de facture." />

      <SectionCard title="Series actives" description="Series prêtes a etre utilisees par le moteur invoices.">
        <DataTable
          rows={invoiceSeries}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
            { key: "code", label: "Serie", render: (row) => row.code },
            { key: "nextNumber", label: "Prochain numero", render: (row) => row.nextNumber },
            { key: "formatPattern", label: "Pattern", render: (row) => <span className="mono">{row.formatPattern}</span> },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </SectionCard>

      <SectionCard title="Regles d'emission" description="Rattachement futur aux tax identities et providers.">
        <div className="form-grid">
          <div className="field">
            <label className="field-label">Serie FR par defaut</label>
            <input defaultValue="FAC-FR" />
          </div>
          <div className="field">
            <label className="field-label">Serie MX par defaut</label>
            <input defaultValue="CFDI-MTY" />
          </div>
          <div className="field">
            <label className="field-label">Reset annuel</label>
            <select defaultValue="yes">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">Controle unicite</label>
            <select defaultValue="strict">
              <option value="strict">Strict</option>
              <option value="soft">Soft</option>
            </select>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
