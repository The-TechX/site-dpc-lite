import React, { useState } from "react"
import { Outlet, NavLink, useLocation, useNavigate } from "react-router"
import {
  ChevronDown, ChevronRight, Clock, MoreVertical, Rocket,
  Info, Server, Phone, LayoutGrid, Box, Network, Layers,
  Cable, Battery, Monitor, Camera, Activity, Settings, Database, Plus,
  ShieldCheck, FileBarChart, Image as ImageIcon, FileText,
  Menu, X, CheckCircle2, CircleDot, Circle, AlertCircle,
  Share2, History, FolderOpen, HelpCircle, RotateCcw, Eye, Lock, Home, User
} from "lucide-react"
import { Progress } from "./ui/progress"
import { useRole, type Role } from "../contexts/RoleContext"

type PhaseStatus = "completed" | "in-progress" | "not-started" | "blocked"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  status: PhaseStatus
}

interface Phase {
  id: string
  label: string
  status: PhaseStatus
  completion: number
  items: NavItem[]
}

const phases: Phase[] = [
  {
    id: "setup",
    label: "PHASE A — Setup",
    status: "in-progress",
    completion: 65,
    items: [
      { name: "Site Info", href: "/site-info", icon: Info, status: "in-progress" },
      { name: "Services", href: "/services", icon: Server, status: "in-progress" },
    ],
  },
  {
    id: "assets",
    label: "PHASE B — Assets",
    status: "in-progress",
    completion: 40,
    items: [
      { name: "Racks Info", href: "/racks", icon: LayoutGrid, status: "in-progress" },
      { name: "Equipment Off-Rack", href: "/equipment-not-on-rack", icon: Box, status: "not-started" },
      { name: "Inventory", href: "/inventory", icon: Network, status: "in-progress" },
      { name: "Phone Numbers", href: "/phone-numbers", icon: Phone, status: "not-started" },
    ],
  },
  {
    id: "layouts",
    label: "PHASE C — Layouts",
    status: "not-started",
    completion: 0,
    items: [
      { name: "Layouts Hub", href: "/layouts", icon: Layers, status: "not-started" },
    ],
  },
  {
    id: "connections",
    label: "PHASE D — Connections",
    status: "not-started",
    completion: 0,
    items: [
      { name: "Connections Hub", href: "/connections", icon: Cable, status: "not-started" },
    ],
  },
  {
    id: "antennas",
    label: "PHASE E — Antennas",
    status: "not-started",
    completion: 0,
    items: [
      { name: "Antennas Hub", href: "/antennas", icon: Camera, status: "not-started" },
    ],
  },
  {
    id: "closeout",
    label: "PHASE F — Closeout",
    status: "not-started",
    completion: 0,
    items: [
      { name: "General Diagram", href: "/general-diagram", icon: ImageIcon, status: "not-started" },
      { name: "CSC Audit", href: "/csc-audit", icon: ShieldCheck, status: "not-started" },
      { name: "Generate Report", href: "/generate-report", icon: FileBarChart, status: "not-started" },
    ],
  },
]

