import type { ServicesRow } from "@/src/features/services/types/services.types";
export const servicesRows: ServicesRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Services sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Services approved", col2: "Review complete", status: "published" },
];
