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

export default function DashboardPage() {
  const pipelineValue = deals.reduce((total, deal) => total + deal.amount, 0);
  const readyInvoices = invoices.filter((invoice) => invoice.providerStatus === "ready").length;
  const blockedTasks = tasks.filter((task) => task.status === "Blocked").length;
  const invoicesWithIssues = invoiceValidations.filter((item) => item.issues.length > 0).length;

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Vue d'ensemble de l'activite ERP, du pipe commercial et de la conformite facture electronique."
        actions={
          <div className="button-row">
            <Link href="/app/invoices" className="button">
              Ouvrir Invoices
            </Link>
            <Link href="/app/settings/compliance" className="button button-secondary">
              Ouvrir Compliance
            </Link>
          </div>
        }
      />

      <div className="stats-grid">
        <StatCard label="Pipeline ouvert" value={formatCurrency(pipelineValue, "EUR")} detail="3 deals actifs" />
        <StatCard label="Factures prêtes" value={String(readyInvoices)} detail="flux FR/MX prêts a emettre" />
        <StatCard label="Tasks bloquees" value={String(blockedTasks)} detail="actions compliance a lever" />
        <StatCard label="Factures a corriger" value={String(invoicesWithIssues)} detail="validations avec erreurs" />
      </div>

      <div className="two-columns">
        <SectionCard
          title="Pipeline actif"
          description="Opportunites en cours et prochaine action commerciale."
          action={
            <Link href="/app/pipeline" className="button button-ghost">
              Pipeline
            </Link>
          }
        >
          <DataTable
            rows={deals}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "deal",
                label: "Deal",
                render: (row) => (
                  <div>
                    <strong>{row.name}</strong>
                    <div className="muted">{row.client}</div>
                  </div>
                )
              },
              { key: "stage", label: "Stage", render: (row) => <StatusBadge value={row.stage} /> },
              { key: "owner", label: "Owner", render: (row) => row.owner },
              { key: "next", label: "Next step", render: (row) => row.nextStep },
              {
                key: "amount",
                label: "Montant",
                align: "right",
                render: (row) => formatCurrency(row.amount, "EUR")
              }
            ]}
          />
        </SectionCard>

        <SectionCard title="Pipeline par stage" description="Concentration de valeur dans les etapes de vente.">
          <ul className="list">
            {pipelineStages.map((stage) => (
              <li key={stage.id} className="list-item">
                <strong>{stage.name}</strong>
                <span className="muted">
                  {stage.deals} deals · {formatCurrency(stage.amount, "EUR")}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="two-columns">
        <SectionCard
          title="Flux facture electronique"
          description="Suivi des statuts d'emission, de validation et de transmission."
          action={
            <Link href="/app/invoices/events" className="button button-ghost">
              Logs
            </Link>
          }
        >
          <DataTable
            rows={invoices}
            getRowId={(row) => row.id}
            columns={[
              {
                key: "invoice",
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
              { key: "business", label: "Metier", render: (row) => <StatusBadge value={row.businessStatus} /> },
              { key: "electronic", label: "E-invoicing", render: (row) => <StatusBadge value={row.electronicStatus} /> },
              { key: "provider", label: "Provider", render: (row) => <StatusBadge value={row.providerStatus} /> }
            ]}
          />
        </SectionCard>

        <SectionCard title="Timeline operations" description="Dernieres actions operationnelles et admin.">
          <ul className="list">
            {activities.map((activity) => (
              <li key={activity.id} className="timeline-item">
                <strong>{activity.event}</strong>
                <span className="muted">
                  {activity.entity} · {activity.actor} · {activity.occurredAt}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Conformite par pays" description="Obligations actives et formats pris en charge dans l'ERP.">
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
            { key: "model", label: "Mode", render: (row) => row.transmissionModel },
            {
              key: "formats",
              label: "Formats",
              render: (row) => <div className="inline-stack">{row.supportedFormats.map((format) => <StatusBadge key={format} value={format} />)}</div>
            },
            {
              key: "obligations",
              label: "Statuts",
              render: (row) => (
                <div className="inline-stack">
                  {row.obligations.map((status) => (
                    <StatusBadge key={status.flow} value={`${status.flow}: ${status.state}`} />
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
