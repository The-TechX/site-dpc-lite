import type { AuditRow } from "@/src/features/audit/types/audit.types";
export const auditRows: AuditRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "CSC Audit sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "CSC Audit approved", col2: "Review complete", status: "published" },
];
