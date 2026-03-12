import React, { useState } from "react"
import { Network, Plus, Upload, Search, AlertCircle, Filter, Download, Building2, Tag, Edit2, X } from "lucide-react"
import { PageShell } from "../components/PageShell"
import { useClientFilter } from "../contexts/ClientFilterContext"

const MOCK_CLIENTS = ["Viasat", "Client A", "Client B"]

type ItemStatus = "Active" | "Spare" | "Damaged" | "Decommissioned"

interface InventoryItem {
  id: string
  tenants: string[]
  name: string
  netId: string
  model: string
  serial: string
  mac: string
  rack: string
  uNum: number
  valid: boolean
  status: ItemStatus
}

const mockItems: InventoryItem[] = [
  { id: "INV-001", tenants: ["Viasat", "Client A"], name: "Core Switch", netId: "SW-01", model: "Cisco 9300", serial: "SDF93290", mac: "00:1A:2B:3C:4D:5E", rack: "RK-01", uNum: 40, valid: true, status: "Active" },
  { id: "INV-002", tenants: ["Viasat"], name: "Firewall", netId: "FW-01", model: "Palo Alto PA-220", serial: "PA9X0923", mac: "00:1A:2B:3C:4D:6F", rack: "RK-01", uNum: 38, valid: true, status: "Active" },
  { id: "INV-003", tenants: ["Client B"], name: "Access Point", netId: "AP-01", model: "Cisco 9120", serial: "", mac: "", rack: "", uNum: 0, valid: false, status: "Active" },
]

