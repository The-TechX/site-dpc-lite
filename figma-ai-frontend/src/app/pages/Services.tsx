import React, { useState } from "react"
import { Plus, Copy, Trash2, Server, AlertCircle } from "lucide-react"
import { PageShell } from "../components/PageShell"

interface Service {
  id: number
  serviceType: string
  systemType: string
  antennaSystem: string
  bucPower: number
  bandwidthDown: number
  bandwidthUp: number
  satellite: string
  providedBy: string
}

export function Services() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, serviceType: "KU", systemType: "Single", antennaSystem: "Sailor 900", bucPower: 8, bandwidthDown: 10, bandwidthUp: 2, satellite: "Intelsat 33e", providedBy: "Viasat" },
  ])

  const addService = () => {
    setServices([...services, { id: Date.now(), serviceType: "KA", systemType: "Single", antennaSystem: "", bucPower: 0, bandwidthDown: 0, bandwidthUp: 0, satellite: "", providedBy: "Viasat" }])
  }

  const removeService = (id: number) => setServices(services.filter((s) => s.id !== id))

  const duplicateService = (svc: Service) => setServices([...services, { ...svc, id: Date.now() }])

  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"
  const inputStyle: React.CSSProperties = { borderRadius: "var(--radius)" }

  return (
    <PageShell
      title="Services"
      subtitle="Manage the communication services onboard. At least one service is required."
      phase="PHASE A — SETUP"
      owner="PM/PC"
      backHref="/site-info"
      backLabel="Site Info"
      nextHref="/racks"
      nextLabel="Continue to Racks"
      actions={
        <button onClick={addService} className="inline-flex items-center gap-2 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Plus size={16} /> Add Service
        </button>
      }
    >
      {services.length === 0 && (
        <div className="p-10 text-center border border-solid flex flex-col items-center gap-3" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <Server size={40} style={{ color: "var(--muted-foreground)", opacity: 0.5 }} />
          <p style={{ margin: 0, color: "var(--muted-foreground)" }}>No services added yet.</p>
          <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: "color-mix(in srgb, var(--chart-5) 10%, transparent)", borderRadius: "var(--radius)", color: "var(--chart-5)", fontSize: "var(--text-sm)" }}>
            <AlertCircle size={14} /> At least one service is required for report generation.
          </div>
        </div>
      )}

      {services.map((svc, idx) => (
        <div key={svc.id} className="border border-solid p-6 flex flex-col gap-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <div className="flex justify-between items-center border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ borderRadius: "var(--radius)", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)" }}>{idx + 1}</span>
              </div>
              <h3 style={{ margin: 0 }}>Service {idx + 1}</h3>
              <span className="px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)", borderRadius: "9999px", color: "var(--muted-foreground)" }}>
                {svc.serviceType}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => duplicateService(svc)} className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                <Copy size={14} /> Duplicate
              </button>
              <button onClick={() => removeService(svc.id)} className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-destructive/10 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--destructive)" }}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label>Service Type</label>
              <select className={inputCls} style={{ ...inputStyle, fontFamily: "var(--font-body)" }} defaultValue={svc.serviceType}>
                <option>KU</option><option>KA</option><option>C</option><option>LTE</option><option>OneWeb</option><option>Starlink</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label>System Type</label>
              <select className={inputCls} style={{ ...inputStyle, fontFamily: "var(--font-body)" }} defaultValue={svc.systemType}>
                <option>Single</option><option>Dual</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Antenna System</label>
              <input type="text" className={inputCls} style={inputStyle} defaultValue={svc.antennaSystem} placeholder="Search or enter..." />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>BUC Power (W)</label>
              <input type="number" className={inputCls} style={inputStyle} defaultValue={svc.bucPower} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Bandwidth Down (Mbps)</label>
              <input type="number" className={inputCls} style={inputStyle} defaultValue={svc.bandwidthDown} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Bandwidth Up (Mbps)</label>
              <input type="number" className={inputCls} style={inputStyle} defaultValue={svc.bandwidthUp} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Satellite / Constellation</label>
              <input type="text" className={inputCls} style={inputStyle} defaultValue={svc.satellite} placeholder="Search catalog..." />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>Provided by</label>
              <select className={inputCls} style={{ ...inputStyle, fontFamily: "var(--font-body)" }} defaultValue={svc.providedBy}>
                <option>Viasat</option><option>Vendor</option><option>Other</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </PageShell>
  )
}