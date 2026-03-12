export interface DashboardItem {
  id: string;
  site: string;
  owner: string;
  phase: string;
  status: "draft" | "in-review" | "published" | "blocked";
  updatedAt: string;
}
