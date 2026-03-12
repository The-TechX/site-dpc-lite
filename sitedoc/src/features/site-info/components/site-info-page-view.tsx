import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { site_infoRows } from "@/src/features/site-info/mocks/site-info.mocks";

export function SiteInfoPageView() {
  return (
    <div>
      <PageHeader title="Site Info" subtitle="General site details, tenants, and points of contact." phase="Phase A — Setup" />
      <SectionCard title="Site Info workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Summary","Detail","Status"]}>
          {site_infoRows.map((row) => (
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
