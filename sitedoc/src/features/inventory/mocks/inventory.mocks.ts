import type { InventoryRow } from "@/src/features/inventory/types/inventory.types";
export const inventoryRows: InventoryRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Inventory sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Inventory approved", col2: "Review complete", status: "published" },
];
