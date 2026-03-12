import type { ReactNode } from "react";
import { Navigation } from "@/src/components/layout/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-[1400px]">
        <Navigation />
        <main className="min-h-screen flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
