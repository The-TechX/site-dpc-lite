import React, { useState } from "react"
import { Upload, Move, RotateCw, Grid, ZoomIn, ZoomOut, Undo, Redo, Navigation, Plus, Search, MapPin, Layers } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { PageShell } from "../components/PageShell"

function CanvasPlaceholder({ label, uploadLabel }: { label: string; uploadLabel: string }) {
  return (
    <div className="flex-1 border border-solid flex flex-col items-center justify-center relative min-h-[400px]" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
      {/* Canvas Toolbar */}
      <div className="absolute top-3 left-3 flex gap-1">
        {[ZoomIn, ZoomOut, Undo, Redo].map((Icon, i) => (
          <button key={i} className="w-8 h-8 flex items-center justify-center bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--card)" }}>
            <Icon size={14} style={{ color: "var(--muted-foreground)" }} />
          </button>
        ))}
      </div>
      <div className="absolute top-3 right-3 flex gap-1">
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", fontSize: "11px", backgroundColor: "var(--card)", color: "var(--foreground)" }}>
          <Grid size={12} /> Snap
        </button>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", fontSize: "11px", backgroundColor: "var(--card)", color: "var(--foreground)" }}>
          <RotateCw size={12} /> Reset
        </button>
      </div>
      <div className="text-center p-8">
        <Upload size={40} style={{ color: "var(--muted-foreground)", opacity: 0.4, marginBottom: "12px" }} />
        <p style={{ margin: "0 0 4px", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{label}</p>
        <p style={{ margin: "0 0 16px", fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{uploadLabel}</p>
        <button className="inline-flex items-center gap-2 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          Browse Image
        </button>
      </div>
    </div>
  )
}

function AssetPanel({ title, items, icon: Icon, colorVar }: { title: string; items: { id: string; label: string }[]; icon: React.ElementType; colorVar: string }) {
  return (
    <div className="w-56 flex-shrink-0 border border-solid p-4 flex flex-col gap-3 overflow-y-auto" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
      <div className="flex items-center justify-between border-b border-solid pb-2" style={{ borderColor: "var(--border)" }}>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)" }}>{title}</span>
        <div className="relative">
          <Search size={13} style={{ color: "var(--muted-foreground)" }} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 p-2.5 border-l-3 border-solid cursor-move hover:bg-muted/50 transition-colors" style={{ borderColor: colorVar, borderLeftWidth: "3px", borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, backgroundColor: "var(--muted)", borderTopRightRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)" }}>
            <Icon size={14} style={{ color: colorVar }} />
            <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>{item.label}</span>
            <Move size={12} className="ml-auto" style={{ color: "var(--muted-foreground)" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function LayoutsHub() {
  const [rackPages, setRackPages] = useState([{ id: 1, title: "Main Deck" }])
  const [antennaPages, setAntennaPages] = useState([{ id: 1, title: "Top view" }])

  const addRackPage = () => {
    setRackPages([...rackPages, { id: Date.now(), title: `New Plan ${rackPages.length + 1}` }])
  }

  const removeRackPage = (id: number) => {
    setRackPages(rackPages.filter(p => p.id !== id))
  }

  const addAntennaPage = () => {
    setAntennaPages([...antennaPages, { id: Date.now(), title: `New Plan ${antennaPages.length + 1}` }])
  }

  const removeAntennaPage = (id: number) => {
    setAntennaPages(antennaPages.filter(p => p.id !== id))
  }

  return (
    <PageShell
      title="Layouts Hub"
      subtitle="Visual placement of racks and antennas on site drawings."
      phase="PHASE C — LAYOUTS"
      owner="FE"
      backHref="/inventory"
      backLabel="Inventory"
      nextHref="/connections"
      nextLabel="Continue to Connections"
    >
      <Tabs defaultValue="rack-layout" className="flex flex-col gap-4">
        <TabsList className="w-full">
          <TabsTrigger value="rack-layout" className="flex-1">
            <Layers size={14} className="mr-1.5" /> Rack Location
          </TabsTrigger>
          <TabsTrigger value="antenna-location" className="flex-1">
            <Navigation size={14} className="mr-1.5" /> Antenna Locations
          </TabsTrigger>
          <TabsTrigger value="additional" className="flex-1">
            <Plus size={14} className="mr-1.5" /> Additional Views
          </TabsTrigger>
        </TabsList>

        {/* Rack Location Layout */}
        <TabsContent value="rack-layout">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center pb-2 border-b border-solid" style={{ borderColor: "var(--border)" }}>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
                Add different plans (e.g. decks, levels) to distribute your racks across the site.
              </p>
              <button 
                onClick={addRackPage}
                className="inline-flex items-center gap-2 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" 
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}
              >
                <Plus size={14} /> Add Rack Plan
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {rackPages.map((page, index) => (
                <div key={page.id} className="flex flex-col gap-4 relative">
                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      defaultValue={page.title} 
                      className="bg-transparent border-b border-dashed outline-none pb-1" 
                      style={{ borderColor: "var(--border)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-base)", color: "var(--foreground)", minWidth: "200px" }} 
                    />
                    {rackPages.length > 1 && (
                      <button 
                        onClick={() => removeRackPage(page.id)}
                        className="bg-transparent border-none cursor-pointer text-sm hover:underline" 
                        style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)" }}
                      >
                        Remove Plan
                      </button>
                    )}
                  </div>
                  <div className="flex gap-4 min-h-[450px]">
                    <CanvasPlaceholder label={`Rack Layout: ${page.title}`} uploadLabel="Upload rig/vessel drawing (plan view)" />
                    {index === 0 && (
                      <AssetPanel
                        title="Racks"
                        icon={MapPin}
                        colorVar="var(--primary)"
                        items={[{ id: "rk1", label: "RK-01" }, { id: "rk2", label: "RK-02" }]}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Antenna Location */}
        <TabsContent value="antenna-location">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center pb-2 border-b border-solid" style={{ borderColor: "var(--border)" }}>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
                Add different site plans to distribute your antennas accordingly.
              </p>
              <button 
                onClick={addAntennaPage}
                className="inline-flex items-center gap-2 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" 
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}
              >
                <Plus size={14} /> Add Antenna Plan
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {antennaPages.map((page, index) => (
                <div key={page.id} className="flex flex-col gap-4 relative">
                  <div className="flex justify-between items-center">
                    <input 
                      type="text" 
                      defaultValue={page.title} 
                      className="bg-transparent border-b border-dashed outline-none pb-1" 
                      style={{ borderColor: "var(--border)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-base)", color: "var(--foreground)", minWidth: "200px" }} 
                    />
                    {antennaPages.length > 1 && (
                      <button 
                        onClick={() => removeAntennaPage(page.id)}
                        className="bg-transparent border-none cursor-pointer text-sm hover:underline" 
                        style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)" }}
                      >
                        Remove Plan
                      </button>
                    )}
                  </div>
                  <div className="flex gap-4 min-h-[450px]">
                    <CanvasPlaceholder label={`Antenna Layout: ${page.title}`} uploadLabel="Upload main site plan (top-down)" />
                    {index === 0 && (
                      <AssetPanel
                        title="Antennas"
                        icon={Navigation}
                        colorVar="var(--chart-2)"
                        items={[{ id: "a1", label: "KU VSAT 01" }, { id: "a2", label: "Starlink 1" }]}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Additional Views */}
        <TabsContent value="additional">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                Add alternative isometric or elevation views for additional reference.
              </p>
              <button className="inline-flex items-center gap-2 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
                <Plus size={14} /> Add View
              </button>
            </div>

            <div className="border border-solid p-6 flex flex-col gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
              <div className="flex justify-between items-center">
                <input type="text" defaultValue="Starboard Elevation View" className="bg-transparent border-b border-dashed outline-none pb-1" style={{ borderColor: "var(--border)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-base)", color: "var(--foreground)" }} />
                <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                  + Antenna to view
                </button>
              </div>
              <div className="h-48 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
                <div className="text-center">
                  <Upload size={28} style={{ color: "var(--muted-foreground)", opacity: 0.4, marginBottom: "8px" }} />
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Upload specific drawing view</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
