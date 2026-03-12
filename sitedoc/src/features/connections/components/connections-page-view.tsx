import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { connectionsRows } from "@/src/features/connections/mocks/connections.mocks";

export function ConnectionsPageView() {
  return (
    <div>
      <PageHeader title="Connections Hub" subtitle="Port mapping and cable tracking." phase="Phase C — Layout" />
      <SectionCard title="Connections Hub workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Connection","Endpoint","Status"]}>
          {connectionsRows.map((row) => (
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
