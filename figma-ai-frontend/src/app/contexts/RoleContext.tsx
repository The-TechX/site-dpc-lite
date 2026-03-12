import React, { createContext, useContext, useState, ReactNode } from "react"
import { useLocation } from "react-router"

export type Role = "field-engineer" | "pm-pc" | "noc"

interface RoleContextType {
  currentRole: Role
  setCurrentRole: (role: Role) => void
  canEdit: (page: string) => boolean
  isReadOnly: (page: string) => boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

// Define page-to-phase mapping
const pagePhaseMap: Record<string, string> = {
  "/": "HOME",
  "/site-info": "A",
  "/services": "A",
  "/phone-numbers": "B",
  "/racks": "B",
  "/equipment-not-on-rack": "B",
  "/inventory": "B",
  "/layouts": "C",
  "/connections": "D",
  "/antennas": "E",
  "/general-diagram": "F",
  "/csc-audit": "F-CSC",
  "/generate-report": "F",
}

// Permission logic by role
const rolePermissions = {
  "field-engineer": {
    canWrite: ["B", "C", "D", "E"],
    canRead: ["HOME", "A", "F", "F-CSC"],
  },
  "pm-pc": {
    canWrite: ["HOME", "A", "B", "C", "D", "E", "F"],
    canRead: ["F-CSC"],
  },
  noc: {
    canWrite: ["F-CSC"],
    canRead: ["HOME", "A", "B", "C", "D", "E", "F"],
  },
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>("field-engineer")

  const canEdit = (page: string): boolean => {
    const phase = pagePhaseMap[page]
    if (!phase) return false

    const permissions = rolePermissions[currentRole]
    return permissions.canWrite.includes(phase)
  }

  const isReadOnly = (page: string): boolean => {
    return !canEdit(page)
  }

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, canEdit, isReadOnly }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

export function usePagePermissions() {
  const { canEdit, isReadOnly } = useRole()
  const location = useLocation()
  
  return {
    canEdit: canEdit(location.pathname),
    isReadOnly: isReadOnly(location.pathname),
  }
}