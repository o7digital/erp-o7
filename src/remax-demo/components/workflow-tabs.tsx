import Link from "next/link";

export function WorkflowTabs({
  items
}: {
  items: Array<{ label: string; href: string; active?: boolean }>;
}) {
  return (
    <nav className="remax-workflow-tabs">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={item.active ? "remax-workflow-tab active" : "remax-workflow-tab"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
