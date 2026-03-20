import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { tasks } from "@/lib/erp-data";

export default function TasksPage() {
  const dueToday = tasks.filter((task) => task.status === "Due today").length;
  const blocked = tasks.filter((task) => task.status === "Blocked").length;

  return (
    <div className="page-stack">
      <PageHeader title="Tasks" description="Pilotage operationnel des actions commerciales, finance et compliance." />

      <div className="stats-grid">
        <StatCard label="Open tasks" value={String(tasks.length)} detail="file active" />
        <StatCard label="Due today" value={String(dueToday)} detail="priorite execution" />
        <StatCard label="Blocked" value={String(blocked)} detail="necessite arbitrage" />
        <StatCard label="Owners actifs" value="4" detail="sales + ops + finance" />
      </div>

      <SectionCard title="Queue operationnelle" description="Tasks avec priorite, echeance et blocages.">
        <DataTable
          rows={tasks}
          getRowId={(row) => row.id}
          columns={[
            { key: "title", label: "Task", render: (row) => row.title },
            { key: "client", label: "Client", render: (row) => row.client },
            { key: "owner", label: "Owner", render: (row) => row.owner },
            { key: "due", label: "Due date", render: (row) => row.dueDate },
            { key: "priority", label: "Priorite", render: (row) => <StatusBadge value={row.priority} /> },
            { key: "status", label: "Statut", render: (row) => <StatusBadge value={row.status} /> }
          ]}
        />
      </SectionCard>
    </div>
  );
}

