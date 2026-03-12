import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { layoutsRows } from "@/src/features/layouts/mocks/layouts.mocks";

export function LayoutsPageView() {
  return (
    <div>
      <PageHeader title="Layouts Hub" subtitle="Topology and deck layout review." phase="Phase C — Layout" />
      <SectionCard title="Layouts Hub workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Layout","Reference","Status"]}>
          {layoutsRows.map((row) => (
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
