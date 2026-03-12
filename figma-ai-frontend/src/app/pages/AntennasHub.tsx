import React, { useState } from "react"
import { Camera, Activity, Settings, Plus, Image as ImageIcon, Download, RotateCcw, Code, AlertTriangle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { PageShell } from "../components/PageShell"

function PhotosTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Upload physical validation photos for each antenna system.</p>
        <button className="inline-flex items-center gap-1.5 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Plus size={14} /> Add Photo
        </button>
      </div>

      <div className="border border-solid overflow-hidden" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: "600px" }}>
            <thead>
              <tr>
                {["Antenna System", "Location", "Photo Upload"].map((h) => (
                  <th key={h} className="p-4 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { system: "Service 1: Sailor 900 (KU)", location: "Port Side Mast" },
                { system: "Service 2: Starlink Flat HP", location: "" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 border-b border-solid align-top" style={{ borderColor: "var(--border)" }}>
                    <select className="p-2 w-full bg-input-background border border-solid border-border text-foreground" style={{ borderRadius: "var(--radius)", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)" }}>
                      <option>{row.system}</option>
                    </select>
                  </td>
                  <td className="p-4 border-b border-solid align-top" style={{ borderColor: "var(--border)" }}>
                    <input type="text" placeholder="e.g. Starboard Mast" defaultValue={row.location} className="p-2 w-full bg-input-background border border-solid border-border text-foreground outline-none focus:border-ring" style={{ borderRadius: "var(--radius)", fontSize: "var(--text-sm)" }} />
                  </td>
                  <td className="p-4 border-b border-solid align-top" style={{ borderColor: "var(--border)" }}>
                    <div className="border-2 border-dashed p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
                      <ImageIcon size={20} style={{ color: "var(--muted-foreground)", opacity: 0.5, marginBottom: "4px" }} />
                      <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Click or drag</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Duplicate warning */}
      <div className="flex items-start gap-3 p-3 border border-solid" style={{ borderColor: "var(--chart-5)", borderRadius: "var(--radius)", backgroundColor: "color-mix(in srgb, var(--chart-5) 8%, transparent)" }}>
        <AlertTriangle size={16} style={{ color: "var(--chart-5)", marginTop: "2px", flexShrink: 0 }} />
        <span style={{ fontSize: "var(--text-sm)", color: "var(--chart-5)" }}>Reusing the same photo across multiple antennas will be flagged in the report.</span>
      </div>
    </div>
  )
}

function BlockageTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <div className="border border-solid p-6 flex flex-col gap-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="flex justify-between items-center border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 style={{ margin: 0 }}>KU VSAT 01</h3>
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-2.5 py-1 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
            <Plus size={12} /> Add Value
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Satellite Azimuth", placeholder: "Degrees" },
            { label: "Blockage Start", placeholder: "Degrees" },
            { label: "Blockage End", placeholder: "Degrees" },
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-1.5">
              <label>{field.label}</label>
              <input type="number" placeholder={field.placeholder} className="p-2.5 bg-input-background border border-solid border-border text-foreground outline-none focus:border-ring" style={{ borderRadius: "var(--radius)", fontSize: "var(--text-sm)" }} />
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
            <RotateCcw size={14} /> Reset
          </button>
          <button className="inline-flex items-center gap-1.5 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
            <Activity size={14} /> Generate Visualizer
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="border border-solid p-6 flex flex-col items-center justify-center min-h-[320px] relative" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="absolute top-3 right-3 flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
            <Download size={14} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
        <div className="w-44 h-44 rounded-full border-4 border-solid flex items-center justify-center relative" style={{ borderColor: "var(--muted)" }}>
          {["N (0°)", "E (90°)", "S (180°)", "W (270°)"].map((dir, i) => {
            const positions = [
              { top: "6px", left: "50%", transform: "translateX(-50%)" },
              { right: "4px", top: "50%", transform: "translateY(-50%)" },
              { bottom: "6px", left: "50%", transform: "translateX(-50%)" },
              { left: "4px", top: "50%", transform: "translateY(-50%)" },
            ]
            return (
              <span key={dir} className="absolute" style={{ ...positions[i], fontSize: "10px", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)" } as any}>
                {dir}
              </span>
            )
          })}
          {/* Decorative arc */}
          <div className="absolute w-full h-full border-4 border-solid rounded-full transform rotate-45" style={{ borderColor: "transparent", borderTopColor: "var(--destructive)", opacity: 0.4 }} />
          <div className="w-4 h-4 rounded-full relative z-10" style={{ backgroundColor: "var(--primary)" }} />
        </div>
        <p style={{ margin: "16px 0 0", fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Blockage zone preview</p>
      </div>
    </div>
  )
}

function ConfigTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Per-antenna key/value parameters and attachments.</p>
        <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
          <Code size={14} /> Export JSON
        </button>
      </div>

      <div className="border border-solid p-6 flex flex-col gap-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="flex justify-between items-center border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 style={{ margin: 0 }}>Antenna 1 Config (KU VSAT)</h3>
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-2.5 py-1 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
            + Add Section
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>KEY / VALUE PARAMETERS</span>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { key: "Modem IP", value: "192.168.1.100" },
                { key: "TX Frequency", value: "14000 MHz" },
              ].map((param, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" defaultValue={param.key} className="p-2 w-1/3 bg-input-background border border-solid border-border text-foreground outline-none focus:border-ring" style={{ borderRadius: "var(--radius)", fontSize: "var(--text-sm)" }} />
                  <input type="text" defaultValue={param.value} className="p-2 flex-1 bg-input-background border border-solid border-border text-foreground outline-none focus:border-ring" style={{ borderRadius: "var(--radius)", fontSize: "var(--text-sm)" }} />
                </div>
              ))}
              <button className="bg-transparent border-none text-left cursor-pointer p-0 hover:underline mt-1" style={{ color: "var(--primary)", fontSize: "var(--text-sm)" }}>
                + Add Parameter
              </button>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>SCREENSHOTS / ATTACHMENTS</span>
            <div className="border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors mt-3 h-28" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
              <ImageIcon size={20} style={{ color: "var(--muted-foreground)", opacity: 0.5, marginBottom: "4px" }} />
              <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Upload config screenshots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AntennasHub() {
  return (
    <PageShell
      title="Antennas Hub"
      subtitle="Photos, blockage zones, and configuration for all antenna systems."
      phase="PHASE E — ANTENNAS"
      owner="FE"
      backHref="/connections"
      backLabel="Connections Hub"
      nextHref="/general-diagram"
      nextLabel="Continue to General Diagram"
    >
      <Tabs defaultValue="photos" className="flex flex-col gap-4">
        <TabsList className="w-full">
          <TabsTrigger value="photos" className="flex-1">
            <Camera size={14} className="mr-1.5" /> Photos
          </TabsTrigger>
          <TabsTrigger value="blockage" className="flex-1">
            <Activity size={14} className="mr-1.5" /> Blockage Zones
          </TabsTrigger>
          <TabsTrigger value="config" className="flex-1">
            <Settings size={14} className="mr-1.5" /> Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos"><PhotosTab /></TabsContent>
        <TabsContent value="blockage"><BlockageTab /></TabsContent>
        <TabsContent value="config"><ConfigTab /></TabsContent>
      </Tabs>
    </PageShell>
  )
}
