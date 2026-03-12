import React, { useState } from "react"
import { Cable, Battery, Monitor, Plus, Copy, Zap, Upload, AlertCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { PageShell } from "../components/PageShell"

const thStyle: React.CSSProperties = { fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)" }
const tdInputStyle: React.CSSProperties = { borderRadius: "var(--radius)", fontSize: "var(--text-sm)" }

function PortTable({ columns, rows, deviceLabel, deviceOptions }: { columns: string[]; rows: number; deviceLabel: string; deviceOptions: string[] }) {
  return (
    <div className="border border-solid overflow-hidden" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
      {/* Device Selector */}
      <div className="p-4 border-b border-solid flex flex-col sm:flex-row items-start sm:items-center gap-3" style={{ borderColor: "var(--border)" }}>
        <label className="whitespace-nowrap" style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>Select {deviceLabel}:</label>
        <select className="p-2.5 flex-1 bg-input-background border border-solid border-border text-foreground w-full sm:w-auto" style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
          {deviceOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
          <Copy size={14} /> Duplicate
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                {columns.map((col, ci) => (
                  <td key={ci} className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    {ci === 0 ? (
                      <input type="text" defaultValue={col === "Port" ? `Gi1/0/${i + 1}` : col === "PP Port" ? `${i + 1}` : col === "PDU/UPS Port" ? `${i + 1}` : col === "Port" ? `Console ${i + 1}` : ""} className="p-1.5 w-full bg-transparent border border-solid border-border outline-none text-center focus:border-ring" style={tdInputStyle} />
                    ) : col === "Status" ? (
                      <select className="p-1.5 w-full bg-transparent border border-solid border-border outline-none" style={tdInputStyle}>
                        <option>Up</option><option>Down</option><option>NC</option>
                      </select>
                    ) : col === "Device Port" || col === "Local Port" || col === "Remote Port" ? (
                      <input type="text" placeholder="e.g. eth0, Gi1/0/1" className="p-1.5 w-full bg-transparent border border-solid border-border outline-none focus:border-ring" style={tdInputStyle} />
                    ) : col.includes("Device") || col.includes("Local") || col.includes("Remote") || col.includes("Connected") ? (
                      <select className="p-1.5 w-full bg-transparent border border-solid border-border outline-none" style={tdInputStyle}>
                        <option>-- Select --</option><option>Firewall (FW-01)</option><option>Server (SRV-01)</option>
                      </select>
                    ) : (
                      <input type="text" placeholder={col === "Commentaries" ? "Notes..." : ""} className="p-1.5 w-full bg-transparent border border-solid border-border outline-none focus:border-ring" style={tdInputStyle} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 flex gap-2 border-t border-solid" style={{ borderColor: "var(--border)" }}>
        <button className="inline-flex items-center gap-1.5 border-none px-3 py-1.5 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Plus size={14} /> Add Row
        </button>
      </div>
    </div>
  )
}

function StatusChip({ status }: { status: string }) {
  const colors: Record<string, string> = {
    On: "var(--chart-2)",
    Off: "var(--muted-foreground)",
    Fault: "var(--destructive)",
    Unknown: "var(--chart-5)",
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", backgroundColor: `color-mix(in srgb, ${colors[status] || "var(--muted-foreground)"} 12%, transparent)`, color: colors[status] || "var(--muted-foreground)", borderRadius: "9999px" }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[status] || "var(--muted-foreground)" }} />
      {status}
    </span>
  )
}

export function ConnectionsHub() {
  const [obmExists] = useState(true)

  return (
    <PageShell
      title="Connections Hub"
      subtitle="Map all network, patch, and power connections from inventory devices."
      phase="PHASE D — CONNECTIONS"
      owner="FE"
      backHref="/layouts"
      backLabel="Layouts Hub"
      nextHref="/antennas"
      nextLabel="Continue to Antennas"
    >
      <Tabs defaultValue="switches" className="flex flex-col gap-4">
        <TabsList className="w-full">
          <TabsTrigger value="switches" className="flex-1">
            <Cable size={14} className="mr-1.5" /> Switches
          </TabsTrigger>
          <TabsTrigger value="patch" className="flex-1">
            <Cable size={14} className="mr-1.5" /> Patch Panel
          </TabsTrigger>
          <TabsTrigger value="power" className="flex-1">
            <Battery size={14} className="mr-1.5" /> PDU/UPS
          </TabsTrigger>
          <TabsTrigger value="obm" className="flex-1">
            <Monitor size={14} className="mr-1.5" /> OBM
          </TabsTrigger>
        </TabsList>

        {/* Switches */}
        <TabsContent value="switches">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                Template 24-Port
              </button>
              <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                Template 48-Port
              </button>
            </div>
            <PortTable
              columns={["Port", "Connected Device", "Device Port", "Status", "Commentaries"]}
              rows={4}
              deviceLabel="Switch"
              deviceOptions={["SW-01 (Cisco 9300) — Inventory", "SW-02 (Juniper EX4300) — Inventory"]}
            />
          </div>
        </TabsContent>

        {/* Patch Panel */}
        <TabsContent value="patch">
          <PortTable
            columns={["PP Port", "Local Device", "Local Port", "Remote Device", "Remote Port", "Status", "Commentaries"]}
            rows={3}
            deviceLabel="Patch Panel"
            deviceOptions={["PP-01 (24-Port Cat6) — Inventory"]}
          />
        </TabsContent>

        {/* PDU/UPS */}
        <TabsContent value="power">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <StatusChip status="On" />
              <StatusChip status="Off" />
              <StatusChip status="Fault" />
              <StatusChip status="Unknown" />
              <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>← Status legend</span>
            </div>
            <PortTable
              columns={["PDU/UPS Port", "Connected Device", "Status", "Commentaries"]}
              rows={3}
              deviceLabel="Power Device"
              deviceOptions={["PDU-01 (APC Switched) — Inventory", "UPS-01 (Eaton 3kVA) — Inventory"]}
            />
          </div>
        </TabsContent>

        {/* OBM */}
        <TabsContent value="obm">
          {obmExists ? (
            <div className="flex flex-col gap-4">
              <div className="border border-solid p-5 flex flex-col md:flex-row gap-6" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label>OBM Device</label>
                    <select className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full" style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                      <option>OBM-01 (Digi) — Inventory</option>
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-56 flex flex-col gap-2">
                  <label>OBM Antenna Picture</label>
                  <div className="border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors h-28" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
                    <Upload size={20} style={{ color: "var(--muted-foreground)", opacity: 0.5, marginBottom: "4px" }} />
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Upload</span>
                  </div>
                </div>
              </div>
              <PortTable
                columns={["Port", "Connected Device", "Status", "Commentaries"]}
                rows={2}
                deviceLabel="OBM"
                deviceOptions={["OBM-01 (Digi)"]}
              />
            </div>
          ) : (
            <div className="p-12 text-center border border-solid flex flex-col items-center gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
              <div className="w-16 h-16 flex items-center justify-center" style={{ borderRadius: "9999px", backgroundColor: "var(--muted)" }}>
                <Monitor size={32} style={{ color: "var(--muted-foreground)", opacity: 0.5 }} />
              </div>
              <h3 style={{ margin: 0 }}>No OBM device registered</h3>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                Add an OBM device in the Inventory to enable this section.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
