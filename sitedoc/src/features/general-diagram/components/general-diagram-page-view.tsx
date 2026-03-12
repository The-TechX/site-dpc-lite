import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { general_diagramRows } from "@/src/features/general-diagram/mocks/general-diagram.mocks";

export function GeneralDiagramPageView() {
  return (
    <div>
      <PageHeader title="General Diagram" subtitle="Unified signal and service diagram." phase="Phase C — Layout" />
      <SectionCard title="General Diagram workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Section","Change","Status"]}>
          {general_diagramRows.map((row) => (
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
