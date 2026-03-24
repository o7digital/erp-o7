import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { tasks } from "@/lib/erp-data";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function TasksPage() {
  const { txt } = await getDemoI18n();
  const dueToday = tasks.filter((task) => task.status === "Due today").length;
  const blocked = tasks.filter((task) => task.status === "Blocked").length;

  return (
    <div className="page-stack">
      <PageHeader
        title={txt("Tasks")}
        description={txt("Pilotage operationnel des actions commerciales, finance et compliance.")}
      />

      <div className="stats-grid">
        <StatCard label={txt("Open tasks")} value={String(tasks.length)} detail={txt("file active")} />
        <StatCard label={txt("Due today")} value={String(dueToday)} detail={txt("priorite execution")} />
        <StatCard label={txt("Blocked")} value={String(blocked)} detail={txt("necessite arbitrage")} />
        <StatCard label={txt("Owners actifs")} value="4" detail={txt("sales + ops + finance")} />
      </div>

      <SectionCard
        title={txt("Queue operationnelle")}
        description={txt("Tasks avec priorite, echeance et blocages.")}
      >
        <DataTable
          rows={tasks}
          getRowId={(row) => row.id}
          columns={[
            { key: "title", label: txt("Task"), render: (row) => txt(row.title) },
            { key: "client", label: txt("Client"), render: (row) => row.client },
            { key: "owner", label: txt("Owner"), render: (row) => row.owner },
            { key: "due", label: txt("Due date"), render: (row) => row.dueDate },
            { key: "priority", label: txt("Priorite"), render: (row) => <StatusBadge value={txt(row.priority)} /> },
            { key: "status", label: txt("Statut"), render: (row) => <StatusBadge value={txt(row.status)} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}
