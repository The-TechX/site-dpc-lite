import React, { useState } from "react"
import { Plus, Trash2, Calendar, MapPin, Image as ImageIcon, CheckCircle2, Building2, History } from "lucide-react"
import { PageShell } from "../components/PageShell"
import { useRole } from "../contexts/RoleContext"

export function SiteInfo() {
  const { currentRole } = useRole()

  const [siteData, setSiteData] = useState({
    name: "",
    country: "",
    location: "",
    ticket: "",
    date: new Date().toISOString().split('T')[0]
  })

  const [tenants, setTenants] = useState([
    { id: 1, name: "Viasat (Primary)", isPrimary: true },
    { id: 2, name: "", isPrimary: false }
  ])
  const [pocs, setPocs] = useState([{ id: 1, name: "", email: "" }])

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateData, setUpdateData] = useState({ wot: "", technician: "" })

  const addTenant = () => setTenants([...tenants, { id: Date.now(), name: "", isPrimary: false }])
  const removeTenant = (id: number) => setTenants(tenants.filter((t) => t.id !== id))

  const addPoc = () => setPocs([...pocs, { id: Date.now(), name: "", email: "" }])
  const removePoc = (id: number) => setPocs(pocs.filter((p) => p.id !== id))

  const inputStyle: React.CSSProperties = { borderRadius: "var(--radius)" }

  return (
    <>
      <PageShell
        title="Site Info"
        subtitle="General site information, location details, and multi-tenant configuration."
        phase="PHASE A — SETUP"
        owner="PM/PC"
        backHref="/"
        backLabel="Back to Dashboard"
        nextHref="/services"
        nextLabel="Continue to Services"
        actions={
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1"
              style={{ fontSize: "var(--text-sm)", color: "var(--chart-2)", backgroundColor: "color-mix(in srgb, var(--chart-2) 10%, transparent)", borderRadius: "9999px", fontFamily: "var(--font-body)" }}
            >
              <CheckCircle2 size={14} /> Autosave on
            </span>
            
            {currentRole === "pm-pc" && (
              <button
                onClick={() => setShowUpdateModal(true)}
                className="flex items-center gap-2 border-none cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-button)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  boxShadow: "var(--elevation-sm)",
                  fontFamily: "var(--font-body)"
                }}
              >
                <History size={16} /> Generate Updated Version
              </button>
            )}
          </div>
        }
        hideClientFilter
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Site Details Card */}
          <div
            className="border border-solid p-6 flex flex-col gap-5"
            style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}
          >
            <div className="border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-heading)" }}>Site Details</h3>
              <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>Primary details about the location</p>
            </div>

            <div className="flex flex-col gap-2">
              <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Rig/Vessel Name <span style={{ color: "var(--destructive)" }}>*</span></label>
              <input 
                type="text" 
                placeholder="e.g. Rig Alpha" 
                value={siteData.name}
                onChange={(e) => setSiteData({...siteData, name: e.target.value})}
                className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Rig/Vessel Photo</label>
              <div className="border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}>
                <ImageIcon size={28} style={{ color: "var(--muted-foreground)", marginBottom: "8px" }} />
                <span style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Click to upload photo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3" size={15} style={{ color: "var(--muted-foreground)" }} />
                  <input 
                    type="text" 
                    placeholder="Select..." 
                    value={siteData.country}
                    onChange={(e) => setSiteData({...siteData, country: e.target.value})}
                    className="p-2.5 pl-9 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                    style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Location</label>
                <input 
                  type="text" 
                  placeholder="City or Coordinates" 
                  value={siteData.location}
                  onChange={(e) => setSiteData({...siteData, location: e.target.value})}
                  className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                  style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3" size={15} style={{ color: "var(--muted-foreground)" }} />
                  <input 
                    type="date" 
                    value={siteData.date}
                    onChange={(e) => setSiteData({...siteData, date: e.target.value})}
                    className="p-2.5 pl-9 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                    style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}>Ticket</label>
                <input 
                  type="text" 
                  placeholder="INC-XXXXXX" 
                  value={siteData.ticket}
                  onChange={(e) => setSiteData({...siteData, ticket: e.target.value})}
                  className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                  style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Multi-Tenant Card */}
            <div
              className="border border-solid p-6 flex flex-col gap-5"
              style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}
            >
              <div className="border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <Building2 size={20} style={{ color: "var(--primary)" }} />
                  <h3 style={{ margin: 0, fontFamily: "var(--font-heading)" }}>Clients on Site (Tenants)</h3>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>Add all clients sharing this physical site. You'll be able to tag equipment per client later.</p>
              </div>

              <div className="flex flex-col gap-3">
                {tenants.map((tenant, index) => (
                  <div key={tenant.id} className="flex gap-3 items-center">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        placeholder={tenant.isPrimary ? "Primary Client / Company" : "Additional Client"} 
                        defaultValue={tenant.name}
                        className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                        style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                        readOnly={tenant.isPrimary}
                      />
                      {tenant.isPrimary && (
                        <span className="absolute right-3 top-2.5" style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-body)" }}>
                          PRIMARY
                        </span>
                      )}
                    </div>
                    {!tenant.isPrimary && (
                      <button
                        onClick={() => removeTenant(tenant.id)}
                        className="bg-transparent border-none cursor-pointer p-2 hover:bg-muted transition-colors"
                        style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addTenant}
                className="w-full bg-transparent border border-dashed text-foreground hover:bg-muted cursor-pointer flex items-center justify-center gap-2 py-2.5"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}
              >
                <Plus size={16} /> Add Another Client
              </button>
            </div>

            {/* Stakeholders Card */}
            <div
              className="border border-solid p-6 flex flex-col gap-5"
              style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}
            >
              <div className="border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)" }}>Points of Contact</h3>
                <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>Internal and external stakeholders</p>
              </div>

              {pocs.map((poc) => (
                <div key={poc.id} className="flex gap-3 items-end">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)" }}>Name</label>
                      <input type="text" placeholder="Name" className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" style={{ ...inputStyle, fontFamily: "var(--font-body)" }} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)" }}>Email</label>
                      <input type="email" placeholder="Email" className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" style={{ ...inputStyle, fontFamily: "var(--font-body)" }} />
                    </div>
                  </div>
                  <button
                    onClick={() => removePoc(poc.id)}
                    className="bg-transparent border-none cursor-pointer p-2 hover:bg-muted transition-colors mb-0.5"
                    style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={addPoc}
                className="w-full bg-transparent border border-dashed text-foreground hover:bg-muted cursor-pointer flex items-center justify-center gap-2 py-2.5"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)" }}
              >
                <Plus size={16} /> Add POC
              </button>
            </div>
          </div>
        </div>
      </PageShell>

      {/* UPDATE VERSION MODAL */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div 
            className="flex flex-col p-6 max-w-md w-full animate-in fade-in zoom-in-95 duration-200"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              boxShadow: "var(--elevation-lg)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontFamily: "var(--font-heading)", color: "var(--foreground)", fontSize: "var(--text-xl)" }}>
              Generate Updated Version
            </h3>
            <p style={{ margin: "0 0 24px 0", fontFamily: "var(--font-body)", color: "var(--muted-foreground)", fontSize: "var(--text-sm)", lineHeight: "1.5" }}>
              Start a new revision of this site document. Please provide the new Work Order Ticket (WOT) and assign a Field Engineer.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                  WOT (Work Order Ticket) <span style={{ color: "var(--destructive)" }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. WOT-123456" 
                  value={updateData.wot}
                  onChange={e => setUpdateData({...updateData, wot: e.target.value})}
                  className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring" 
                  style={{ ...inputStyle, fontFamily: "var(--font-body)" }} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}>
                  Assign Technician <span style={{ color: "var(--destructive)" }}>*</span>
                </label>
                <select 
                  value={updateData.technician}
                  onChange={e => setUpdateData({...updateData, technician: e.target.value})}
                  className="p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring cursor-pointer" 
                  style={{ ...inputStyle, fontFamily: "var(--font-body)", appearance: "auto" }} 
                >
                  <option value="">Select a technician...</option>
                  <option value="tech1">Alex Johnson (Field Engineer)</option>
                  <option value="tech2">Maria Garcia (Field Engineer)</option>
                  <option value="tech3">David Smith (Field Engineer)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-solid border-border">
              <button 
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 bg-transparent border border-solid cursor-pointer hover:bg-muted transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  borderRadius: "var(--radius-button)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-body)"
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowUpdateModal(false);
                  setUpdateData({ wot: "", technician: "" });
                }}
                className="px-4 py-2 border-none cursor-pointer hover:opacity-90 transition-opacity"
                disabled={!updateData.wot || !updateData.technician}
                style={{
                  backgroundColor: updateData.wot && updateData.technician ? "var(--primary)" : "var(--muted)",
                  color: updateData.wot && updateData.technician ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  borderRadius: "var(--radius-button)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-body)",
                  boxShadow: updateData.wot && updateData.technician ? "var(--elevation-sm)" : "none"
                }}
              >
                Create Version
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}