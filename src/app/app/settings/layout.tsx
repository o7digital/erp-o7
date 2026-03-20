import type { ReactNode } from "react";

import { Subnav } from "@/components/subnav";
import { settingsLinks } from "@/lib/nav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-stack">
      <Subnav items={settingsLinks} />
      {children}
    </div>
  );
}

