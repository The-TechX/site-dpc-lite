import React, { createContext, useContext, useState, ReactNode } from "react"

export type DocumentStatus = 
  | "draft" 
  | "assigned" 
  | "in-progress" 
  | "pending-review" 
  | "returned" 
  | "pending-csc-audit" 
  | "completed"

export interface Technician {
  id: string
  name: string
  email: string
  role: string
}

export interface Task {
  id: string
  siteDocument: string
  siteName: string
  assignedTo: Technician
  assignedBy: string
  wot: string
  status: DocumentStatus
  createdAt: string
  dueDate: string
  phase: string
  priority: "low" | "medium" | "high"
  comments?: ReviewComment[]
}

export interface ReviewComment {
  id: string
  page: string
  comment: string
  createdAt: string
  createdBy: string
}

interface WorkflowContextType {
  documentStatus: DocumentStatus
  setDocumentStatus: (status: DocumentStatus) => void
  assignedTechnician: Technician | null
  setAssignedTechnician: (tech: Technician | null) => void
  wot: string
  setWot: (wot: string) => void
  tasks: Task[]
  addTask: (task: Task) => void
  updateTaskStatus: (taskId: string, status: DocumentStatus) => void
  reviewComments: ReviewComment[]
  addReviewComment: (comment: ReviewComment) => void
  clearReviewComments: () => void
  isPhaseACompleted: boolean
  setIsPhaseACompleted: (completed: boolean) => void
  isTechWorkCompleted: boolean
  setIsTechWorkCompleted: (completed: boolean) => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

// Mock technicians list
export const availableTechnicians: Technician[] = [
  { id: "1", name: "Oscar Flores", email: "oscar.flores@company.com", role: "Field Engineer" },
  { id: "2", name: "Maria Garcia", email: "maria.garcia@company.com", role: "Field Engineer" },
  { id: "3", name: "John Smith", email: "john.smith@company.com", role: "Field Engineer" },
  { id: "4", name: "Ana Rodriguez", email: "ana.rodriguez@company.com", role: "Field Engineer" },
]

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>("draft")
  const [assignedTechnician, setAssignedTechnician] = useState<Technician | null>(null)
  const [wot, setWot] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [reviewComments, setReviewComments] = useState<ReviewComment[]>([])
  const [isPhaseACompleted, setIsPhaseACompleted] = useState(false)
  const [isTechWorkCompleted, setIsTechWorkCompleted] = useState(false)

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const updateTaskStatus = (taskId: string, status: DocumentStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    )
  }

  const addReviewComment = (comment: ReviewComment) => {
    setReviewComments((prev) => [...prev, comment])
  }

  const clearReviewComments = () => {
    setReviewComments([])
  }

  return (
    <WorkflowContext.Provider
      value={{
        documentStatus,
        setDocumentStatus,
        assignedTechnician,
        setAssignedTechnician,
        wot,
        setWot,
        tasks,
        addTask,
        updateTaskStatus,
        reviewComments,
        addReviewComment,
        clearReviewComments,
        isPhaseACompleted,
        setIsPhaseACompleted,
        isTechWorkCompleted,
        setIsTechWorkCompleted,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error("useWorkflow must be used within a WorkflowProvider")
  }
  return context
}
