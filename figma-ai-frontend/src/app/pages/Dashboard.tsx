import React, { useState } from "react"
import { useNavigate } from "react-router"
import { useRole } from "../contexts/RoleContext"
import { 
  Search, Clock, ChevronRight, Filter, FileText, 
  Settings, UserCheck, ShieldCheck, Wrench, Play, Database, Plus
} from "lucide-react"

// Mock Data
const tasks = [
  { id: "1", site: "Rig Alpha-1", phase: "Phase C — Layouts", status: "In Progress", updatedAt: "2 hours ago", statusColor: "var(--primary)" },
  { id: "2", site: "Rig Delta-4", phase: "Phase E — Antennas", status: "Waiting Review", updatedAt: "1 day ago", statusColor: "var(--chart-5)" },
]

const allDocuments = [
  { id: "101", site: "Rig Alpha-1", customer: "Oceanic Drilling", revision: "A-Rev", status: "In Progress", phase: "Layouts", updated: "2 hours ago" },
  { id: "102", site: "Rig Bravo-2", customer: "Deep Sea Corp", revision: "B-Rev", status: "Completed", phase: "Closeout", updated: "3 days ago" },
  { id: "103", site: "Rig Charlie-3", customer: "Oceanic Drilling", revision: "A-Rev", status: "Waiting Review", phase: "Audit", updated: "1 week ago" },
  { id: "104", site: "Rig Delta-4", customer: "Global Energy", revision: "C-Rev", status: "Pending Audit", phase: "Antennas", updated: "1 day ago" },
  { id: "105", site: "Rig Echo-5", customer: "Deep Sea Corp", revision: "A-Rev", status: "In Progress", phase: "Setup", updated: "4 hours ago" },
]

