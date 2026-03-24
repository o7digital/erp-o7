import Link from "next/link";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  activities,
  deals,
  invoiceValidations,
  invoices,
  jurisdictionProfiles,
  pipelineStages,
  tasks
} from "@/lib/erp-data";
import { formatCurrency } from "@/lib/formatters";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function DashboardPage() {
  const { languageTag, txt } = await getDemoI18n();
  const pipelineValue = deals.reduce((total, deal) => total + deal.amount, 0);
  const readyInvoices = invoices.filter((invoice) => invoice.providerStatus === "ready").length;
  const blockedTasks = tasks.filter((task) => task.status === "Blocked").length;
  const invoicesWithIssues = invoiceValidations.filter((item) => item.issues.length > 0).length;

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Dashboard")}
        description={txt(
          "Vue d'ensemble de l'activite ERP, du pipe commercial et de la conformite facture electronique."
        )}
        actions={
          <div className="button-row">
            <Link href="/app/invoices" className="button">
              {txt("Ouvrir Invoices")}
            </Link>
            <Link href="/app/settings/compliance" className="button button-secondary">
              {txt("Ouvrir Compliance")}
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard
          label={txt("Pipeline ouvert")}
          value={formatCurrency(pipelineValue, "USD", languageTag)}
          detail={txt("3 deals actifs")}
        />
        <StatCard
          label={txt("Factures prêtes")}
          value={String(readyInvoices)}
          detail={txt("flux FR/MX prêts a emettre")}
        />
        <StatCard
          label={txt("Tasks bloquees")}
          value={String(blockedTasks)}
          detail={txt("actions compliance a lever")}
        />
        <StatCard
          label={txt("Factures a corriger")}
          value={String(invoicesWithIssues)}
          detail={txt("validations avec erreurs")}
        />
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Pipeline actif")}
          description={txt("Opportunites en cours et prochaine action commerciale.")}
          action={
            <Link href="/app/pipeline" className="button button-ghost">
              {txt("Pipeline")}
            </Link>
          }
        >
          <DataTable
            rows={deals}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "deal",
                label: txt("Deal"),
                render: (row) => (
                  <div>
                    <strong>{row.name}</strong>
                    <div className="muted">{row.client}</div>
                  </div>
                )
              },
              {
                key: "stage",
                label: txt("Stage"),
                render: (row) => <StatusBadge value={txt(row.stage)} />
              },
              { key: "owner", label: txt("Owner"), render: (row) => row.owner },
              { key: "next", label: txt("Next step"), render: (row) => txt(row.nextStep) },
              {
                key: "amount",
                label: txt("Montant"),
                align: "right",
                render: (row) => formatCurrency(row.amount, row.currency, languageTag)
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Pipeline par stage")}
          description={txt("Concentration de valeur dans les etapes de vente.")}
        >
          <ul className="list">
            {pipelineStages.map((stage) => (
              <li key={stage.id} className="list-item">
                <strong>{txt(stage.name)}</strong>
                <span className="muted">
                  {stage.deals} {txt("deals")} · {formatCurrency(stage.amount, "USD", languageTag)}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title={txt("Flux facture electronique")}
          description={txt("Suivi des statuts d'emission, de validation et de transmission.")}
          action={
            <Link href="/app/invoices/events" className="button button-ghost">
              {txt("Logs")}
            </Link>
          }
        >
          <DataTable
            rows={invoices}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "invoice",
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
              {
                key: "business",
                label: txt("Metier"),
                render: (row) => <StatusBadge value={txt(row.businessStatus)} />
              },
              {
                key: "electronic",
                label: txt("E-invoicing"),
                render: (row) => <StatusBadge value={txt(row.electronicStatus)} />
              },
              {
                key: "provider",
                label: txt("Provider"),
                render: (row) => <StatusBadge value={txt(row.providerStatus)} />
              }
            ]}
          />
        </SectionCard>

        <SectionCard
          title={txt("Timeline operations")}
          description={txt("Dernieres actions operationnelles et admin.")}
        >
          <ul className="list">
            {activities.map((activity) => (
              <li key={activity.id} className="timeline-item">
                <strong>{txt(activity.event)}</strong>
                <span className="muted">
                  {activity.entity} · {activity.actor} · {activity.occurredAt}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title={txt("Conformite par pays")}
        description={txt("Obligations actives et formats pris en charge dans l'ERP.")}
      >
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
            { key: "model", label: txt("Mode"), render: (row) => txt(row.transmissionModel) },
            {
              key: "formats",
              label: txt("Formats"),
              render: (row) => <div className="inline-stack">{row.supportedFormats.map((format) => <StatusBadge key={format} value={format} />)}</div>
            },
            {
              key: "obligations",
              label: txt("Statuts"),
              render: (row) => (
                <div className="inline-stack">
                  {row.obligations.map((status) => (
                    <StatusBadge key={status.flow} value={`${txt(status.flow)}: ${txt(status.state)}`} />
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
