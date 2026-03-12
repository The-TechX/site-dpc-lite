import React, { useState } from "react"
import { X, User, FileText, Calendar, AlertCircle } from "lucide-react"
import { availableTechnicians, type Technician, useWorkflow } from "../contexts/WorkflowContext"

interface AssignTechnicianModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (technician: Technician, wot: string) => void
}

export function AssignTechnicianModal({ isOpen, onClose, onAssign }: AssignTechnicianModalProps) {
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null)
  const [wotNumber, setWotNumber] = useState("")
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleAssign = () => {
    if (!selectedTech) {
      setError("Please select a technician")
      return
    }
    if (!wotNumber.trim()) {
      setError("WOT number is required")
      return
    }
    
    onAssign(selectedTech, wotNumber)
    setSelectedTech(null)
    setWotNumber("")
    setError("")
  }

  const handleCancel = () => {
    setSelectedTech(null)
    setWotNumber("")
    setError("")
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleCancel} />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 border border-solid"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--elevation-lg)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-solid" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)" }}>
                Assign Technician
              </h3>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                Select technician and provide WOT
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="bg-transparent border-none cursor-pointer p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 border border-solid"
              style={{
                backgroundColor: "var(--destructive)",
                color: "var(--destructive-foreground)",
                borderColor: "var(--destructive)",
                borderRadius: "var(--radius)",
                opacity: 0.9,
              }}
            >
              <AlertCircle size={18} />
              <span style={{ fontSize: "var(--text-sm)" }}>{error}</span>
            </div>
          )}

          {/* WOT Field */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              <span style={{ color: "var(--destructive)" }}>*</span> WOT Number (Work Order Ticket)
            </label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--muted-foreground)" }}
              />
              <input
                type="text"
                value={wotNumber}
                onChange={(e) => setWotNumber(e.target.value)}
                placeholder="e.g. WOT-2024-001234"
                className="w-full pl-10 pr-4 py-2.5 border border-solid bg-transparent"
                style={{
                  borderColor: "var(--input)",
                  borderRadius: "var(--radius)",
                  fontSize: "var(--text-sm)",
                  color: "var(--foreground)",
                }}
              />
            </div>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", margin: 0 }}>
              Required for SNOW tracking
            </p>
          </div>

          {/* Technician Selection */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              <span style={{ color: "var(--destructive)" }}>*</span> Select Technician
            </label>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {availableTechnicians.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className="flex items-center gap-3 p-3 border border-solid cursor-pointer text-left transition-all"
                  style={{
                    borderColor: selectedTech?.id === tech.id ? "var(--primary)" : "var(--border)",
                    backgroundColor: selectedTech?.id === tech.id ? "var(--primary)" : "transparent",
                    color: selectedTech?.id === tech.id ? "var(--primary-foreground)" : "var(--foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: selectedTech?.id === tech.id ? "var(--primary-foreground)" : "var(--muted)",
                      color: selectedTech?.id === tech.id ? "var(--primary)" : "var(--muted-foreground)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
                      {tech.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        color: selectedTech?.id === tech.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                        opacity: 0.9,
                      }}
                    >
                      {tech.email}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 p-6 border-t border-solid"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-transparent border border-solid cursor-pointer transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-button)",
              fontSize: "var(--text-sm)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 border-none cursor-pointer transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius-button)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Assign & Send Request
          </button>
        </div>
      </div>
    </>
  )
}