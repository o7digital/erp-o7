import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { invoiceValidations, invoices, rejectionLogs } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";

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
        title="Invoices"
        description="Registre facture ERP avec filtres, statuts metier, suivi e-invoicing et acces detail par piece."
        actions={
          <div className="button-row">
            <Link href="/app/invoices/events" className="button button-secondary">
              Events
            </Link>
            <Link href="/app/settings/tax-identities" className="button button-secondary">
              Tax identities
            </Link>
            <Link href="/app/settings/invoice-series" className="button">
              Invoice series
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Factures ouvertes" value={String(openInvoices)} detail="avec balance non nulle" />
        <StatCard label="Soumises" value={String(transmitted)} detail="transmissions envoyees" />
        <StatCard label="Rejetees" value={String(rejected)} detail="a corriger en priorite" />
        <StatCard label="Validations KO" value={String(validationQueue)} detail="factures avec erreurs" />
      </div>

      <SectionCard title="Filtres" description="Recherche et filtrage du registre des factures.">
        <form className="filter-form" action="/app/invoices" method="get">
          <div className="filter-grid">
            <div className="field">
              <label className="field-label">Recherche</label>
              <input
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Numero ou client"
              />
            </div>
            <div className="field">
              <label className="field-label">Pays</label>
              <select name="country" defaultValue={countryFilter}>
                <option value="all">Tous</option>
                <option value="FR">France</option>
                <option value="MX">Mexique</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">ERP status</label>
              <select name="erp_status" defaultValue={erpStatusFilter}>
                <option value="all">Tous</option>
                <option value="draft">draft</option>
                <option value="issued">issued</option>
                <option value="partially_paid">partially_paid</option>
                <option value="paid">paid</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">Electronic status</label>
              <select name="electronic_status" defaultValue={electronicStatusFilter}>
                <option value="all">Tous</option>
                <option value="not_configured">not_configured</option>
                <option value="ready">ready</option>
                <option value="validation_error">validation_error</option>
                <option value="ready_to_submit">ready_to_submit</option>
                <option value="submitted">submitted</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">Actions</label>
              <div className="inline-actions">
                <button type="submit" className="button">
                  Filtrer
                </button>
                <Link href="/app/invoices" className="button button-secondary">
                  Reset
                </Link>
              </div>
            </div>
          </div>
        </form>
      </SectionCard>

      <div className="two-columns">
        <SectionCard title="Registre des factures" description="Vue finance + compliance avec filtres et actions rapides.">
          <DataTable
            rows={filteredInvoices}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "number",
                label: "Invoice",
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
              { key: "issueDate", label: "Date", render: (row) => row.issueDate },
              { key: "country", label: "Pays", render: (row) => <StatusBadge value={row.country} /> },
              { key: "business", label: "ERP status", render: (row) => <StatusBadge value={row.businessStatus} /> },
              { key: "electronic", label: "Electronic status", render: (row) => <StatusBadge value={row.electronicStatus} /> },
              {
                key: "total",
                label: "Montant",
                align: "right",
                render: (row) => formatCurrency(row.total, row.currency)
              },
              {
                key: "actions",
                label: "Actions",
                render: (row) => (
                  <div className="inline-actions">
                    <Link href={`/app/invoices/${row.id}`} className="table-link">
                      Voir detail
                    </Link>
                    <Link
                      href={
                        row.country === "MX"
                          ? "/app/settings/compliance/mexico"
                          : "/app/settings/compliance/france"
                      }
                      className="table-link"
                    >
                      Compliance
                    </Link>
                  </div>
                )
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title="Derniers rejets"
          description="Codes de rejet et actions a traiter cote e-invoicing."
          action={
            <Link href="/app/settings/compliance/mexico" className="button button-ghost">
              Ouvrir setup MX
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
                <div>{log.message}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
