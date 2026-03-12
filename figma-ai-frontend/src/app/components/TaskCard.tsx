import React from "react"
import { Calendar, User, FileText, Clock, AlertCircle, CheckCircle2, XCircle, Eye } from "lucide-react"
import { type Task, type DocumentStatus } from "../contexts/WorkflowContext"

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

const statusConfig: Record<DocumentStatus, { label: string; color: string; icon: React.ReactNode }> = {
  draft: {
    label: "Draft",
    color: "var(--muted-foreground)",
    icon: <FileText size={14} />,
  },
  assigned: {
    label: "Assigned",
    color: "var(--primary)",
    icon: <User size={14} />,
  },
  "in-progress": {
    label: "In Progress",
    color: "var(--chart-4)",
    icon: <Clock size={14} />,
  },
  "pending-review": {
    label: "Pending Review",
    color: "var(--chart-3)",
    icon: <Eye size={14} />,
  },
  returned: {
    label: "Returned",
    color: "var(--destructive)",
    icon: <XCircle size={14} />,
  },
  "pending-csc-audit": {
    label: "Pending CSC Audit",
    color: "var(--chart-5)",
    icon: <AlertCircle size={14} />,
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
    icon: <CheckCircle2 size={14} />,
  },
}

const priorityColors = {
  low: "var(--muted-foreground)",
  medium: "var(--chart-3)",
  high: "var(--destructive)",
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const status = statusConfig[task.status]

  return (
    <div
      onClick={onClick}
      className="border border-solid p-4 transition-all cursor-pointer hover:shadow-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--elevation-xs)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)", marginBottom: "4px" }}>
            {task.siteName}
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "var(--muted-foreground)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.siteDocument}
          </p>
        </div>
        <span
          className="px-2 py-1 flex items-center gap-1 flex-shrink-0"
          style={{
            fontSize: "10px",
            fontWeight: "var(--font-weight-bold)",
            backgroundColor: priorityColors[task.priority],
            color: "white",
            borderRadius: "9999px",
            textTransform: "uppercase",
          }}
        >
          {task.priority === "high" && "High"}
          {task.priority === "medium" && "Medium"}
          {task.priority === "low" && "Low"}
        </span>
      </div>

      {/* Status Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3"
        style={{
          fontSize: "11px",
          fontWeight: "var(--font-weight-semibold)",
          backgroundColor: status.color,
          color: "white",
          borderRadius: "var(--radius)",
          opacity: 0.95,
        }}
      >
        {status.icon}
        {status.label}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={14} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground)" }}>{task.assignedTo.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText size={14} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>WOT: {task.wot}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={14} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
            Due: {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>

      {/* Comments indicator */}
      {task.comments && task.comments.length > 0 && (
        <div
          className="mt-3 pt-3 border-t border-solid flex items-center gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <AlertCircle size={14} style={{ color: "var(--destructive)" }} />
          <span style={{ fontSize: "11px", color: "var(--destructive)", fontWeight: "var(--font-weight-semibold)" }}>
            {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  )
}