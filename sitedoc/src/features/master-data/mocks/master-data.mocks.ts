import type { MasterDataRow } from "@/src/features/master-data/types/master-data.types";
export const master_dataRows: MasterDataRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Master Data sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Master Data approved", col2: "Review complete", status: "published" },
];
