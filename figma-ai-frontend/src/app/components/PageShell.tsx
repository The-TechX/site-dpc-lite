import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { ChevronLeft, ChevronRight, Lock, AlertCircle, UserPlus, Building2 } from "lucide-react"
import { useRole } from "../contexts/RoleContext"
import { useWorkflow } from "../contexts/WorkflowContext"
import { AssignTechnicianModal } from "./AssignTechnicianModal"
import { useClientFilter } from "../contexts/ClientFilterContext"
import { toast } from "sonner"

interface PageShellProps {
  title: string
  subtitle?: string
  phase?: string
  owner?: string
  backHref?: string
  backLabel?: string
  nextHref?: string
  nextLabel?: string
  actions?: React.ReactNode
  hideClientFilter?: boolean
  children: React.ReactNode
}

export function PageShell({
  title,
  subtitle,
  phase,
  owner,
  backHref,
  backLabel = "Back",
  nextHref,
  nextLabel = "Continue",
  actions,
  hideClientFilter,
  children,
}: PageShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isReadOnly, currentRole } = useRole()
  const { setDocumentStatus, setAssignedTechnician, setWot } = useWorkflow()
  const [showAssignModal, setShowAssignModal] = useState(false)

  const { selectedClient, setSelectedClient, clients } = useClientFilter()

  const pageIsReadOnly = isReadOnly(location.pathname)
  
  // Check if we're on the Services page and user is PM/PC
  const isServicesPage = location.pathname === "/services"
  const shouldShowAssignFlow = isServicesPage && currentRole === "pm-pc"

  const handleNextClick = () => {
    if (shouldShowAssignFlow) {
      setShowAssignModal(true)
    } else {
      navigate(nextHref!)
    }
  }

  const handleAssignTechnician = (technician: any, wot: string) => {
    setAssignedTechnician(technician)
    setWot(wot)
    setDocumentStatus("assigned")
    setShowAssignModal(false)
    
    // Show success toast
    toast.success("Technician Assigned Successfully", {
      description: `${technician.name} has been assigned to this site document with WOT: ${wot}`,
      duration: 5000,
    })
    
    // Navigate to dashboard after assignment
    setTimeout(() => {
      navigate("/")
    }, 500)
  }

  // Determine button text and icon
  const getNextButtonContent = () => {
    if (shouldShowAssignFlow) {
      return (
        <>
          <UserPlus size={16} />
          Assign Technician & Send Request
        </>
      )
    }
    return (
      <>
        {nextLabel}
        <ChevronRight size={16} />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Read-only Banner */}
      {pageIsReadOnly && (
        <div
          className="flex items-center gap-3 px-4 py-3 border border-solid"
          style={{
            backgroundColor: "var(--muted)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <Lock size={18} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
          <div className="flex-1">
            <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              Read-Only Mode
            </p>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
              You do not have write permissions for this section based on your current role.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          {phase && (
            <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--primary)", letterSpacing: "0.08em" }}>
              {phase}
            </span>
          )}
          <h2 style={{ margin: 0 }}>{title}</h2>
          {subtitle && (
            <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>{subtitle}</p>
          )}
          {owner && (
            <div className="flex items-center gap-2 mt-1">
              <span
                className="inline-flex items-center px-2 py-0.5"
                style={{
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-semibold)",
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)",
                  borderRadius: "9999px",
                }}
              >
                Owner: {owner}
              </span>
            </div>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>

      {/* Global Client View Selector */}
      {!hideClientFilter && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 border border-solid"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--card)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 border border-solid"
            style={{
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--background)",
            }}
          >
            <Building2 size={16} style={{ color: "var(--muted-foreground)" }} />
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                fontFamily: "var(--font-heading)",
                color: "var(--muted-foreground)",
              }}
            >
              Viewing:
            </span>
            <select
              className="bg-transparent border-none outline-none cursor-pointer"
              style={{
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-heading)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
              }}
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="All Clients">All Clients (Site Wide)</option>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <span
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-body)",
            }}
          >
            {selectedClient === "All Clients"
              ? "Showing data for all clients across this site document"
              : `Filtering site document data for ${selectedClient}`}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-6">{children}</div>

      {/* Footer Navigation */}
      {(backHref || nextHref) && (
        <div
          className="flex justify-between items-center pt-6 mt-2 border-t border-solid"
          style={{ borderColor: "var(--border)" }}
        >
          {backHref ? (
            <button
              onClick={() => navigate(backHref)}
              className="inline-flex items-center gap-1.5 bg-transparent border border-solid text-foreground px-4 py-2 cursor-pointer hover:bg-muted transition-colors"
              style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}
            >
              <ChevronLeft size={16} />
              {backLabel}
            </button>
          ) : (
            <div />
          )}
          {nextHref && (
            <button
              onClick={handleNextClick}
              className="inline-flex items-center gap-1.5 border-none px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: "var(--radius-button)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              {getNextButtonContent()}
            </button>
          )}
        </div>
      )}

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignTechnician}
      />
    </div>
  )
}