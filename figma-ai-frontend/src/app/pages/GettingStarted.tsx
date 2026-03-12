import React, { useState } from "react"
import { useNavigate } from "react-router"
import {
  Rocket, ShieldCheck, HardHat, Server, Eye, Zap, Layers,
  ArrowRight, ListChecks, ChevronRight, CheckCircle2
} from "lucide-react"
import { Progress } from "../components/ui/progress"

const roles = [
  {
    icon: ShieldCheck,
    title: "PM / PC",
    subtitle: "Project Manager / Coordinator",
    color: "var(--primary)",
    tasks: ["Initial Site Info setup", "Assign roles & permissions", "Approve finalized layouts", "Generate final reports"],
  },
  {
    icon: HardHat,
    title: "Field Engineer",
    subtitle: "On-site Technician",
    color: "var(--chart-2)",
    tasks: ["Upload equipment photos", "Complete rack & switch layouts", "Update inventory MACs/Serials", "Antenna blockage mapping"],
  },
  {
    icon: Server,
    title: "CSC",
    subtitle: "Support Center",
    color: "var(--chart-3)",
    tasks: ["Verify network configurations", "Complete CSC audit checklist", "Review service endpoints", "Sign off on OBM connectivity"],
  },
  {
    icon: Eye,
    title: "Viewer",
    subtitle: "Read-only access",
    color: "var(--muted-foreground)",
    tasks: ["View all sections", "Add comments where allowed", "Download reports", "View audit trail"],
  },
]

const myTasks = [
  { label: "Complete Site Info required fields", section: "Site Info", priority: "high" },
  { label: "Upload rack front/rear photos", section: "Racks", priority: "medium" },
  { label: "Map switch ports to devices", section: "Connections", priority: "low" },
]

export function GettingStarted() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState<"quick" | "full" | null>(null)

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ borderRadius: "var(--radius-card)", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <Rocket size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Welcome to Site Document</h2>
            <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
              Modern guided workflow for data entry, validation, and report generation.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Steps Banner */}
      <div
        className="border border-solid p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: "var(--primary)", borderRadius: "var(--radius-card)", backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)" }}
      >
        <div className="flex flex-col gap-3">
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--primary)" }}>
            How this works
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            {["Fill Sections", "Validate Data", "Generate Report"].map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && <ArrowRight size={14} style={{ color: "var(--muted-foreground)" }} />}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-6 h-6"
                    style={{
                      borderRadius: "9999px",
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      fontSize: "12px",
                      fontWeight: "var(--font-weight-bold)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "var(--text-sm)" }}>{step}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate("/site-info")}
          className="inline-flex items-center gap-2 border-none px-4 py-2.5 cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)" }}
        >
          Start Incomplete Section <ArrowRight size={16} />
        </button>
      </div>

      {/* Workflow Mode Selection */}
      <div className="flex flex-col gap-3">
        <h3 style={{ margin: 0 }}>Choose Workflow Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: "quick" as const,
              icon: Zap,
              title: "Field Quick Mode",
              desc: "Capture essentials first. Placeholders allowed, complete later.",
            },
            {
              id: "full" as const,
              icon: Layers,
              title: "Full Mode",
              desc: "Inventory import + full mapping. Complete all sections upfront.",
            },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="flex items-start gap-4 p-5 border border-solid bg-transparent cursor-pointer text-left transition-all hover:shadow-sm"
              style={{
                borderColor: selectedMode === mode.id ? "var(--primary)" : "var(--border)",
                borderRadius: "var(--radius-card)",
                backgroundColor: selectedMode === mode.id ? "color-mix(in srgb, var(--primary) 5%, var(--card))" : "var(--card)",
                borderWidth: selectedMode === mode.id ? "2px" : "1px",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{
                  borderRadius: "var(--radius)",
                  backgroundColor: selectedMode === mode.id ? "var(--primary)" : "var(--muted)",
                  color: selectedMode === mode.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
              >
                <mode.icon size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-base)" }}>
                  {mode.title}
                </span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{mode.desc}</span>
              </div>
              {selectedMode === mode.id && (
                <CheckCircle2 size={20} className="flex-shrink-0 ml-auto" style={{ color: "var(--primary)" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Roles & My Tasks Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Roles */}
        <div className="xl:col-span-2 flex flex-col gap-3">
          <h3 style={{ margin: 0 }}>Roles & Responsibilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div
                key={role.title}
                className="border border-solid p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow"
                style={{
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius-card)",
                  backgroundColor: "var(--card)",
                  borderTopWidth: "3px",
                  borderTopColor: role.color,
                }}
              >
                <div className="flex items-center gap-3">
                  <role.icon size={20} style={{ color: role.color }} />
                  <div>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-bold)", fontSize: "var(--text-base)" }}>
                      {role.title}
                    </span>
                    <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{role.subtitle}</p>
                  </div>
                </div>
                <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                  {role.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2">
                      <ChevronRight size={12} className="mt-1 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                      <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks Preview */}
        <div className="flex flex-col gap-3">
          <h3 style={{ margin: 0 }}>
            <span className="flex items-center gap-2">
              <ListChecks size={18} style={{ color: "var(--primary)" }} />
              My Tasks
              <span
                className="inline-flex items-center justify-center px-2 py-0.5"
                style={{
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-bold)",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  borderRadius: "9999px",
                  minWidth: "20px",
                }}
              >
                {myTasks.length}
              </span>
            </span>
          </h3>
          <div
            className="border border-solid p-4 flex flex-col gap-3"
            style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}
          >
            {myTasks.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 border border-solid hover:bg-muted/30 cursor-pointer transition-colors"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{
                    backgroundColor: task.priority === "high" ? "var(--destructive)" : task.priority === "medium" ? "var(--chart-5)" : "var(--chart-2)",
                  }}
                />
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: "var(--text-sm)" }}>{task.label}</span>
                  <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{task.section}</span>
                </div>
              </div>
            ))}
            <button
              className="bg-transparent border-none text-left cursor-pointer p-0 hover:underline"
              style={{ color: "var(--primary)", fontSize: "var(--text-sm)" }}
            >
              View all tasks →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
