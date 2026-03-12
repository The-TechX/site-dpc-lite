import type { ReportsRow } from "@/src/features/reports/types/reports.types";
export const reportsRows: ReportsRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Generate Report sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Generate Report approved", col2: "Review complete", status: "published" },
];
