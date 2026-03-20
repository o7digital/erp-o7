import type { ReactNode } from "react";

import { Subnav } from "@/components/subnav";
import { complianceLinks } from "@/lib/nav";

export default function ComplianceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-stack">
      <Subnav items={complianceLinks} />
      {children}
    </div>
  );
}
