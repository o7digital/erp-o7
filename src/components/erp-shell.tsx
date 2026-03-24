"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { DemoLocale } from "@/lib/demo-locale";
import type { NavSection } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ErpShell({
  children,
  locale,
  navigationSections,
  workspace,
  shellCopy
}: {
  children: ReactNode;
  locale: DemoLocale;
  navigationSections: NavSection[];
  workspace: {
    productName: string;
    workspaceName: string;
    planName: string;
    activeSeats: number;
    seatLimit: number;
  };
  shellCopy: {
    workspaceLabel: string;
    seatsLabel: string;
    activeTenantLabel: string;
    invoicesLabel: string;
    complianceLabel: string;
  };
}) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">O7</span>
          <div>
            <strong>{workspace.productName}</strong>
            <p>{workspace.workspaceName}</p>
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
            <span>{shellCopy.workspaceLabel}</span>
            <strong>{workspace.planName}</strong>
          </div>
          <div className="footer-block">
            <span>{shellCopy.seatsLabel}</span>
            <strong>
              {workspace.activeSeats}/{workspace.seatLimit}
            </strong>
          </div>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div>
            <p className="topbar-label">{shellCopy.activeTenantLabel}</p>
            <strong>{workspace.workspaceName}</strong>
          </div>
          <div className="topbar-actions">
            <LanguageSwitcher locale={locale} />
            <Link href="/app/invoices" className="button button-secondary">
              {shellCopy.invoicesLabel}
            </Link>
            <Link href="/app/settings/compliance" className="button">
              {shellCopy.complianceLabel}
            </Link>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
