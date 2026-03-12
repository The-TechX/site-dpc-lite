import React, { useState } from "react"
import { Box, Plus, Trash2 } from "lucide-react"
import { PageShell } from "../components/PageShell"

export function EquipmentNotOnRack() {
  const [items, setItems] = useState<{ id: number; name: string; location: string; notes: string }[]>([])

  const addItem = () => setItems([...items, { id: Date.now(), name: "", location: "", notes: "" }])

  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"
  const inputStyle: React.CSSProperties = { borderRadius: "var(--radius)" }

  return (
    <PageShell
      title="Equipment Not on Rack"
      subtitle="Optional section for freestanding or un-racked equipment."
      phase="PHASE B — ASSETS"
      owner="FE"
      backHref="/racks"
      backLabel="Racks Info"
      nextHref="/inventory"
      nextLabel="Continue to Inventory"
      actions={
        <button onClick={addItem} className="inline-flex items-center gap-2 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Plus size={16} /> Add Equipment
        </button>
      }
    >
      {items.length === 0 ? (
        <div className="p-12 text-center border border-solid flex flex-col items-center justify-center gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <div className="w-16 h-16 flex items-center justify-center" style={{ borderRadius: "9999px", backgroundColor: "var(--muted)" }}>
            <Box size={32} style={{ color: "var(--muted-foreground)", opacity: 0.6 }} />
          </div>
          <div>
            <h3 style={{ margin: "0 0 4px" }}>No off-rack equipment</h3>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
              This section is optional. Add non-rack devices from inventory or manually.
            </p>
          </div>
          <button onClick={addItem} className="inline-flex items-center gap-2 border border-solid bg-transparent text-foreground px-4 py-2 cursor-pointer hover:bg-muted transition-colors mt-2" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
            <Plus size={16} /> Add Equipment
          </button>
        </div>
      ) : (
        <div className="border border-solid overflow-hidden" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: "600px" }}>
              <thead>
                <tr>
                  {["Device Name", "Location", "Notes", ""].map((h) => (
                    <th key={h} className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                      <input type="text" placeholder="Device name..." className="p-2 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={inputStyle} />
                    </td>
                    <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                      <input type="text" placeholder="Physical location..." className="p-2 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={inputStyle} />
                    </td>
                    <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                      <input type="text" placeholder="Notes..." className="p-2 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={inputStyle} />
                    </td>
                    <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", width: "48px" }}>
                      <button onClick={() => setItems(items.filter((i) => i.id !== item.id))} className="bg-transparent border-none cursor-pointer p-1 hover:bg-muted transition-colors" style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageShell>
  )
}
