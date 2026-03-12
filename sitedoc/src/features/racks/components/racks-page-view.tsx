import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { racksRows } from "@/src/features/racks/mocks/racks.mocks";

export function RacksPageView() {
  return (
    <div>
      <PageHeader title="Racks Information" subtitle="Rack definitions and location context." phase="Phase B — Assets" />
      <SectionCard title="Racks Information workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Rack","Location","Status"]}>
          {racksRows.map((row) => (
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
