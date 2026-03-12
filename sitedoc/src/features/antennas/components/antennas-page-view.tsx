import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { antennasRows } from "@/src/features/antennas/mocks/antennas.mocks";

export function AntennasPageView() {
  return (
    <div>
      <PageHeader title="Antennas Hub" subtitle="Antenna validation and evidence tracking." phase="Phase C — Layout" />
      <SectionCard title="Antennas Hub workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Antenna","Verification","Status"]}>
          {antennasRows.map((row) => (
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
