import type { ReactNode } from "react";

export function RemaxPageHeader({
  title,
  description,
  actions
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="remax-page-header">
      <div>
        <p className="remax-eyebrow">REMAX ACTIVA</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="remax-header-actions">{actions}</div> : null}
    </header>
  );
}
