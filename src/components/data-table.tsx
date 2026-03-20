import type { ReactNode } from "react";

export interface DataColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  align?: "left" | "right";
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  emptyMessage = "Aucune donnee."
}: {
  columns: DataColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
}) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.align === "right" ? "align-right" : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowId(row)}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={column.align === "right" ? "align-right" : undefined}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

