import type { ConnectionsRow } from "@/src/features/connections/types/connections.types";
export const connectionsRows: ConnectionsRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Connections Hub sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Connections Hub approved", col2: "Review complete", status: "published" },
];