export function Inventory() {
  const [search, setSearch] = useState("")
  const { selectedClient: selectedClientFilter } = useClientFilter()
  const [items, setItems] = useState<InventoryItem[]>(mockItems)
  
  // Bulk selection and modification states
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBulkStatus, setNewBulkStatus] = useState<ItemStatus>("Spare")

  const filtered = items.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.netId.toLowerCase().includes(search.toLowerCase())
    const matchesClient = selectedClientFilter === "All Clients" || i.tenants.includes(selectedClientFilter)
    return matchesSearch && matchesClient
  })

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map(i => i.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  // Bulk Apply Handler
  const handleApplyBulkStatus = () => {
    setItems(prev => prev.map(item => 
      selectedIds.includes(item.id) ? { ...item, status: newBulkStatus } : item
    ))
    setSelectedIds([])
    setIsModalOpen(false)
  }

  const thStyle: React.CSSProperties = { fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", fontFamily: "var(--font-heading)", backgroundColor: "var(--muted)" }
  const tdInputStyle: React.CSSProperties = { borderRadius: "var(--radius)", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)" }

  const getTenantColor = (tenant: string) => {
    if (tenant === "Viasat") return { bg: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }
    if (tenant === "Client A") return { bg: "color-mix(in srgb, var(--chart-2) 15%, transparent)", color: "var(--chart-2)" }
    if (tenant === "Client B") return { bg: "color-mix(in srgb, var(--chart-3) 15%, transparent)", color: "var(--chart-3)" }
    return { bg: "var(--muted)", color: "var(--foreground)" }
  }

  const getStatusColor = (status: ItemStatus) => {
    switch(status) {
      case "Active": return { bg: "color-mix(in srgb, var(--chart-2) 15%, transparent)", color: "var(--chart-2)" }
      case "Spare": return { bg: "color-mix(in srgb, var(--chart-4) 15%, transparent)", color: "var(--chart-4)" }
      case "Damaged": return { bg: "color-mix(in srgb, var(--destructive) 15%, transparent)", color: "var(--destructive)" }
      case "Decommissioned": return { bg: "var(--muted)", color: "var(--muted-foreground)" }
      default: return { bg: "var(--muted)", color: "var(--foreground)" }
    }
  }

  return (
    <PageShell
      title="Inventory"
      subtitle="Source of truth for all equipment. Tag assets to specific clients to filter final reports."
      phase="PHASE B — ASSETS"
      owner="FE / PM"
      backHref="/equipment-not-on-rack"
      backLabel="Off-Rack Equipment"
      nextHref="/layouts"
      nextLabel="Continue to Layouts Hub"
      actions={
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
            <Upload size={14} /> Import CSV
          </button>
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
            <Download size={14} /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 border-none px-3 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)" }}>
            <Plus size={14} /> Add Device
          </button>
        </div>
      }
    >
      {/* View Filter Bar */}
      <div className="border border-solid p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        
        <span style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
          Showing {filtered.length} of {items.length} devices
          {selectedClientFilter !== "All Clients" && (
            <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}> for {selectedClientFilter}</span>
          )}
        </span>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5" size={15} style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search devices..."
              className="p-2 pl-9 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"
              style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}
            />
          </div>
          <button className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-2 cursor-pointer hover:bg-muted transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-solid overflow-hidden relative" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap" style={{ minWidth: "1100px" }}>
            <thead>
              {selectedIds.length > 0 ? (
                // Bulk Action Header replacing normal headers
                <tr>
                  <th className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)", width: "40px" }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === filtered.length && filtered.length > 0} 
                      className="cursor-pointer"
                    />
                  </th>
                  <th colSpan={9} className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <span style={{ color: "var(--primary)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)" }}>
                        {selectedIds.length} item{selectedIds.length !== 1 && 's'} selected
                      </span>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-1.5 border border-solid px-3 py-1.5 cursor-pointer hover:opacity-90 transition-opacity" 
                        style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)" }}
                      >
                        <Edit2 size={14} /> Modify Selected
                      </button>
                    </div>
                  </th>
                </tr>
              ) : (
                // Standard Headers
                <tr>
                  <th className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)", width: "40px" }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === filtered.length && filtered.length > 0} 
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)", width: "32px" }}></th>
                  <th className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)", width: "180px" }}>Allocated To (Clients)</th>
                  <th className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)" }}>Status</th>
                  {["Device Name", "Network ID", "Model", "Serial #", "MAC Address", "Location"].map((h) => (
                    <th key={h} className="p-3 border-b border-solid" style={{ ...thStyle, borderColor: "var(--border)" }}>{h}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors" style={{ backgroundColor: selectedIds.includes(item.id) ? "color-mix(in srgb, var(--primary) 5%, transparent)" : "transparent" }}>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    {!item.valid && <AlertCircle size={16} style={{ color: "var(--chart-5)" }} title="Missing required info" />}
                  </td>
                  
                  {/* Multi-Tenant Cell */}
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {item.tenants.map(t => {
                        const colors = getTenantColor(t)
                        return (
                          <span key={t} className="inline-flex items-center px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-heading)", backgroundColor: colors.bg, color: colors.color, borderRadius: "var(--radius)" }}>
                            {t}
                          </span>
                        )
                      })}
                      <button className="inline-flex items-center justify-center w-5 h-5 bg-transparent border border-dashed cursor-pointer hover:bg-muted transition-colors rounded-full" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }} title="Add Client">
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>

                  {/* Status Cell */}
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <span className="inline-flex items-center px-2 py-1" style={{ 
                      fontSize: "var(--text-xs)", 
                      fontFamily: "var(--font-heading)", 
                      fontWeight: "var(--font-weight-semibold)", 
                      backgroundColor: getStatusColor(item.status).bg, 
                      color: getStatusColor(item.status).color, 
                      borderRadius: "var(--radius)" 
                    }}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={item.name} className="p-1.5 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={tdInputStyle} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={item.netId} className="p-1.5 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={tdInputStyle} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={item.model} className="p-1.5 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={tdInputStyle} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={item.serial} placeholder="Required" className="p-1.5 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={{ ...tdInputStyle, borderColor: !item.serial ? "var(--chart-5)" : undefined }} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={item.mac} placeholder="Required" className="p-1.5 bg-transparent border border-solid border-border w-full outline-none focus:border-ring" style={{ ...tdInputStyle, fontFamily: "monospace", borderColor: !item.mac ? "var(--chart-5)" : undefined }} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    {item.rack ? (
                      <span className="inline-flex items-center px-2 py-1" style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", backgroundColor: "var(--muted)", borderRadius: "var(--radius)" }}>
                        {item.rack} U{item.uNum}
                      </span>
                    ) : (
                      <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 text-center border-t border-solid" style={{ borderColor: "var(--border)" }}>
          <button className="bg-transparent border-none cursor-pointer hover:underline font-medium" style={{ color: "var(--primary)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)" }}>
            + Add Device
          </button>
        </div>
      </div>

      {/* Bulk Modify Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="border border-solid p-6 flex flex-col gap-5 w-full max-w-sm" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius-card)", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}>
            
            <div className="flex justify-between items-center">
              <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)" }}>Modify Status</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-transparent border-none cursor-pointer p-1 rounded-full hover:bg-muted transition-colors"
                style={{ color: "var(--muted-foreground)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ margin: 0, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
              You are updating the status for <span style={{ fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>{selectedIds.length}</span> selected equipment item{selectedIds.length !== 1 && 's'}.
            </p>

            <div className="flex flex-col gap-2">
              <label style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>New Status</label>
              <select 
                value={newBulkStatus} 
                onChange={(e) => setNewBulkStatus(e.target.value as ItemStatus)}
                className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring cursor-pointer"
                style={{ borderRadius: "var(--radius)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}
              >
                <option value="Active">Active (In Production)</option>
                <option value="Spare">Spare (Backup)</option>
                <option value="Damaged">Damaged / Faulty</option>
                <option value="Decommissioned">Decommissioned</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", color: "var(--foreground)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleApplyBulkStatus} 
                className="px-4 py-2 border-none cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-heading)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}