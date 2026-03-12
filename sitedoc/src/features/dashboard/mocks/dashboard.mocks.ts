import type { DashboardItem } from "@/src/features/dashboard/types/dashboard.types";

export const dashboardItems: DashboardItem[] = [
  { id: "SD-1024", site: "MV Aurora", owner: "PM Team", phase: "Setup", status: "in-review", updatedAt: "2026-03-10" },
  { id: "SD-1025", site: "MV Horizon", owner: "Field Engineering", phase: "Layouts", status: "draft", updatedAt: "2026-03-11" },
  { id: "SD-1026", site: "MV Atlas", owner: "CSC", phase: "Closeout", status: "published", updatedAt: "2026-03-09" },
];
