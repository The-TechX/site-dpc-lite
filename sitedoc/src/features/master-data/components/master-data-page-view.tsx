import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { master_dataRows } from "@/src/features/master-data/mocks/master-data.mocks";

export function MasterDataPageView() {
  return (
    <div>
      <PageHeader title="Master Data" subtitle="Reference catalogs used across the workflow." phase="Phase F — Closeout" />
      <SectionCard title="Master Data workspace" description="UI-first mock screen.">
        <SimpleTable headers={["ID","Catalog","Scope","Status"]}>
          {master_dataRows.map((row) => (
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
