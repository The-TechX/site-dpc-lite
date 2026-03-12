import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { servicesRows } from "@/src/features/services/mocks/services.mocks";

export function ServicesPageView() {
  return (
    <div>
      <PageHeader title="Services" subtitle="Communication services catalog for the selected site." phase="Phase A — Setup" />
      <SectionCard title="Services workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Service","Provider","Status"]}>
          {servicesRows.map((row) => (
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
