import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";
import { workspaceProfile } from "@/lib/erp-data";
import { getNavigationSections } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { locale, txt } = await getDemoI18n();

  return (
    <ErpShell
      locale={locale}
      navigationSections={getNavigationSections(txt)}
      workspace={{
        ...workspaceProfile,
        workspaceName: txt(workspaceProfile.workspaceName),
        planName: txt(workspaceProfile.planName)
      }}
      shellCopy={{
        workspaceLabel: txt("Workspace"),
        seatsLabel: txt("Seats"),
        activeTenantLabel: txt("Tenant actif"),
        invoicesLabel: txt("Factures"),
        complianceLabel: txt("Compliance")
      }}
    >
      {children}
    </ErpShell>
  );
}
