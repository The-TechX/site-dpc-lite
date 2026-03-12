import React, { useState } from "react"
import { useNavigate } from "react-router"
import {
  FileText, Download, CheckCircle2, AlertCircle, AlertTriangle,
  ArrowRight, FileBarChart, Link2, ChevronRight, Users, Building2
} from "lucide-react"
import { Progress } from "../components/ui/progress"

interface SectionStatus {
  name: string
  weight: string
  completion: number
  status: "ok" | "warning" | "error"
  message?: string
  href: string
}

const sections: SectionStatus[] = [
  { name: "Site Info", weight: "15%", completion: 100, status: "ok", href: "/site-info" },
  { name: "Services", weight: "10%", completion: 100, status: "ok", href: "/services" },
  { name: "Phone Numbers", weight: "10%", completion: 60, status: "warning", message: "Backup numbers missing", href: "/phone-numbers" },
  { name: "Racks", weight: "10%", completion: 80, status: "warning", message: "Missing rack photos", href: "/racks" },
  { name: "Inventory", weight: "20%", completion: 70, status: "warning", message: "3 devices missing serial/MAC", href: "/inventory" },
  { name: "Connections", weight: "15%", completion: 0, status: "error", message: "Not started", href: "/connections" },
  { name: "Antennas", weight: "15%", completion: 0, status: "error", message: "Required for generation", href: "/antennas" },
  { name: "CSC Audit", weight: "5%", completion: 56, status: "warning", message: "4 items unchecked", href: "/csc-audit" },
]

const errors = sections.filter((s) => s.status === "error")
const warnings = sections.filter((s) => s.status === "warning")
const canGenerate = errors.length === 0

const MOCK_CLIENTS = ["Viasat (Primary)", "Client A", "Client B"]

