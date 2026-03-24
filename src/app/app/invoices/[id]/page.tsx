import Link from "next/link";
import { notFound } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  electronicInvoiceEvents,
  getInvoiceById,
  getInvoiceComplianceFields,
  getInvoiceTaxSummary,
  invoiceValidations,
  payments,
  rejectionLogs,
  taxIdentities
} from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function InvoiceDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { languageTag, txt } = await getDemoI18n();
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const validation = invoiceValidations.find((entry) => entry.invoiceId === invoice.id);
  const relatedPayments = payments.filter((payment) => payment.invoiceId === invoice.id);
  const relatedEvents = electronicInvoiceEvents.filter((event) => event.invoiceId === invoice.id);
  const taxIdentity = taxIdentities.find((identity) => identity.id === invoice.taxIdentityId);
  const invoiceRejections = rejectionLogs.filter((log) => log.invoiceNumber === invoice.number);
  const taxSummary = getInvoiceTaxSummary(invoice);
  const complianceFields = getInvoiceComplianceFields(invoice);

  return (
    <div className="page-stack">
      <PageHeader
        title={invoice.number}
        description={`${invoice.client} · ${invoice.country} · ${invoice.provider}`}
        actions={
          <div className="button-row">
            <Link href="/app/invoices" className="button button-secondary">
              {txt("Retour invoices")}
            </Link>
            <Link href="/app/invoices/events" className="button button-secondary">
              {txt("Timeline events")}
            </Link>
            <Link
              href={
                invoice.country === "MX"
                  ? "/app/settings/compliance/mexico"
                  : "/app/settings/compliance/france"
              }
              className="button"
            >
              {txt("Settings pays")}
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label={txt("Montant total")}
          value={formatCurrency(invoice.total, invoice.currency, languageTag)}
          detail={`${txt("Serie")} ${invoice.series}`}
        />
        <StatCard
          label={txt("Balance")}
          value={formatCurrency(invoice.balance, invoice.currency, languageTag)}
          detail={`${txt("Due")} ${invoice.dueDate}`}
        />
        <StatCard label={txt("ERP status")} value={txt(invoice.businessStatus)} detail={txt("workflow ERP")} />
        <StatCard
          label={txt("Electronic status")}
          value={txt(invoice.electronicStatus)}
          detail={invoice.providerStatus}
        />
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Header facture")} description={txt("Infos de base de la piece et du client.")}>
          <div className="info-grid">
            <div className="info-item">
              <span>{txt("Client")}</span>
              <strong>{invoice.client}</strong>
            </div>
            <div className="info-item">
              <span>{txt("Pays")}</span>
              <strong>{invoice.country}</strong>
            </div>
            <div className="info-item">
              <span>{txt("Date d'emission")}</span>
              <strong>{invoice.issueDate}</strong>
            </div>
            <div className="info-item">
              <span>{txt("Date d'echeance")}</span>
              <strong>{invoice.dueDate}</strong>
            </div>
            <div className="info-item">
              <span>{txt("ERP status")}</span>
              <strong>
                <StatusBadge value={txt(invoice.businessStatus)} />
              </strong>
            </div>
            <div className="info-item">
              <span>{txt("Electronic status")}</span>
              <strong>
                <StatusBadge value={txt(invoice.electronicStatus)} />
              </strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard title={txt("Bloc conformite")} description={txt("Champs pays requis pour l'e-invoicing.")}>
          <ul className="key-value-list">
            {complianceFields.map((field) => (
              <li key={field.key}>
                <span>{field.key}</span>
                <strong className="mono">{field.value}</strong>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Lignes facture")} description={txt("Contenu economique detaille de la piece.")}>
          <DataTable
            rows={invoice.lines}
            getRowId={(row) => row.id}
            columns={[
              { key: "label", label: txt("Ligne"), render: (row) => row.label },
              { key: "quantity", label: txt("Quantite"), align: "right", render: (row) => row.quantity },
              {
                key: "unitPrice",
                label: "PU",
                align: "right",
                render: (row) => formatCurrency(row.unitPrice, invoice.currency, languageTag)
              },
              {
                key: "taxRate",
                label: txt("Taxe"),
                align: "right",
                render: (row) => `${row.taxRate}%`
              },
              {
                key: "total",
                label: txt("Total"),
                align: "right",
                render: (row) => formatCurrency(row.total, invoice.currency, languageTag)
              }
            ]}
          />
        </SectionCard>

        <SectionCard title={txt("Taxes")} description={txt("Sous-total, taxes et total facture.")}>
          <div className="summary-bar">
            <div className="summary-block">
              <span>{txt("Subtotal")}</span>
              <strong>{formatCurrency(taxSummary.subtotal, invoice.currency, languageTag)}</strong>
            </div>
            <div className="summary-block">
              <span>{txt("Taxes")}</span>
              <strong>{formatCurrency(taxSummary.taxTotal, invoice.currency, languageTag)}</strong>
            </div>
            <div className="summary-block">
              <span>{txt("Total")}</span>
              <strong>{formatCurrency(taxSummary.total, invoice.currency, languageTag)}</strong>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span>Format</span>
              <strong>{invoice.format}</strong>
            </div>
            <div className="info-item">
              <span>{txt("Serie")}</span>
              <strong>{invoice.series}</strong>
            </div>
            <div className="info-item">
              <span>Provider</span>
              <strong>{invoice.provider}</strong>
            </div>
            <div className="info-item">
              <span>Owner</span>
              <strong>{invoice.owner}</strong>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Identite fiscale")} description={txt("Entite fiscale rattachee a la facture.")}>
          {taxIdentity ? (
            <div className="info-grid">
              <div className="info-item">
                <span>{txt("Label")}</span>
                <strong>{taxIdentity.label}</strong>
              </div>
              <div className="info-item">
                <span>{txt("Legal name")}</span>
                <strong>{taxIdentity.legalName}</strong>
              </div>
              <div className="info-item">
                <span>{txt("Tax ID")}</span>
                <strong className="mono">{taxIdentity.taxId}</strong>
              </div>
              <div className="info-item">
                <span>Regime / profil</span>
                <strong>{taxIdentity.regime}</strong>
              </div>
              <div className="info-item">
                <span>{txt("Postal code")}</span>
                <strong>{taxIdentity.postalCode}</strong>
              </div>
              <div className="info-item">
                <span>{txt("Provider readiness")}</span>
                <strong>
                  <StatusBadge value={txt(taxIdentity.providerStatus)} />
                </strong>
              </div>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title={txt("Validations fiscales")} description={txt("Erreurs et warnings calcules sur la piece.")}>
          {validation && validation.issues.length > 0 ? (
            <ul className="list">
              {validation.issues.map((issue) => (
                <li key={`${issue.field}-${issue.message}`} className="list-item">
                  <strong>
                    <StatusBadge value={txt(issue.severity)} /> {issue.field}
                  </strong>
                  <span className="muted">{issue.scope}</span>
                  <div>{txt(issue.message)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="list-item">
              <strong>{txt("Aucune erreur bloquante")}</strong>
              <span className="muted">{txt("La facture est prete du point de vue validation.")}</span>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title={txt("Timeline evenements")} description={txt("Validation, soumission et retours provider.")}>
          <ul className="list">
            {relatedEvents.map((event) => (
              <li key={event.id} className="timeline-item">
                <strong>{txt(event.type)}</strong>
                <span className="muted">
                  {event.occurredAt} · {event.provider}
                </span>
                <div>
                  <StatusBadge value={txt(event.status)} /> {txt(event.message)}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={txt("Payloads, paiements et rejets")} description={txt("Artefacts techniques et encaissements lies.")}>
          <ul className="list">
            {invoice.payloadRefs.map((payload) => (
              <li key={payload.id} className="list-item">
                <strong>{payload.type}</strong>
                <span className="muted mono">{payload.storage}</span>
                <div>
                  <StatusBadge value={txt(payload.status)} />
                </div>
              </li>
            ))}
            {relatedPayments.map((payment) => (
              <li key={payment.id} className="list-item">
                <strong>{payment.method}</strong>
                <span className="muted">
                  {payment.paidAt} · {formatCurrency(payment.amount, payment.currency, languageTag)}
                </span>
                <div>
                  <StatusBadge value={txt(payment.status)} />
                </div>
              </li>
            ))}
            {invoiceRejections.map((log) => (
              <li key={log.id} className="list-item">
                <strong>{log.code}</strong>
                <span className="muted">{log.field}</span>
                <div>{txt(log.message)}</div>
              </li>
            ))}
            {invoice.payloadRefs.length === 0 &&
            relatedPayments.length === 0 &&
            invoiceRejections.length === 0 ? (
              <li className="list-item">
                <strong>{txt("Aucun artefact additionnel")}</strong>
                <span className="muted">{txt("La facture n'a pas encore de payload ni de paiement rattache.")}</span>
              </li>
            ) : null}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
