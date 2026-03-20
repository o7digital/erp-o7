import type { ReactNode } from "react";

import { ErpShell } from "@/components/erp-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <ErpShell>{children}</ErpShell>;
}

