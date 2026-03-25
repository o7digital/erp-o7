import type { NavSection } from "@/lib/nav";

export const remaxDemoNavigation: NavSection[] = [
  {
    title: "Procesos",
    items: [
      { label: "Menu Operacion", href: "/remax-demo" },
      { label: "Alta", href: "/remax-demo/alta" },
      { label: "Baja", href: "/remax-demo/baja" },
      { label: "Cancelacion", href: "/remax-demo/cancelacion" }
    ]
  },
  {
    title: "Consultas",
    items: [
      { label: "Valores", href: "/remax-demo/valores" },
      { label: "Asesores", href: "/remax-demo/asesores" },
      { label: "Propietarios", href: "/remax-demo/propietarios" },
      { label: "Comunicados", href: "/remax-demo/comunicados" }
    ]
  },
  {
    title: "Propuesta",
    items: [{ label: "Arquitectura propuesta", href: "/remax-demo/arquitectura" }]
  }
];
