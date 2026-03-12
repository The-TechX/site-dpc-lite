import React, { useState } from "react"
import { LayoutGrid, Image as ImageIcon, Plus, Trash2, AlertTriangle } from "lucide-react"
import { PageShell } from "../components/PageShell"

export function RacksInfo() {
  const [racks, setRacks] = useState([
    { id: "RK-01", size: "42U", location: "Main Deck", room: "Server Room Alpha" },
  ])

  const addRack = () => setRacks([...racks, { id: `RK-0${racks.length + 1}`, size: "42U", location: "", room: "" }])

  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"
  const inputStyle: React.CSSProperties = { borderRadius: "var(--radius)" }

  return (
    <PageShell
      title="Racks Information"
      subtitle="Define racks, their size, location, and upload visual references."
      phase="PHASE B — ASSETS"
      owner="FE"
      backHref="/phone-numbers"
      backLabel="Phone Numbers"
      nextHref="/equipment-not-on-rack"
      nextLabel="Continue to Off-Rack Equipment"
      actions={
        <button onClick={addRack} className="inline-flex items-center gap-2 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Plus size={16} /> Add Rack
        </button>
      }
    >
      {racks.map((rack, idx) => (
        <div key={rack.id} className="border border-solid p-6 flex flex-col gap-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <div className="flex items-center justify-between border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ borderRadius: "var(--radius)", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                <LayoutGrid size={16} />
              </div>
              <h3 style={{ margin: 0 }}>{rack.id}</h3>
            </div>
            {racks.length > 1 && (
              <button onClick={() => setRacks(racks.filter((r) => r.id !== rack.id))} className="bg-transparent border-none cursor-pointer p-1.5 hover:bg-muted transition-colors" style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}>
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label>Rack ID <span style={{ color: "var(--destructive)" }}>*</span></label>
              <input type="text" defaultValue={rack.id} className={inputCls} style={inputStyle} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Rack Size (U) <span style={{ color: "var(--destructive)" }}>*</span></label>
              <select className={inputCls} style={{ ...inputStyle, fontFamily: "var(--font-body)" }} defaultValue={rack.size}>
                <option>9U</option><option>12U</option><option>24U</option><option>42U</option><option>48U</option><option>52U</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Vessel/Rig Location <span style={{ color: "var(--destructive)" }}>*</span></label>
              <input type="text" defaultValue={rack.location} placeholder="e.g. Main Deck" className={inputCls} style={inputStyle} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Room <span style={{ color: "var(--destructive)" }}>*</span></label>
              <input type="text" defaultValue={rack.room} placeholder="e.g. Server Room" className={inputCls} style={inputStyle} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Front View Photo", "Rear View Photo"].map((label) => (
              <div key={label} className="flex flex-col gap-2">
                <label>
                  {label}{" "}
                  <span className="inline-flex items-center gap-1" style={{ color: "var(--chart-5)", fontSize: "11px" }}>
                    <AlertTriangle size={11} /> Recommended
                  </span>
                </label>
                <div className="border-2 border-dashed p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
                  <ImageIcon size={28} style={{ color: "var(--muted-foreground)", opacity: 0.5, marginBottom: "8px" }} />
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Click to upload</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </PageShell>
  )
}
