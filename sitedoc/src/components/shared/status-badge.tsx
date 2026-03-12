export function StatusBadge({ status }: { status: "draft" | "in-review" | "published" | "blocked" }) {
  const styles: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700",
    "in-review": "bg-amber-100 text-amber-800",
    published: "bg-emerald-100 text-emerald-800",
    blocked: "bg-rose-100 text-rose-800",
  };

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
