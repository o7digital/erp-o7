import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RemaxDemoShell } from "@/remax-demo/components/remax-demo-shell";
import { remaxDemoNavigation } from "@/remax-demo/navigation";

import "./remax-demo.css";

export const metadata: Metadata = {
  title: "RE/MAX Demo",
  description: "Demo comercial y de producto para la migracion de RE/MAX Activa"
};

export default function RemaxDemoLayout({ children }: { children: ReactNode }) {
  return <RemaxDemoShell navigationSections={remaxDemoNavigation}>{children}</RemaxDemoShell>;
}
