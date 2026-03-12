import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  phase,
  actions,
}: {
  title: string;
  subtitle: string;
  phase: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{phase}</p>
        <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
      {actions}
    </header>
  );
}
