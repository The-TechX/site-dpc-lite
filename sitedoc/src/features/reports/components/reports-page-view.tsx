import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { reportsRows } from "@/src/features/reports/mocks/reports.mocks";

export function ReportsPageView() {
  return (
    <div>
      <PageHeader title="Generate Report" subtitle="Final site document package generation preview." phase="Phase F — Closeout" />
      <SectionCard title="Generate Report workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Artifact","Readiness","Status"]}>
          {reportsRows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">{row.id}</td>
              <td className="px-3 py-2">{row.col1}</td>
              <td className="px-3 py-2">{row.col2}</td>
              <td className="px-3 py-2"><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </SimpleTable>
      </SectionCard>
    </div>
  );
}