export function GenerateReport() {
  const navigate = useNavigate()
  const [targetClient, setTargetClient] = useState("Viasat (Primary)")

  const overall = Math.round(
    sections.reduce((sum, s) => sum + s.completion * (parseInt(s.weight) / 100), 0)
  )

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-heading)", color: "var(--primary)", letterSpacing: "0.08em" }}>
          PHASE F — CLOSEOUT
        </span>
        <h2 style={{ margin: 0, fontFamily: "var(--font-heading)" }}>Generate Report</h2>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
          Review completion status, select target client, and export your final documents.
        </p>
      </div>

      {/* Overall Summary */}
      <div className="border border-solid p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ borderColor: "var(--primary)", borderRadius: "var(--radius-card)", backgroundColor: "color-mix(in srgb, var(--primary) 5%, var(--card))" }}>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 flex items-center justify-center" style={{ borderRadius: "9999px", border: "3px solid var(--primary)", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-xl)", color: "var(--primary)" }}>{overall}%</span>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-lg)", color: "var(--foreground)" }}>Site Audit Completion</span>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", fontFamily: "var(--font-heading)", backgroundColor: "color-mix(in srgb, var(--destructive) 12%, transparent)", color: "var(--destructive)", borderRadius: "var(--radius)" }}>
                <AlertCircle size={12} /> {errors.length} blockers
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", fontFamily: "var(--font-heading)", backgroundColor: "color-mix(in srgb, var(--chart-5) 12%, transparent)", color: "var(--chart-5)", borderRadius: "var(--radius)" }}>
                <AlertTriangle size={12} /> {warnings.length} warnings
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Progress value={overall} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sections Status */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Section Readiness</h3>
          <div className="border border-solid overflow-hidden" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
            {sections.map((section, i) => (
              <div
                key={section.name}
                className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                style={{ borderBottom: i < sections.length - 1 ? "1px solid var(--border)" : "none" }}
                onClick={() => navigate(section.href)}
              >
                <div className="flex items-center gap-3">
                  {section.status === "ok" && <CheckCircle2 size={18} style={{ color: "var(--chart-2)" }} />}
                  {section.status === "warning" && <AlertTriangle size={18} style={{ color: "var(--chart-5)" }} />}
                  {section.status === "error" && <AlertCircle size={18} style={{ color: "var(--destructive)" }} />}
                  <div>
                    <span style={{ fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>{section.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>Weight: {section.weight}</span>
                      {section.message && (
                        <span style={{
                          fontSize: "11px",
                          fontWeight: "var(--font-weight-semibold)",
                          fontFamily: "var(--font-heading)",
                          color: section.status === "error" ? "var(--destructive)" : "var(--chart-5)",
                        }}>
                          — {section.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 hidden sm:block">
                    <Progress value={section.completion} />
                  </div>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-heading)", color: section.status === "ok" ? "var(--chart-2)" : section.status === "error" ? "var(--destructive)" : "var(--chart-5)" }}>
                    {section.completion}%
                  </span>
                  <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Panel */}
        <div className="flex flex-col gap-4">
          <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Export Configuration</h3>
          
          <div className="border border-solid flex flex-col gap-5 p-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
            
            {/* Multi-Tenant Selector */}
            <div className="flex flex-col gap-2.5 pb-5 border-b border-solid" style={{ borderColor: "var(--border)" }}>
              <label className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                <Building2 size={16} style={{ color: "var(--primary)" }} />
                Target Audience (Client)
              </label>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
                Select a client to generate a tailored report. Assets not allocated to this client will be automatically excluded.
              </p>
              <select 
                className="p-2.5 mt-1 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring cursor-pointer"
                style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)" }}
                value={targetClient}
                onChange={(e) => setTargetClient(e.target.value)}
              >
                <option value="All Clients (Internal)">All Clients / Internal Master</option>
                {MOCK_CLIENTS.map(c => <option key={c} value={c}>Filtered: {c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              {!canGenerate && (
                <div className="flex items-start gap-2.5 p-3 border border-solid mb-1" style={{ borderColor: "var(--destructive)", borderRadius: "var(--radius)", backgroundColor: "color-mix(in srgb, var(--destructive) 6%, transparent)" }}>
                  <AlertCircle size={16} style={{ color: "var(--destructive)", marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--destructive)", fontFamily: "var(--font-body)" }}>
                    Resolve {errors.length} blocker{errors.length > 1 ? "s" : ""} to unlock report generation.
                  </span>
                </div>
              )}

              <button disabled={!canGenerate} className="w-full flex items-center justify-center gap-2 border-none p-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>
                <FileBarChart size={16} /> Generate PDF Report
              </button>

              <button disabled={!canGenerate} className="w-full flex items-center justify-center gap-2 bg-transparent border border-solid p-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", color: "var(--foreground)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>
                <FileText size={16} /> Generate DOCX Report
              </button>

              <div className="border-t border-solid my-1" style={{ borderColor: "var(--border)" }} />

              <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-solid p-3 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", color: "var(--foreground)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)" }}>
                <Download size={14} /> Export Segmented CSV
              </button>
            </div>
          </div>

          {/* Preflight Checks */}
          <div className="border border-solid p-5 flex flex-col gap-3 mt-1" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
            <h4 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Preflight Checks</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Site Info + Services complete", ok: true },
                { label: "Inventory has > 0 devices", ok: true },
                { label: "At least 1 antenna photo or layout", ok: false },
                { label: "No cross-section inconsistencies", ok: false },
              ].map((check) => (
                <div key={check.label} className="flex items-start gap-2">
                  {check.ok ? (
                    <CheckCircle2 size={14} style={{ color: "var(--chart-2)", marginTop: "2px" }} />
                  ) : (
                    <AlertCircle size={14} style={{ color: "var(--destructive)", marginTop: "2px" }} />
                  )}
                  <span style={{ fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: check.ok ? "var(--foreground)" : "var(--destructive)", lineHeight: 1.3 }}>{check.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
