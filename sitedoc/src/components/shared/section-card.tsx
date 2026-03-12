import type { ReactNode } from "react";

export function SectionCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