export function Dashboard() {
  const navigate = useNavigate()
  const { currentRole } = useRole()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = searchQuery.trim() === "" 
    ? [] 
    : allDocuments.filter(doc => 
        doc.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.customer.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const getTaskAction = () => {
    if (currentRole === "noc") return "Review"
    return "Continue"
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed": return "var(--chart-2)"
      case "In Progress": return "var(--primary)"
      case "Waiting Review": return "var(--chart-5)"
      case "Pending Audit": return "var(--chart-4)"
      default: return "var(--muted-foreground)"
    }
  }

  return (
    <div className="flex flex-col w-full mx-auto" style={{ gap: "48px", paddingBottom: "64px" }}>
      
      {/* 1) HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16" style={{ backgroundColor: "var(--card)", borderRadius: "var(--radius-card)", border: "1px solid var(--border)" }}>
        <h1 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>Find a Site Document</h1>
        <p style={{ margin: "0 0 32px 0", color: "var(--muted-foreground)", fontSize: "var(--text-lg)" }}>
          Search by rig name, ticket, country, or customer
        </p>
        
        <div className="relative w-full max-w-2xl flex items-center transition-shadow" style={{ 
          backgroundColor: "var(--input-background)", 
          border: "1px solid var(--border)", 
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--elevation-sm)"
        }}>
          <Search size={24} style={{ color: "var(--muted-foreground)", marginLeft: "16px" }} />
          <input 
            type="text" 
            placeholder="Search site documents..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none"
            style={{ 
              padding: "20px 16px", 
              fontSize: "var(--text-lg)",
              color: "var(--foreground)"
            }}
          />
          
          {/* LIVE SEARCH DROPDOWN */}
          {searchQuery.trim().length > 0 && (
            <div 
              className="absolute left-0 w-full z-50 overflow-hidden flex flex-col" 
              style={{ 
                top: "calc(100% + 8px)",
                backgroundColor: "var(--card)", 
                border: "1px solid var(--border)", 
                borderRadius: "var(--radius-card)",
                boxShadow: "var(--elevation-sm)",
                maxHeight: "320px"
              }}
            >
              {filteredDocs.length > 0 ? (
                <div className="overflow-y-auto flex flex-col w-full">
                  <div className="px-4 py-2 border-b border-solid" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                    <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      SEARCH RESULTS
                    </span>
                  </div>
                  {filteredDocs.map(doc => (
                    <button 
                      key={doc.id}
                      onClick={() => navigate('/site-info')}
                      className="w-full text-left bg-transparent border-none cursor-pointer flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-solid last:border-b-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex flex-col gap-1">
                        <div style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>{doc.site}</div>
                        <div className="flex items-center gap-2" style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                          <span>{doc.customer}</span>
                          <span style={{ fontSize: "10px" }}>•</span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getStatusColor(doc.status) }} />
                            {doc.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: "12px", backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", padding: "2px 6px", borderRadius: "var(--radius)" }}>
                          {doc.revision}
                        </span>
                        <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center flex flex-col items-center justify-center gap-2">
                  <Search size={24} style={{ color: "var(--muted-foreground)", opacity: 0.5 }} />
                  <span style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
                    No documents found matching "{searchQuery}"
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2) MY TASKS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 style={{ margin: 0, color: "var(--foreground)" }}>My Tasks</h2>
          {currentRole === "pm-pc" && (
            <button 
              onClick={() => navigate('/site-info')}
              className="flex items-center gap-2 border-none cursor-pointer hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                padding: "8px 16px",
                borderRadius: "var(--radius-button)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                boxShadow: "var(--elevation-sm)"
              }}
            >
              <Plus size={16} /> Create Site Document
            </button>
          )}
        </div>
        
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-transform duration-200" 
                style={{ 
                  backgroundColor: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "var(--radius-card)", 
                  padding: "24px" 
                }}
                onClick={() => navigate('/site-info')}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 style={{ margin: 0, color: "var(--foreground)" }}>{task.site}</h3>
                    <span 
                      className="inline-flex items-center px-2 py-1" 
                      style={{ 
                        backgroundColor: `color-mix(in srgb, ${task.statusColor} 12%, transparent)`, 
                        color: task.statusColor, 
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: "var(--font-weight-semibold)"
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 16px 0", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Settings size={14} /> {task.phase}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-solid" style={{ borderColor: "var(--border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={12} /> Last updated {task.updatedAt}
                  </span>
                  <button 
                    className="flex items-center gap-2 border-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity" 
                    style={{ 
                      color: "var(--primary)", 
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-bold)" 
                    }}
                  >
                    {getTaskAction()} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: "var(--card)", border: "1px dashed var(--border)", borderRadius: "var(--radius-card)" }}>
            <span style={{ fontSize: "24px", marginBottom: "8px" }}>🎉</span>
            <p style={{ margin: 0, color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>You’re all caught up!</p>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>No pending tasks assigned to you.</span>
          </div>
        )}
      </section>

      {/* 3) ROLE SCOPE — WHO DOES WHAT */}
      <section className="flex flex-col gap-6 pt-8 border-t border-solid" style={{ borderColor: "var(--border)" }}>
        <h2 style={{ margin: 0, color: "var(--foreground)", textAlign: "center" }}>Who does what in the Site Document</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Project Engineer */}
          <div className="flex flex-col" style={{ padding: "24px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
            <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "color-mix(in srgb, var(--chart-3) 15%, transparent)", color: "var(--chart-3)", borderRadius: "var(--radius)" }}>
              <Settings size={20} />
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>Project Engineer</h3>
            <ul style={{ margin: "0 0 24px 0", paddingLeft: "20px", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", lineHeight: "1.6" }}>
              <li>Defines technical architecture</li>
              <li>Provides antenna configurations</li>
              <li>Delivers general diagrams</li>
            </ul>
            <div className="mt-auto">
              <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>PHASES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Setup (support)</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Antennas</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Closeout</span>
              </div>
            </div>
          </div>

          {/* PM / PC */}
          <div className="flex flex-col" style={{ padding: "24px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
            <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "color-mix(in srgb, var(--chart-1) 15%, transparent)", color: "var(--chart-1)", borderRadius: "var(--radius)" }}>
              <FileText size={20} />
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>PM / Project Coordinator</h3>
            <ul style={{ margin: "0 0 24px 0", paddingLeft: "20px", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", lineHeight: "1.6" }}>
              <li>Owns the Site Document</li>
              <li>Defines services and revisions</li>
              <li>Generates final customer report</li>
            </ul>
            <div className="mt-auto">
              <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>PHASES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Setup</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Assets (review)</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Closeout</span>
              </div>
            </div>
          </div>

          {/* Field Engineer */}
          <div className="flex flex-col" style={{ padding: "24px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
            <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "color-mix(in srgb, var(--chart-5) 15%, transparent)", color: "var(--chart-5)", borderRadius: "var(--radius)" }}>
              <Wrench size={20} />
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>Field Engineer</h3>
            <ul style={{ margin: "0 0 24px 0", paddingLeft: "20px", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", lineHeight: "1.6" }}>
              <li>Captures on-site data</li>
              <li>Uploads photos and layouts</li>
              <li>Documents inventory and connections</li>
            </ul>
            <div className="mt-auto">
              <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>PHASES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Assets</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Layouts</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Connections</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Antennas</span>
              </div>
            </div>
          </div>

          {/* CSC / NOC */}
          <div className="flex flex-col" style={{ padding: "24px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)" }}>
            <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "color-mix(in srgb, var(--chart-4) 15%, transparent)", color: "var(--chart-4)", borderRadius: "var(--radius)" }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ margin: "0 0 12px 0", color: "var(--foreground)" }}>CSC / NOC</h3>
            <ul style={{ margin: "0 0 24px 0", paddingLeft: "20px", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", lineHeight: "1.6" }}>
              <li>Reviews technical accuracy</li>
              <li>Performs CSC audit</li>
              <li>Confirms readiness for closeout</li>
            </ul>
            <div className="mt-auto">
              <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>PHASES</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Closeout</span>
                <span style={{ fontSize: "11px", backgroundColor: "var(--secondary)", padding: "2px 8px", borderRadius: "9999px" }}>Audit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}