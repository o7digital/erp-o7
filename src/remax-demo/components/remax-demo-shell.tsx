"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import type { NavSection } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getFormTabs(pathname: string, step: string | null) {
  if (pathname === "/remax-demo") {
    return ["Menu Operación"];
  }

  if (pathname === "/remax-demo/alta") {
    const labelByStep = {
      clave: "F-GenClaveProp",
      expediente: "F-PROPIEDADESN",
      condiciones: "F-CONDICIONESRENTA",
      valores: "F-VALORESN",
      asesores: "F-AsesoresALTA1",
      propietarios: "F-PropietariosALTA1",
      ficha: "F-Ficha Técnica"
    } as const;

    return ["Menu Operación", "F-Master", labelByStep[(step ?? "clave") as keyof typeof labelByStep] ?? "F-Master"];
  }

  if (pathname === "/remax-demo/baja") {
    const labelByStep = {
      busqueda: "F-PROPIEDADESNCANCEL",
      registro: "F-Baja",
      valores: "F-VALORESB",
      asesores: "F-AsesoresBaja",
      comunicado: "Comunicado BAJA"
    } as const;

    return ["Menu Operación", "F-Master", labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? "F-Baja"];
  }

  if (pathname === "/remax-demo/cancelacion") {
    const labelByStep = {
      busqueda: "F-PROPIEDADESNCANCEL",
      registro: "F-BajaCancel",
      asesores: "F-AsesoresCancel",
      comunicado: "Comunicado CANCELACIÓN"
    } as const;

    return ["Menu Operación", "F-Master", labelByStep[(step ?? "busqueda") as keyof typeof labelByStep] ?? "F-BajaCancel"];
  }

  if (pathname === "/remax-demo/valores") {
    return ["Menu Operación", "F-Master", "F-VALORESN"];
  }

  if (pathname === "/remax-demo/propietarios") {
    return ["Menu Operación", "F-Master", "F-PropietariosALTA1"];
  }

  if (pathname === "/remax-demo/asesores") {
    return ["Menu Operación", "F-Master", "F-AsesoresALTA1"];
  }

  if (pathname === "/remax-demo/comunicados") {
    return ["Menu Operación", "Outlook", "Comunicado"];
  }

  return ["Menu Operación", "Arquitectura propuesta"];
}

export function RemaxDemoShell({
  children,
  navigationSections
}: {
  children: ReactNode;
  navigationSections: NavSection[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabs = getFormTabs(pathname, searchParams.get("step"));

  return (
    <div className="remax-shell">
      <aside className="remax-sidebar">
        <div className="remax-brand-panel">
          <div className="remax-brand-lockup">
            <span className="remax-brand-mark">RE/MAX</span>
            <span className="remax-brand-sub">ACTIVA</span>
          </div>
          <p>Access-to-modern-app remake</p>
        </div>

        {navigationSections.map((section) => (
          <div key={section.title} className="remax-nav-section">
            <p className="remax-nav-title">{section.title}</p>
            <div className="remax-nav-links">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(pathname, item.href) ? "remax-nav-link active" : "remax-nav-link"}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="remax-side-note">
          <span>Contexto</span>
          <strong>35 empleados</strong>
          <p>4 administrativos, 1 recepcion y el resto asesores clase A y M.</p>
        </div>

        <div className="remax-side-note">
          <span>Punto critico</span>
          <strong>Roles multiples</strong>
          <p>La nueva demo muestra alta, baja y cancelacion sin romper el expediente.</p>
        </div>
      </aside>

      <div className="remax-main">
        <div className="remax-windowbar">
          {tabs.map((tab, index) => (
            <span key={tab} className={index === tabs.length - 1 ? "remax-window-tab active" : "remax-window-tab"}>
              {tab}
            </span>
          ))}
        </div>
        <header className="remax-toolbar">
          <div className="remax-toolbar-ribbon">
            <span className="remax-toolbar-chip">REMAX ACTIVA V1.0</span>
            <span className="remax-toolbar-copy">Menú Operación modernizado</span>
          </div>
          <div className="remax-toolbar-meta">
            <strong>martes, 24 de marzo de 2026</strong>
            <p>Demo de preventa basada en Access</p>
          </div>
        </header>
        <main className="remax-content">{children}</main>
      </div>
    </div>
  );
}
