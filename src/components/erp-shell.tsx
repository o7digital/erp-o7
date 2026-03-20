"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { workspaceProfile } from "@/lib/erp-data";
import { navigationSections } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ErpShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">O7</span>
          <div>
            <strong>{workspaceProfile.productName}</strong>
            <p>{workspaceProfile.workspaceName}</p>
          </div>
        </div>

        {navigationSections.map((section) => (
          <div key={section.title} className="nav-section">
            <p className="nav-title">{section.title}</p>
            <div className="nav-links">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(pathname, item.href) ? "nav-link active" : "nav-link"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="sidebar-footer">
          <div className="footer-block">
            <span>Workspace</span>
            <strong>{workspaceProfile.planName}</strong>
          </div>
          <div className="footer-block">
            <span>Seats</span>
            <strong>
              {workspaceProfile.activeSeats}/{workspaceProfile.seatLimit}
            </strong>
          </div>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div>
            <p className="topbar-label">Tenant actif</p>
            <strong>{workspaceProfile.workspaceName}</strong>
          </div>
          <div className="topbar-actions">
            <Link href="/app/invoices" className="button button-secondary">
              Factures
            </Link>
            <Link href="/app/settings/compliance" className="button">
              Compliance
            </Link>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

