import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { invoiceSeries } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function InvoiceSeriesPage() {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Invoice series")}
        description={txt("Series de numerotation par pays, entite et format de facture.")}
      />

      <SectionCard title={txt("Series actives")} description={txt("Series prêtes a etre utilisees par le moteur invoices.")}>
        <DataTable
          rows={invoiceSeries}
          getRowId={(row) => row.id}
          columns={[
            { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
            { key: "code", label: txt("Serie"), render: (row) => row.code },
            { key: "nextNumber", label: txt("Prochain numero"), render: (row) => row.nextNumber },
            { key: "formatPattern", label: txt("Pattern"), render: (row) => <span className="mono">{row.formatPattern}</span> },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> }
          ]}
        />
      </SectionCard>

      <SectionCard title={txt("Regles d'emission")} description={txt("Rattachement futur aux tax identities et providers.")}>
        <div className="form-grid">
          <div className="field">
            <label className="field-label">{txt("Serie FR par defaut")}</label>
            <input defaultValue="FAC-FR" />
          </div>
          <div className="field">
            <label className="field-label">{txt("Serie MX par defaut")}</label>
            <input defaultValue="CFDI-MTY" />
          </div>
          <div className="field">
            <label className="field-label">{txt("Reset annuel")}</label>
            <select defaultValue="yes">
              <option value="yes">{txt("Oui")}</option>
              <option value="no">{txt("Non")}</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">{txt("Controle unicite")}</label>
            <select defaultValue="strict">
              <option value="strict">{txt("Strict")}</option>
              <option value="soft">{txt("Soft")}</option>
            </select>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
