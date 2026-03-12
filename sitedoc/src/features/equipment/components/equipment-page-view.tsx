import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { equipmentRows } from "@/src/features/equipment/mocks/equipment.mocks";

export function EquipmentPageView() {
  return (
    <div>
      <PageHeader title="Equipment Not On Rack" subtitle="Off-rack equipment list and notes." phase="Phase B — Assets" />
      <SectionCard title="Equipment Not On Rack workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Equipment","Location","Status"]}>
          {equipmentRows.map((row) => (
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
