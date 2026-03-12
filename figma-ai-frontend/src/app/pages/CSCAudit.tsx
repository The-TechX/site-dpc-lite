import React, { useState } from "react"
import { CheckSquare, Square, Calendar, User, FileText, Save } from "lucide-react"
import { PageShell } from "../components/PageShell"
import { Progress } from "../components/ui/progress"

const initialItems = [
  { id: 1, category: "Physical Security", task: "Access control system fully operational", checked: true },
  { id: 2, category: "Physical Security", task: "Visitor logs up to date for past 30 days", checked: false },
  { id: 3, category: "Physical Security", task: "Camera surveillance active in all critical zones", checked: true },
  { id: 4, category: "Network Compliance", task: "Firewall rules reviewed in last 90 days", checked: false },
  { id: 5, category: "Network Compliance", task: "Guest Wi-Fi properly segregated", checked: true },
  { id: 6, category: "Network Compliance", task: "VPN tunnels verified and documented", checked: false },
  { id: 7, category: "Environmentals", task: "HVAC system within acceptable parameters", checked: true },
  { id: 8, category: "Environmentals", task: "UPS battery test performed successfully", checked: false },
  { id: 9, category: "Environmentals", task: "Fire suppression system inspected", checked: true },
]

export function CSCAudit() {
  const [auditItems, setAuditItems] = useState(initialItems)

  const toggleCheck = (id: number) => {
    setAuditItems((items) => items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const categories = Array.from(new Set(auditItems.map((item) => item.category)))
  const completedCount = auditItems.filter((i) => i.checked).length
  const completionPct = Math.round((completedCount / auditItems.length) * 100)

  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"

  return (
    <PageShell
      title="CSC Audit Checklist"
      subtitle="Perform and record Customer Service Center compliance audits."
      phase="PHASE F — CLOSEOUT"
      owner="CSC"
      backHref="/general-diagram"
      backLabel="General Diagram"
      nextHref="/generate-report"
      nextLabel="Continue to Report"
      actions={
        <button className="inline-flex items-center gap-1.5 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}>
          <Save size={14} /> Save Audit
        </button>
      }
    >
      {/* Summary Bar */}
      <div className="border border-solid p-4 flex items-center gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Completion:</span>
        <div className="flex-1">
          <Progress value={completionPct} />
        </div>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--primary)" }}>{completedCount}/{auditItems.length}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {categories.map((category) => (
            <div key={category} className="border border-solid p-6 flex flex-col gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
              <h3 className="border-b border-solid pb-3" style={{ margin: 0, borderColor: "var(--border)" }}>{category}</h3>
              <div className="flex flex-col gap-3">
                {auditItems.filter((item) => item.category === category).map((item) => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group" style={{ fontWeight: "var(--font-weight-normal)" }}>
                    <button type="button" onClick={() => toggleCheck(item.id)} className="bg-transparent border-none p-0 flex-shrink-0 mt-0.5 cursor-pointer">
                      {item.checked ? (
                        <CheckSquare size={18} style={{ color: "var(--primary)" }} />
                      ) : (
                        <Square size={18} style={{ color: "var(--muted-foreground)" }} />
                      )}
                    </button>
                    <span style={{ color: item.checked ? "var(--foreground)" : "var(--muted-foreground)", fontSize: "var(--text-sm)", textDecoration: item.checked ? "line-through" : "none" }}>
                      {item.task}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Audit Details Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="border border-solid p-6 flex flex-col gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
            <h3 className="border-b border-solid pb-3" style={{ margin: 0, borderColor: "var(--border)" }}>Audit Details</h3>

            <div className="flex flex-col gap-2">
              <label>Auditor Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3" size={15} style={{ color: "var(--muted-foreground)" }} />
                <input type="text" placeholder="John Doe" className={inputCls + " pl-9"} style={{ borderRadius: "var(--radius)" }} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3" size={15} style={{ color: "var(--muted-foreground)" }} />
                <input type="date" className={inputCls + " pl-9"} style={{ borderRadius: "var(--radius)" }} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Notes</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3" size={15} style={{ color: "var(--muted-foreground)" }} />
                <textarea rows={4} placeholder="Additional observations..." className={inputCls + " pl-9 resize-none"} style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
