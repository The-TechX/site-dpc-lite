import React, { useState, useEffect, useRef } from "react"
import { Upload, Info, PenTool, X } from "lucide-react"
import { PageShell } from "../components/PageShell"

export function GeneralDiagram() {
  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"

  const [isDrawioOpen, setIsDrawioOpen] = useState(false)
  const [diagramImage, setDiagramImage] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Escuchamos los mensajes provenientes del iframe de Draw.io
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'string') return
      try {
        const msg = JSON.parse(e.data)
        if (msg.event === 'init') {
          // El editor está listo, enviamos comando para cargar lienzo vacío
          iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ action: 'load', xml: '', autosave: 1 }), '*')
        } else if (msg.event === 'save') {
          // El usuario hizo click en "Guardar", solicitamos exportar la imagen
          iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ action: 'export', format: 'xmlpng', spin: 'Guardando diagrama...' }), '*')
        } else if (msg.event === 'export') {
          // Recibimos la imagen generada
          setDiagramImage(msg.data)
          setIsDrawioOpen(false)
        } else if (msg.event === 'exit') {
          // El usuario cerró el editor sin guardar
          setIsDrawioOpen(false)
        }
      } catch (err) {
        // Ignoramos mensajes de otras extensiones que no sean JSON
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <PageShell
      title="General Diagram"
      subtitle="Overall site connections diagram (AC, RF, Network)."
      phase="PHASE F — CLOSEOUT"
      owner="FE"
      backHref="/antennas"
      backLabel="Antennas Hub"
      nextHref="/csc-audit"
      nextLabel="Continue to CSC Audit"
    >
      <div className="border border-solid p-6 flex flex-col gap-5 relative" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        {/* Guidance Banner */}
        <div className="flex items-start gap-3 p-4 border border-solid" style={{ borderColor: "var(--ring)", borderRadius: "var(--radius)", backgroundColor: "color-mix(in srgb, var(--ring) 6%, transparent)" }}>
          <Info size={18} style={{ color: "var(--ring)", marginTop: "2px", flexShrink: 0 }} />
          <div>
            <span style={{ fontWeight: "var(--font-weight-semibold)", fontSize: "var(--text-sm)", color: "var(--ring)", fontFamily: "var(--font-heading)" }}>Guidance</span>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
              The diagram should include physical connections (AC Power, RF cables, Network links), proper labels, and standardized color coding.
            </p>
          </div>
        </div>

        {/* Upload or Create Area */}
        {diagramImage ? (
          <div className="border border-solid flex flex-col gap-4 p-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--background)" }}>
            <div className="flex items-center justify-between">
              <span style={{ fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Diagram Preview</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDrawioOpen(true)}
                  className="px-4 py-2 flex items-center gap-2 border border-solid transition-colors hover:opacity-80"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--card)", color: "var(--foreground)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)", cursor: "pointer" }}
                >
                  <PenTool size={16} /> Edit
                </button>
                <button
                  onClick={() => setDiagramImage(null)}
                  className="px-4 py-2 flex items-center gap-2 border border-solid transition-colors hover:opacity-80"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)", cursor: "pointer" }}
                >
                  <X size={16} /> Remove
                </button>
              </div>
            </div>
            <div className="flex justify-center bg-white p-4" style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
              <img src={diagramImage} alt="Diagram preview" className="max-w-full h-auto object-contain max-h-[500px]" />
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed flex flex-col items-center justify-center py-12 px-4 gap-6 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "color-mix(in srgb, var(--muted) 20%, transparent)" }}>
            <div className="flex flex-col items-center justify-center cursor-pointer gap-2 w-full max-w-sm text-center hover:opacity-70 transition-opacity">
              <Upload size={40} style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
              <span style={{ fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Upload Vector or PDF</span>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>Click to browse or drag and drop</span>
            </div>

            <div className="flex items-center w-full max-w-sm gap-4">
              <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontFamily: "var(--font-heading)" }}>OR</span>
              <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            </div>

            <button
              onClick={() => setIsDrawioOpen(true)}
              className="px-6 py-2.5 flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: "var(--radius)",
                fontFamily: "var(--font-heading)",
                fontWeight: "var(--font-weight-medium)",
                border: "none"
              }}
            >
              <PenTool size={18} /> Crear diagrama
            </button>
          </div>
        )}

        {/* Notes & Version */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>Notes / Legend</label>
            <textarea className={inputCls + " resize-none h-24"} style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", color: "var(--foreground)" }} placeholder="Add details about line colors, custom nodes..." />
          </div>
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>Version / Date</label>
            <input type="text" className={inputCls} style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", color: "var(--foreground)" }} defaultValue="v1.0 — 2026-03-07" />
          </div>
        </div>
      </div>

      {/* Draw.io Fullscreen Modal */}
      {isDrawioOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-solid shadow-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            <div className="flex items-center gap-2">
              <PenTool size={20} style={{ color: "var(--primary)" }} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>Draw.io Editor</span>
            </div>
            <button
              onClick={() => setIsDrawioOpen(false)}
              className="p-1.5 rounded-full transition-colors hover:bg-muted"
              style={{ color: "var(--muted-foreground)", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
            >
              <X size={24} />
            </button>
          </div>
          <iframe
            ref={iframeRef}
            className="w-full flex-1 border-none bg-white"
            src="https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json"
            title="Draw.io Editor"
          />
        </div>
      )}
    </PageShell>
  )
}
