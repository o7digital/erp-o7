import type { ReactNode } from "react";

export function AccessSection({
  title,
  accent = "blue",
  action,
  children
}: {
  title: string;
  accent?: "blue" | "red" | "gold";
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="remax-card">
      <div className={`remax-section-title remax-section-title-${accent}`}>
        <strong>{title}</strong>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="remax-card-body">{children}</div>
    </section>
  );
}
