import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { phone_numbersRows } from "@/src/features/phone-numbers/mocks/phone-numbers.mocks";

export function PhoneNumbersPageView() {
  return (
    <div>
      <PageHeader title="Phone Numbers" subtitle="Primary and fallback communication channels." phase="Phase A — Setup" />
      <SectionCard title="Phone Numbers workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Line","Purpose","Status"]}>
          {phone_numbersRows.map((row) => (
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
