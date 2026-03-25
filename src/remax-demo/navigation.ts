import type { NavSection } from "@/lib/nav";

export const remaxDemoNavigation: NavSection[] = [
  {
    title: "Operacion",
    items: [
      { label: "Dashboard", href: "/remax-demo/dashboard" },
      { label: "Propiedades", href: "/remax-demo/propiedades" },
      { label: "Asesores", href: "/remax-demo/asesores" },
      { label: "Historial de valores", href: "/remax-demo/valores" },
      { label: "Comunicados", href: "/remax-demo/comunicados" }
    ]
  },
  {
    title: "Propuesta",
    items: [{ label: "Arquitectura y roadmap", href: "/remax-demo/arquitectura" }]
  }
];
