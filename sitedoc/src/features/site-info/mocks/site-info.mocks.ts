import type { SiteInfoRow } from "@/src/features/site-info/types/site-info.types";
export const site_infoRows: SiteInfoRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Site Info sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Site Info approved", col2: "Review complete", status: "published" },
];
