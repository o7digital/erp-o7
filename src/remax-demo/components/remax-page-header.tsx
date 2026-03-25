import type { ReactNode } from "react";

export function RemaxPageHeader({
  eyebrow = "REMAX demo",
  title,
  description,
  actions
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header remax-page-header">
      <div className="remax-header-copy">
        <p className="remax-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}