const statusIcon = (status: PhaseStatus, size = 16) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={size} style={{ color: "var(--chart-2)" }} />
    case "in-progress":
      return <CircleDot size={size} style={{ color: "var(--primary)" }} />
    case "blocked":
      return <AlertCircle size={size} style={{ color: "var(--destructive)" }} />
    default:
      return <Circle size={size} style={{ color: "var(--muted-foreground)" }} />
  }
}

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentRole, setCurrentRole, isReadOnly } = useRole()
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    setup: true,
    assets: true,
    layouts: true,
    connections: true,
    antennas: true,
    closeout: true,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [overflowOpen, setOverflowOpen] = useState(false)
  const [rolePickerOpen, setRolePickerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Check if we need to hide the sidebar (Home page or Master Data)
  const hideSidebar = location.pathname === "/" || location.pathname === "/master-data"

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const overallCompletion = 24

  const roleLabels: Record<Role, string> = {
    "field-engineer": "Field Engineer",
    "pm-pc": "PM/PC",
    noc: "NOC",
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2">
        <span
          className="tracking-widest text-muted-foreground"
          style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)" }}
        >
          NAVIGATION
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Home Link */}
        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2.5 mb-2 transition-colors no-underline"
          style={({ isActive }) => ({
            borderRadius: "var(--radius)",
            backgroundColor: isActive ? "var(--primary)" : "transparent",
            color: isActive ? "var(--primary-foreground)" : "var(--sidebar-foreground)",
            textDecoration: "none",
          })}
        >
          {({ isActive }) => (
            <>
              <Home size={16} />
              <span style={{ fontSize: "var(--text-sm)", fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-normal)" }}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Phase Navigation */}
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.id]
          return (
            <div key={phase.id} className="mb-1">
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-transparent border-none cursor-pointer text-sidebar-foreground hover:bg-muted/50 transition-colors"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-center gap-2">
                  {statusIcon(phase.status, 14)}
                  <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.05em" }}>
                    {phase.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{phase.completion}%</span>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
              </button>

              {isExpanded && (
                <div className="ml-2 border-l-2 border-solid" style={{ borderColor: "var(--border)" }}>
                  {phase.items.map((item) => {
                    const isActive = location.pathname === item.href
                    const itemReadOnly = isReadOnly(item.href)
                    return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 ml-2 transition-colors no-underline"
                        style={{
                          borderRadius: "var(--radius)",
                          backgroundColor: isActive ? "var(--primary)" : "transparent",
                          color: isActive ? "var(--primary-foreground)" : "var(--sidebar-foreground)",
                          textDecoration: "none",
                        }}
                      >
                        {!isActive && statusIcon(item.status, 14)}
                        {isActive && <item.icon size={14} />}
                        <span style={{ fontSize: "var(--text-sm)", fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-normal)" }}>
                          {item.name}
                        </span>
                        {itemReadOnly && !isActive && (
                          <Lock size={12} style={{ marginLeft: "auto", color: "var(--muted-foreground)", opacity: 0.6 }} />
                        )}
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="border-t border-solid p-4 flex flex-col gap-3" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>Overall</span>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--primary)" }}>{overallCompletion}%</span>
        </div>
        <Progress value={overallCompletion} />
      </div>
    </div>
  )

  return (
    <div className="flex h-screen w-full flex-col" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {/* Top App Bar */}
      <header
        className="flex h-14 shrink-0 items-center justify-between border-b border-solid px-4 lg:px-6 z-20"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        {/* Left Section: Logo + Title */}
        <div className="flex items-center gap-4">
          {!hideSidebar && (
            <button
              className="lg:hidden bg-transparent border-none text-foreground p-1.5 cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ borderRadius: "var(--radius)", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <FileText size={18} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>
              VES Operations Center
            </span>
          </div>

          {/* Navigation Tabs - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 ml-6">
            <button
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2 bg-transparent border-none cursor-default transition-colors"
              style={{
                color: "var(--muted-foreground)",
                borderBottom: "2px solid transparent",
                fontWeight: "var(--font-weight-normal)",
                fontSize: "var(--text-sm)",
              }}
            >
              Monitor
            </button>
            <button
              className="px-4 py-2 bg-transparent border-none cursor-default transition-colors"
              style={{
                color: "var(--primary)",
                borderBottom: "2px solid var(--primary)",
                fontWeight: "var(--font-weight-semibold)",
                fontSize: "var(--text-sm)",
              }}
            >
              Site Manager
            </button>
          </div>
        </div>

        {/* Right Section: View As Selector & Settings */}
        <div className="flex items-center gap-3">
          
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center justify-center w-8 h-8 bg-transparent border-none text-foreground cursor-pointer hover:bg-muted transition-colors"
              style={{ borderRadius: "var(--radius-button)" }}
            >
              <Settings size={18} style={{ color: "var(--muted-foreground)" }} />
            </button>
            
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setSettingsOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1 w-64 border border-solid z-40 py-1"
                  style={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "var(--elevation-sm)",
                  }}
                >
                  <div className="px-3 py-2 border-b border-solid" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
                    <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", color: "var(--muted-foreground)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      SITE MANAGER SETTINGS
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSettingsOpen(false)
                      // Dummy action
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-transparent border-none cursor-pointer text-foreground hover:bg-muted transition-colors text-left"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    <Plus size={16} style={{ color: "var(--muted-foreground)" }} />
                    <span>Añadir Antennas</span>
                  </button>

                  <button
                    onClick={() => {
                      setSettingsOpen(false)
                      navigate("/master-data")
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-transparent border-none cursor-pointer text-foreground hover:bg-muted transition-colors text-left"
                    style={{ fontSize: "var(--text-sm)" }}
                  >
                    <Database size={16} style={{ color: "var(--primary)" }} />
                    <span>Master Data & Catalogs</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="w-px h-6 bg-border mx-1" style={{ backgroundColor: "var(--border)" }}></div>

          {/* View As Selector */}
          <div className="relative">
            <button
              onClick={() => setRolePickerOpen(!rolePickerOpen)}
              className="flex items-center gap-2 bg-transparent border-none text-foreground px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
              style={{ borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)" }}
            >
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "9999px" }}
              >
                <User size={14} />
              </div>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-normal)" }}>
                View as: <span style={{ fontWeight: "var(--font-weight-semibold)" }}>{roleLabels[currentRole]}</span>
              </span>
              <ChevronDown size={14} style={{ color: "var(--muted-foreground)" }} />
            </button>
            {rolePickerOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setRolePickerOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1 w-56 border border-solid z-40 py-1"
                  style={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "var(--elevation-sm)",
                  }}
                >
                  <div className="px-3 py-2 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", color: "var(--muted-foreground)", letterSpacing: "0.05em" }}>
                      SELECT ROLE
                    </span>
                  </div>
                  {(["field-engineer", "pm-pc", "noc"] as Role[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role)
                        setRolePickerOpen(false)
                      }}
                      className="w-full flex items-center justify-between gap-2.5 px-3 py-2.5 bg-transparent border-none cursor-pointer text-foreground hover:bg-muted transition-colors text-left"
                      style={{
                        fontSize: "var(--text-sm)",
                        backgroundColor: currentRole === role ? "var(--muted)" : "transparent",
                      }}
                    >
                      <span style={{ fontWeight: currentRole === role ? "var(--font-weight-semibold)" : "var(--font-weight-normal)" }}>
                        {roleLabels[role]}
                      </span>
                      {currentRole === role && <CheckCircle2 size={16} style={{ color: "var(--primary)" }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Only show when NOT on home page or master-data */}
        {!hideSidebar && (
          <aside
            className="w-64 xl:w-72 flex-shrink-0 border-r border-solid overflow-hidden hidden lg:flex flex-col"
            style={{ borderColor: "var(--sidebar-border)", backgroundColor: "var(--sidebar)" }}
          >
            {sidebar}
          </aside>
        )}

        {/* Mobile Sidebar Overlay - Only show when NOT on home page or master-data */}
        {!hideSidebar && sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <aside
              className="fixed inset-y-0 left-0 w-72 z-40 lg:hidden flex flex-col border-r border-solid"
              style={{ borderColor: "var(--sidebar-border)", backgroundColor: "var(--sidebar)" }}
            >
              <div className="h-14 flex items-center px-4 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                <button onClick={() => setSidebarOpen(false)} className="bg-transparent border-none p-1 cursor-pointer text-foreground">
                  <X size={20} />
                </button>
              </div>
              {sidebar}
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--background)" }}>
          <div className={hideSidebar ? "p-4 lg:p-8 mx-auto max-w-7xl" : "p-4 lg:p-8 mx-auto max-w-6xl"}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}