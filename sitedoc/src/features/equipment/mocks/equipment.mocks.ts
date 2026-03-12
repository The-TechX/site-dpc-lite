import type { EquipmentRow } from "@/src/features/equipment/types/equipment.types";
export const equipmentRows: EquipmentRow[] = [
  { id: "1", col1: "Mock draft", col2: "Pending backend integration", status: "draft" },
  { id: "2", col1: "Equipment Not On Rack sample", col2: "Placeholder action", status: "in-review" },
  { id: "3", col1: "Equipment Not On Rack approved", col2: "Review complete", status: "published" },
];
