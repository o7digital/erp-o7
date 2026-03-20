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

export default async function InvoiceDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
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
              Retour invoices
            </Link>
            <Link href="/app/invoices/events" className="button button-secondary">
              Timeline events
            </Link>
            <Link
              href={
                invoice.country === "MX"
                  ? "/app/settings/compliance/mexico"
                  : "/app/settings/compliance/france"
              }
              className="button"
            >
              Settings pays
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label="Montant total"
          value={formatCurrency(invoice.total, invoice.currency)}
          detail={`Serie ${invoice.series}`}
        />
        <StatCard
          label="Balance"
          value={formatCurrency(invoice.balance, invoice.currency)}
          detail={`Due ${invoice.dueDate}`}
        />
        <StatCard label="ERP status" value={invoice.businessStatus} detail="workflow ERP" />
        <StatCard
          label="Electronic status"
          value={invoice.electronicStatus}
          detail={invoice.providerStatus}
        />
      </div>

      <div className="two-columns">
        <SectionCard title="Header facture" description="Infos de base de la piece et du client.">
          <div className="info-grid">
            <div className="info-item">
              <span>Client</span>
              <strong>{invoice.client}</strong>
            </div>
            <div className="info-item">
              <span>Pays</span>
              <strong>{invoice.country}</strong>
            </div>
            <div className="info-item">
              <span>Date d'emission</span>
              <strong>{invoice.issueDate}</strong>
            </div>
            <div className="info-item">
              <span>Date d'echeance</span>
              <strong>{invoice.dueDate}</strong>
            </div>
            <div className="info-item">
              <span>ERP status</span>
              <strong>
                <StatusBadge value={invoice.businessStatus} />
              </strong>
            </div>
            <div className="info-item">
              <span>Electronic status</span>
              <strong>
                <StatusBadge value={invoice.electronicStatus} />
              </strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Bloc conformite" description="Champs pays requis pour l'e-invoicing.">
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
        <SectionCard title="Lignes facture" description="Contenu economique detaille de la piece.">
          <DataTable
            rows={invoice.lines}
            getRowId={(row) => row.id}
            columns={[
              { key: "label", label: "Ligne", render: (row) => row.label },
              { key: "quantity", label: "Quantite", align: "right", render: (row) => row.quantity },
              {
                key: "unitPrice",
                label: "PU",
                align: "right",
                render: (row) => formatCurrency(row.unitPrice, invoice.currency)
              },
              {
                key: "taxRate",
                label: "Taxe",
                align: "right",
                render: (row) => `${row.taxRate}%`
              },
              {
                key: "total",
                label: "Total",
                align: "right",
                render: (row) => formatCurrency(row.total, invoice.currency)
              }
            ]}
          />
        </SectionCard>

        <SectionCard title="Taxes" description="Sous-total, taxes et total facture.">
          <div className="summary-bar">
            <div className="summary-block">
              <span>Subtotal</span>
              <strong>{formatCurrency(taxSummary.subtotal, invoice.currency)}</strong>
            </div>
            <div className="summary-block">
              <span>Taxes</span>
              <strong>{formatCurrency(taxSummary.taxTotal, invoice.currency)}</strong>
            </div>
            <div className="summary-block">
              <span>Total</span>
              <strong>{formatCurrency(taxSummary.total, invoice.currency)}</strong>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span>Format</span>
              <strong>{invoice.format}</strong>
            </div>
            <div className="info-item">
              <span>Serie</span>
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
        <SectionCard title="Identite fiscale" description="Entite fiscale rattachee a la facture.">
          {taxIdentity ? (
            <div className="info-grid">
              <div className="info-item">
                <span>Label</span>
                <strong>{taxIdentity.label}</strong>
              </div>
              <div className="info-item">
                <span>Legal name</span>
                <strong>{taxIdentity.legalName}</strong>
              </div>
              <div className="info-item">
                <span>Tax ID</span>
                <strong className="mono">{taxIdentity.taxId}</strong>
              </div>
              <div className="info-item">
                <span>Regime / profil</span>
                <strong>{taxIdentity.regime}</strong>
              </div>
              <div className="info-item">
                <span>Postal code</span>
                <strong>{taxIdentity.postalCode}</strong>
              </div>
              <div className="info-item">
                <span>Provider readiness</span>
                <strong>
                  <StatusBadge value={taxIdentity.providerStatus} />
                </strong>
              </div>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Validations fiscales" description="Erreurs et warnings calcules sur la piece.">
          {validation && validation.issues.length > 0 ? (
            <ul className="list">
              {validation.issues.map((issue) => (
                <li key={`${issue.field}-${issue.message}`} className="list-item">
                  <strong>
                    <StatusBadge value={issue.severity} /> {issue.field}
                  </strong>
                  <span className="muted">{issue.scope}</span>
                  <div>{issue.message}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="list-item">
              <strong>Aucune erreur bloquante</strong>
              <span className="muted">La facture est prete du point de vue validation.</span>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard title="Timeline evenements" description="Validation, soumission et retours provider.">
          <ul className="list">
            {relatedEvents.map((event) => (
              <li key={event.id} className="timeline-item">
                <strong>{event.type}</strong>
                <span className="muted">
                  {event.occurredAt} · {event.provider}
                </span>
                <div>
                  <StatusBadge value={event.status} /> {event.message}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Payloads, paiements et rejets" description="Artefacts techniques et encaissements lies.">
          <ul className="list">
            {invoice.payloadRefs.map((payload) => (
              <li key={payload.id} className="list-item">
                <strong>{payload.type}</strong>
                <span className="muted mono">{payload.storage}</span>
                <div>
                  <StatusBadge value={payload.status} />
                </div>
              </li>
            ))}
            {relatedPayments.map((payment) => (
              <li key={payment.id} className="list-item">
                <strong>{payment.method}</strong>
                <span className="muted">
                  {payment.paidAt} · {formatCurrency(payment.amount, payment.currency)}
                </span>
                <div>
                  <StatusBadge value={payment.status} />
                </div>
              </li>
            ))}
            {invoiceRejections.map((log) => (
              <li key={log.id} className="list-item">
                <strong>{log.code}</strong>
                <span className="muted">{log.field}</span>
                <div>{log.message}</div>
              </li>
            ))}
            {invoice.payloadRefs.length === 0 &&
            relatedPayments.length === 0 &&
            invoiceRejections.length === 0 ? (
              <li className="list-item">
                <strong>Aucun artefact additionnel</strong>
                <span className="muted">La facture n'a pas encore de payload ni de paiement rattache.</span>
              </li>
            ) : null}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
