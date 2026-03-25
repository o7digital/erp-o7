"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import type { NavSection } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function RemaxDemoShell({
  children,
  navigationSections
}: {
  children: ReactNode;
  navigationSections: NavSection[];
}) {
  const pathname = usePathname();

  return (
    <div className="app-shell remax-shell">
      <aside className="sidebar remax-sidebar">
        <div className="sidebar-brand remax-sidebar-brand">
          <span className="brand-mark remax-brand-mark">RX</span>
          <div>
            <strong>RE/MAX Activa</strong>
            <p>Demo de migracion operativa</p>
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

        <div className="remax-sidebar-panel">
          <span>Contexto del cliente</span>
          <strong>35 empleados</strong>
          <p>4 administrativos, 1 recepcion y el resto asesores clase A y M.</p>
        </div>

        <div className="remax-sidebar-panel">
          <span>Vision de producto</span>
          <strong>Fase A + Fase B</strong>
          <p>Astro + Supabase + Railway ahora, wrapper iOS / Android despues.</p>
        </div>

        <div className="sidebar-footer remax-sidebar-footer">
          <div className="footer-block">
            <span>Operacion actual</span>
            <strong>Microsoft Access</strong>
          </div>
          <div className="footer-block">
            <span>Objetivo</span>
            <strong>Webapp multiusuario</strong>
          </div>
        </div>
      </aside>

      <div className="shell-main remax-main">
        <header className="topbar remax-topbar">
          <div>
            <p className="topbar-label">Cuenta demo para preventa</p>
            <strong>RE/MAX Activa · Nuevo modelo de operacion</strong>
          </div>
          <div className="topbar-actions">
            <Link href="/remax-demo/propiedades" className="button button-secondary">
              Ver propiedades
            </Link>
            <Link href="/remax-demo/arquitectura" className="button">
              Ver roadmap
            </Link>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
