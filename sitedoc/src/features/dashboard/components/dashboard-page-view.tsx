import { PageHeader } from "@/src/components/shared/page-header";
import { SectionCard } from "@/src/components/shared/section-card";
import { SimpleTable } from "@/src/components/shared/simple-table";
import { StatusBadge } from "@/src/components/shared/status-badge";
import { dashboardItems } from "@/src/features/dashboard/mocks/dashboard.mocks";

export function DashboardPageView() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Operational snapshot of active site document workflows." phase="Workspace" />
      <SectionCard title="Active Site Documents" description="Mock data for design review. Pending backend integration.">
        <SimpleTable headers={["ID", "Site", "Owner", "Phase", "Status", "Last Updated"]}>
          {dashboardItems.map((item) => (
            <tr key={item.id} className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">{item.id}</td><td className="px-3 py-2">{item.site}</td><td className="px-3 py-2">{item.owner}</td><td className="px-3 py-2">{item.phase}</td><td className="px-3 py-2"><StatusBadge status={item.status} /></td><td className="px-3 py-2">{item.updatedAt}</td>
            </tr>
          ))}
        </SimpleTable>
      </SectionCard>
    </div>
  );
}
