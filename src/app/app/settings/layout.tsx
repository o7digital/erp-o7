import type { ReactNode } from "react";

import { Subnav } from "@/components/subnav";
import { getSettingsLinks } from "@/lib/nav";
import { getDemoI18n } from "@/lib/server-i18n";

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const { txt } = await getDemoI18n();

  return (
    <div className="page-stack">
      <Subnav items={getSettingsLinks(txt)} />
      {children}
    </div>
  );
}
