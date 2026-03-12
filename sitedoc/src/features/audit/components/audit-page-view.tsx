import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { auditRows } from "@/src/features/audit/mocks/audit.mocks";

export function AuditPageView() {
  return (
    <div>
      <PageHeader title="CSC Audit" subtitle="Closeout checklist and compliance status." phase="Phase F — Closeout" />
      <SectionCard title="CSC Audit workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Checklist","Owner","Status"]}>
          {auditRows.map((row) => (
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
