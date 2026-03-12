import React, { useState } from "react"
import { useRole } from "../contexts/RoleContext"
import { useNavigate } from "react-router"
import { 
  Database, Server, Users, Box, List, Plus, 
  Search, Edit2, Trash2, ChevronLeft
} from "lucide-react"

type TabType = "sites" | "customers" | "categories" | "models" | "racks"

// Mock Initial Data
const mockData = {
  sites: [
    { id: 1, name: "Rig Alpha-1", region: "Gulf of Mexico", status: "Active" },
    { id: 2, name: "Rig Delta-4", region: "North Sea", status: "Active" },
  ],
  customers: [
    { id: 1, name: "Oceanic Drilling", contact: "John Doe" },
    { id: 2, name: "Global Energy", contact: "Jane Smith" },
  ],
  categories: [
    { id: 1, name: "Switch" },
    { id: 2, name: "Router" },
    { id: 3, name: "Antenna" },
    { id: 4, name: "BUC" },
    { id: 5, name: "Modem" },
  ],
  models: [
    { id: 1, category: "Switch", brand: "Cisco", name: "Catalyst 9300" },
    { id: 2, category: "Router", brand: "Cisco", name: "ISR 4331" },
    { id: 3, category: "Antenna", brand: "Kymeta", name: "u8" },
  ],
  racks: [
    { id: 1, size: "4U", description: "Wall Mount" },
    { id: 2, size: "8U", description: "Standard Floor" },
    { id: 3, size: "12U", description: "Standard Floor" },
    { id: 4, size: "16U", description: "Standard Floor" },
    { id: 5, size: "42U", description: "Full Size" },
  ]
}

export function MasterData() {
  const { currentRole } = useRole()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>("sites")
  const [searchQuery, setSearchQuery] = useState("")

  // Security check: Only allow access if role is pm-pc
  if (currentRole !== "pm-pc") {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Database size={48} style={{ color: "var(--muted-foreground)", opacity: 0.5 }} />
        <h2 style={{ color: "var(--foreground)" }}>Access Denied</h2>
        <p style={{ color: "var(--muted-foreground)" }}>Only PM/PC roles can manage the Master Database.</p>
        <button 
          onClick={() => navigate("/")}
          className="border-none cursor-pointer hover:opacity-90 transition-opacity"
          style={{ 
            backgroundColor: "var(--primary)", 
            color: "var(--primary-foreground)", 
            padding: "8px 16px", 
            borderRadius: "var(--radius-button)" 
          }}
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  const tabs = [
    { id: "sites", label: "Existing Sites", icon: <Server size={18} /> },
    { id: "customers", label: "Customers", icon: <Users size={18} /> },
    { id: "categories", label: "Device Categories", icon: <Box size={18} /> },
    { id: "models", label: "Brands & Models", icon: <List size={18} /> },
    { id: "racks", label: "Rack Sizes", icon: <Server size={18} /> },
  ] as const

  const renderContent = () => {
    let data: any[] = []
    let columns: { key: string, label: string }[] = []

    switch (activeTab) {
      case "sites":
        data = mockData.sites
        columns = [
          { key: "name", label: "Site Name" },
          { key: "region", label: "Region" },
          { key: "status", label: "Status" },
        ]
        break
      case "customers":
        data = mockData.customers
        columns = [
          { key: "name", label: "Customer Name" },
          { key: "contact", label: "Primary Contact" },
        ]
        break
      case "categories":
        data = mockData.categories
        columns = [
          { key: "name", label: "Category Name" },
        ]
        break
      case "models":
        data = mockData.models
        columns = [
          { key: "category", label: "Category" },
          { key: "brand", label: "Brand" },
          { key: "name", label: "Model Name" },
        ]
        break
      case "racks":
        data = mockData.racks
        columns = [
          { key: "size", label: "Rack Units" },
          { key: "description", label: "Description" },
        ]
        break
    }

    // Basic filter
    const filteredData = data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md flex items-center" style={{ 
            backgroundColor: "var(--input-background)", 
            border: "1px solid var(--border)", 
            borderRadius: "var(--radius)" 
          }}>
            <Search size={18} style={{ color: "var(--muted-foreground)", marginLeft: "12px" }} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none"
              style={{ padding: "10px 12px", color: "var(--foreground)", fontSize: "var(--text-sm)" }}
            />
          </div>
          <button 
            className="flex items-center gap-2 border-none cursor-pointer hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: "var(--primary)", 
              color: "var(--primary-foreground)", 
              padding: "10px 16px", 
              borderRadius: "var(--radius-button)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)"
            }}
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        <div className="w-full overflow-x-auto border border-solid" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                {columns.map(col => (
                  <th key={col.key} style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>
                    {col.label}
                  </th>
                ))}
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)", width: "100px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors" style={{ borderBottom: i === filteredData.length - 1 ? 'none' : '1px solid var(--border)' }}>
                    {columns.map(col => (
                      <td key={col.key} style={{ padding: "12px 16px", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                        {item[col.key as keyof typeof item]}
                      </td>
                    ))}
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <div className="flex items-center justify-end gap-2">
                        <button className="border-none bg-transparent cursor-pointer hover:opacity-80" style={{ color: "var(--primary)" }}>
                          <Edit2 size={16} />
                        </button>
                        <button className="border-none bg-transparent cursor-pointer hover:opacity-80" style={{ color: "var(--destructive)" }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} style={{ padding: "32px", textAlign: "center", color: "var(--muted-foreground)" }}>
                    No records found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full mx-auto" style={{ gap: "32px", paddingBottom: "64px", maxWidth: "1200px" }}>
      {/* Header */}
      <div className="flex flex-col gap-4 pb-6 border-b border-solid" style={{ borderColor: "var(--border)" }}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 w-fit bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)", borderRadius: "var(--radius)" }}>
            <Database size={20} />
          </div>
          <div>
            <h1 style={{ margin: "0 0 4px 0", color: "var(--foreground)", fontSize: "24px" }}>Master Data Catalog</h1>
            <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: "var(--text-sm)" }}>
              Manage dropdown options and catalogs across all Site Documents. Changes here reflect globally.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="flex flex-col gap-2 p-4 border border-solid" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
            <span style={{ fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0 12px 8px 12px" }}>
              Catalogs
            </span>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSearchQuery("")
                }}
                className="flex items-center gap-3 w-full text-left border-none cursor-pointer transition-colors"
                style={{ 
                  padding: "10px 12px",
                  borderRadius: "var(--radius)",
                  backgroundColor: activeTab === tab.id ? "var(--muted)" : "transparent",
                  color: activeTab === tab.id ? "var(--foreground)" : "var(--muted-foreground)",
                  fontWeight: activeTab === tab.id ? "var(--font-weight-medium)" : "var(--font-weight-normal)"
                }}
              >
                {tab.icon}
                <span style={{ fontSize: "var(--text-sm)" }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}