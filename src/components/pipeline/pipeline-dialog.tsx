import type { ReactNode } from "react";

export function PipelineDialog({
  eyebrow,
  title,
  description,
  children,
  onClose
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="pipeline-dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="pipeline-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pipeline-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pipeline-dialog-header">
          <div>
            <p className="pipeline-dialog-eyebrow">{eyebrow}</p>
            <h2 id="pipeline-dialog-title">{title}</h2>
            <p>{description}</p>
          </div>
          <button type="button" className="pipeline-icon-button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="pipeline-dialog-body">{children}</div>
      </div>
    </div>
  );
}
