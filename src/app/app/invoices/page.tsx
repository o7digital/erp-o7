import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { invoiceValidations, invoices, rejectionLogs } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function InvoicesPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string;
    country?: string;
    erp_status?: string;
    electronic_status?: string;
  }>;
}) {
  const { languageTag, txt } = await getDemoI18n();
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";
  const countryFilter = params.country ?? "all";
  const erpStatusFilter = params.erp_status ?? "all";
  const electronicStatusFilter = params.electronic_status ?? "all";

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesQuery =
      query.length === 0 ||
      invoice.number.toLowerCase().includes(query) ||
      invoice.client.toLowerCase().includes(query);
    const matchesCountry =
      countryFilter === "all" || invoice.country === countryFilter;
    const matchesErp =
      erpStatusFilter === "all" || invoice.businessStatus === erpStatusFilter;
    const matchesElectronic =
      electronicStatusFilter === "all" ||
      invoice.electronicStatus === electronicStatusFilter;

    return matchesQuery && matchesCountry && matchesErp && matchesElectronic;
  });

  const openInvoices = filteredInvoices.filter((invoice) => invoice.balance > 0).length;
  const transmitted = filteredInvoices.filter((invoice) => invoice.electronicStatus === "submitted").length;
  const rejected = filteredInvoices.filter((invoice) => invoice.electronicStatus === "rejected").length;
  const validationQueue = filteredInvoices.filter((invoice) => {
    const entry = invoiceValidations.find((item) => item.invoiceId === invoice.id);
    return (entry?.issues.length ?? 0) > 0;
  }).length;

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Invoices")}
        description={txt(
          "Registre facture ERP avec filtres, statuts metier, suivi e-invoicing et acces detail par piece."
        )}
        actions={
          <div className="button-row">
            <Link href="/app/invoices/events" className="button button-secondary">
              {txt("Events")}
            </Link>
            <Link href="/app/settings/tax-identities" className="button button-secondary">
              {txt("Tax identities")}
            </Link>
            <Link href="/app/settings/invoice-series" className="button">
              {txt("Invoice series")}
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label={txt("Factures ouvertes")} value={String(openInvoices)} detail={txt("avec balance non nulle")} />
        <StatCard label={txt("Soumises")} value={String(transmitted)} detail={txt("transmissions envoyees")} />
        <StatCard label={txt("Rejetees")} value={String(rejected)} detail={txt("a corriger en priorite")} />
        <StatCard label={txt("Validations KO")} value={String(validationQueue)} detail={txt("factures avec erreurs")} />
      </div>

      <SectionCard title={txt("Filtres")} description={txt("Recherche et filtrage du registre des factures.")}>
        <form className="filter-form" action="/app/invoices" method="get">
          <div className="filter-grid">
            <div className="field">
              <label className="field-label">{txt("Recherche")}</label>
              <input
                name="q"
                defaultValue={params.q ?? ""}
                placeholder={txt("Numero ou client")}
              />
            </div>
            <div className="field">
              <label className="field-label">{txt("Pays")}</label>
              <select name="country" defaultValue={countryFilter}>
                <option value="all">{txt("Tous")}</option>
                <option value="FR">{txt("France")}</option>
                <option value="MX">{txt("Mexique")}</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">{txt("ERP status")}</label>
              <select name="erp_status" defaultValue={erpStatusFilter}>
                <option value="all">{txt("Tous")}</option>
                <option value="draft">{txt("draft")}</option>
                <option value="issued">{txt("issued")}</option>
                <option value="partially_paid">{txt("partially_paid")}</option>
                <option value="paid">{txt("paid")}</option>
                <option value="cancelled">{txt("cancelled")}</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">{txt("Electronic status")}</label>
              <select name="electronic_status" defaultValue={electronicStatusFilter}>
                <option value="all">{txt("Tous")}</option>
                <option value="not_configured">{txt("not_configured")}</option>
                <option value="ready">{txt("ready")}</option>
                <option value="validation_error">{txt("validation_error")}</option>
                <option value="ready_to_submit">{txt("ready_to_submit")}</option>
                <option value="submitted">{txt("submitted")}</option>
                <option value="accepted">{txt("accepted")}</option>
                <option value="rejected">{txt("rejected")}</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">{txt("Actions")}</label>
              <div className="inline-actions">
                <button type="submit" className="button">
                  {txt("Filtrer")}
                </button>
                <Link href="/app/invoices" className="button button-secondary">
                  {txt("Reset")}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </SectionCard>

      <div className="two-columns">
        <SectionCard
          title={txt("Registre des factures")}
          description={txt("Vue finance + compliance avec filtres et actions rapides.")}
        >
          <DataTable
            rows={filteredInvoices}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "number",
                label: txt("Invoice"),
                render: (row) => (
                  <div>
                    <Link href={`/app/invoices/${row.id}`}>
                      <strong>{row.number}</strong>
                    </Link>
                    <div className="muted">
                      {row.client} · {row.country}
                    </div>
                  </div>
                )
              },
              { key: "issueDate", label: txt("Date"), render: (row) => row.issueDate },
              { key: "country", label: txt("Pays"), render: (row) => <StatusBadge value={row.country} /> },
              {
                key: "business",
                label: txt("ERP status"),
                render: (row) => <StatusBadge value={txt(row.businessStatus)} />
              },
              {
                key: "electronic",
                label: txt("Electronic status"),
                render: (row) => <StatusBadge value={txt(row.electronicStatus)} />
              },
              {
                key: "total",
                label: txt("Montant"),
                align: "right",
                render: (row) => formatCurrency(row.total, row.currency, languageTag)
              },
              {
                key: "actions",
                label: txt("Actions"),
                render: (row) => (
                  <div className="inline-actions">
                    <Link href={`/app/invoices/${row.id}`} className="table-link">
                      {txt("Voir detail")}
                    </Link>
                    <Link
                      href={
                        row.country === "MX"
                          ? "/app/settings/compliance/mexico"
                          : "/app/settings/compliance/france"
                      }
                      className="table-link"
                    >
                      {txt("Compliance")}
                    </Link>
                  </div>
                )
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Derniers rejets")}
          description={txt("Codes de rejet et actions a traiter cote e-invoicing.")}
          action={
            <Link href="/app/settings/compliance/mexico" className="button button-ghost">
              {txt("Ouvrir setup MX")}
            </Link>
          }
        >
          <ul className="list">
            {rejectionLogs.map((log) => (
              <li key={log.id} className="list-item">
                <strong>{log.invoiceNumber}</strong>
                <span className="muted">
                  {log.country} · {log.code} · {log.field}
                </span>
                <div>{txt(log.message)}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
