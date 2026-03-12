import React, { useState } from "react"
import { X, CheckCircle2, XCircle, MessageSquare, AlertTriangle } from "lucide-react"
import { type ReviewComment } from "../contexts/WorkflowContext"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onReturn: (comments: ReviewComment[]) => void
}

const technicianPages = [
  { id: "/phone-numbers", label: "Phone Numbers", phase: "B" },
  { id: "/racks", label: "Racks Info", phase: "B" },
  { id: "/equipment-not-on-rack", label: "Equipment Off-Rack", phase: "B" },
  { id: "/inventory", label: "Inventory", phase: "B" },
  { id: "/layouts", label: "Layouts Hub", phase: "C" },
  { id: "/connections", label: "Connections Hub", phase: "D" },
  { id: "/antennas", label: "Antennas Hub", phase: "E" },
]

export function ReviewModal({ isOpen, onClose, onApprove, onReturn }: ReviewModalProps) {
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [pageComments, setPageComments] = useState<Record<string, string>>({})
  const [generalComment, setGeneralComment] = useState("")

  if (!isOpen) return null

  const handleTogglePage = (pageId: string) => {
    if (selectedPages.includes(pageId)) {
      setSelectedPages(selectedPages.filter((id) => id !== pageId))
      const newComments = { ...pageComments }
      delete newComments[pageId]
      setPageComments(newComments)
    } else {
      setSelectedPages([...selectedPages, pageId])
    }
  }

  const handlePageCommentChange = (pageId: string, comment: string) => {
    setPageComments({ ...pageComments, [pageId]: comment })
  }

  const handleApprove = () => {
    onApprove()
    resetForm()
  }

  const handleReturn = () => {
    const comments: ReviewComment[] = []
    
    // Add general comment if exists
    if (generalComment.trim()) {
      comments.push({
        id: Date.now().toString(),
        page: "General",
        comment: generalComment,
        createdAt: new Date().toISOString(),
        createdBy: "PM/PC",
      })
    }

    // Add page-specific comments
    selectedPages.forEach((pageId) => {
      const page = technicianPages.find((p) => p.id === pageId)
      if (page) {
        comments.push({
          id: `${Date.now()}-${pageId}`,
          page: page.label,
          comment: pageComments[pageId] || "Requires corrections",
          createdAt: new Date().toISOString(),
          createdBy: "PM/PC",
        })
      }
    })

    onReturn(comments)
    resetForm()
  }

  const resetForm = () => {
    setSelectedPages([])
    setPageComments({})
    setGeneralComment("")
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleCancel} />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[85vh] overflow-hidden z-50 border border-solid flex flex-col"
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
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)" }}>
                Review Technician's Work
              </h3>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                Phases B, C, D, E completed
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
        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1">
          <div
            className="flex items-start gap-3 px-4 py-3 border border-solid"
            style={{
              backgroundColor: "var(--muted)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <AlertTriangle size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
              Review the technician's completed work. If there are errors, select the pages with issues and add specific comments.
            </p>
          </div>

          {/* General Comment */}
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              General Comment (optional)
            </label>
            <textarea
              value={generalComment}
              onChange={(e) => setGeneralComment(e.target.value)}
              placeholder="Add general comments about the review..."
              rows={3}
              className="w-full px-4 py-2.5 border border-solid bg-transparent resize-none"
              style={{
                borderColor: "var(--input)",
                borderRadius: "var(--radius)",
                fontSize: "var(--text-sm)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Pages with Issues */}
          <div className="flex flex-col gap-3">
            <label style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              Pages with Errors (optional)
            </label>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)", margin: 0 }}>
              Select pages that require corrections
            </p>

            <div className="flex flex-col gap-2">
              {technicianPages.map((page) => (
                <div key={page.id} className="flex flex-col gap-2">
                  <button
                    onClick={() => handleTogglePage(page.id)}
                    className="flex items-center gap-3 p-3 border border-solid cursor-pointer text-left transition-all"
                    style={{
                      borderColor: selectedPages.includes(page.id) ? "var(--destructive)" : "var(--border)",
                      backgroundColor: selectedPages.includes(page.id) ? "var(--destructive)" : "transparent",
                      color: selectedPages.includes(page.id) ? "var(--destructive-foreground)" : "var(--foreground)",
                      borderRadius: "var(--radius)",
                      opacity: selectedPages.includes(page.id) ? 0.95 : 1,
                    }}
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center border-2 border-solid flex-shrink-0"
                      style={{
                        borderColor: selectedPages.includes(page.id) ? "var(--destructive-foreground)" : "var(--border)",
                        backgroundColor: selectedPages.includes(page.id) ? "var(--destructive-foreground)" : "transparent",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      {selectedPages.includes(page.id) && <XCircle size={14} style={{ color: "var(--destructive)" }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5"
                          style={{
                            fontSize: "10px",
                            fontWeight: "var(--font-weight-bold)",
                            backgroundColor: selectedPages.includes(page.id) ? "var(--destructive-foreground)" : "var(--muted)",
                            color: selectedPages.includes(page.id) ? "var(--destructive)" : "var(--muted-foreground)",
                            borderRadius: "9999px",
                          }}
                        >
                          PHASE {page.phase}
                        </span>
                        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}>
                          {page.label}
                        </span>
                      </div>
                    </div>
                  </button>

                  {selectedPages.includes(page.id) && (
                    <div className="ml-11 mr-2">
                      <textarea
                        value={pageComments[page.id] || ""}
                        onChange={(e) => handlePageCommentChange(page.id, e.target.value)}
                        placeholder={`Describe the errors in ${page.label}...`}
                        rows={2}
                        className="w-full px-3 py-2 border border-solid bg-transparent resize-none"
                        style={{
                          borderColor: "var(--input)",
                          borderRadius: "var(--radius)",
                          fontSize: "var(--text-sm)",
                          color: "var(--foreground)",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-3 p-6 border-t border-solid"
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
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturn}
              disabled={selectedPages.length === 0 && !generalComment.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 border-none cursor-pointer transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--destructive)",
                color: "var(--destructive-foreground)",
                borderRadius: "var(--radius-button)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              <XCircle size={16} />
              Return with Comments
            </button>
            <button
              onClick={handleApprove}
              className="inline-flex items-center gap-2 px-4 py-2 border-none cursor-pointer transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--chart-2)",
                color: "white",
                borderRadius: "var(--radius-button)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              <CheckCircle2 size={16} />
              Approve & Send to CSC
            </button>
          </div>
        </div>
      </div>
    </>
  )
}