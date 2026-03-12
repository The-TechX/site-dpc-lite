import React, { useState } from "react"
import { Phone, Plus, Trash2, AlertCircle } from "lucide-react"
import { PageShell } from "../components/PageShell"

export function PhoneNumbers() {
  const [managed, setManaged] = useState(true)
  const [providerName, setProviderName] = useState("")
  const [phones, setPhones] = useState([{ id: 1, number: "+1 555-1234", assignedTo: "Bridge" }])
  const [emergencyNumbers, setEmergencyNumbers] = useState([{ id: 1, name: "", number: "" }])

  const addPhone = () => {
    if (phones.length < 20) setPhones([...phones, { id: Date.now(), number: "", assignedTo: "" }])
  }

  const addEmergencyNumber = () => {
    setEmergencyNumbers([...emergencyNumbers, { id: Date.now(), name: "", number: "" }])
  }

  const removeEmergencyNumber = (id: number) => {
    setEmergencyNumbers(emergencyNumbers.filter((n) => n.id !== id))
  }

  const inputCls = "p-2.5 bg-input-background border border-solid border-border text-foreground w-full outline-none focus:border-ring"
  const inputStyle: React.CSSProperties = { borderRadius: "var(--radius)", fontFamily: "var(--font-body)" }
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--text-sm)" }

  return (
    <PageShell
      title="Phone Numbers"
      subtitle="Configure communication lines and backup numbers."
      phase="PHASE A — SETUP"
      owner="PM/PC"
      backHref="/services"
      backLabel="Services"
      nextHref="/racks"
      nextLabel="Continue to Racks"
    >
      {/* Conditional Banner */}
      {!managed && (
        <div className="flex items-start gap-3 p-4 border border-solid animate-in fade-in slide-in-from-top-2 duration-300" style={{ borderColor: "var(--chart-5)", borderRadius: "var(--radius)", backgroundColor: "color-mix(in srgb, var(--chart-5) 8%, transparent)" }}>
          <AlertCircle size={18} style={{ color: "var(--chart-5)", marginTop: "2px", flexShrink: 0 }} />
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", fontSize: "var(--text-sm)", color: "var(--chart-5)" }}>Voice not managed by Viasat</span>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>Fewer fields are required. Please provide the third-party provider name and fill in backup numbers for documentation.</p>
          </div>
        </div>
      )}

      {/* General Config */}
      <div className="border border-solid p-6 flex flex-col gap-5" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--foreground)" }}>General Configuration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label style={labelStyle}>Does Viasat manage voice services?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                  <input type="radio" name="managed" checked={managed} onChange={() => setManaged(true)} /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                  <input type="radio" name="managed" checked={!managed} onChange={() => setManaged(false)} /> No
                </label>
              </div>
            </div>
            
            {/* New Input for Provider Name when Viasat doesn't manage Voice */}
            {!managed && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label style={labelStyle}>Voice Provider Name <span style={{ color: "var(--destructive)" }}>*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. AT&T, Vodafone, Local Telecom..." 
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className={inputCls} 
                  style={inputStyle} 
                />
                <p style={{ margin: 0, fontSize: "12px", fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
                  Required for our records since Viasat does not manage this service.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label style={labelStyle}>Country (Dial Code)</label>
            <select className={inputCls} style={inputStyle}>
              <option>United States (+1)</option>
              <option>United Kingdom (+44)</option>
              <option>Mexico (+52)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label style={labelStyle}>Main phone with extension?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                <input type="radio" name="ext" defaultChecked /> Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                <input type="radio" name="ext" /> No
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label style={labelStyle}>Main Number</label>
              <input type="text" className={inputCls} style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label style={labelStyle}>Extension</label>
              <input type="text" className={inputCls} style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Numbers List */}
      <div className="border border-solid p-6 flex flex-col gap-4" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="flex justify-between items-center border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--foreground)" }}>Phone Numbers</h3>
            <span className="px-2 py-0.5" style={{ fontSize: "11px", fontWeight: "var(--font-weight-semibold)", fontFamily: "var(--font-body)", backgroundColor: "var(--muted)", borderRadius: "9999px", color: "var(--muted-foreground)" }}>
              {phones.length}/20
            </span>
          </div>
          <button onClick={addPhone} disabled={phones.length >= 20} className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors disabled:opacity-50" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
            <Plus size={14} /> Add Phone
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: "500px" }}>
            <thead>
              <tr>
                <th className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)", width: "48px" }}>#</th>
                <th className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)" }}>Phone Number</th>
                <th className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)" }}>Assigned To</th>
                <th className="p-3 border-b border-solid" style={{ borderColor: "var(--border)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-semibold)", backgroundColor: "var(--muted)", width: "48px" }}></th>
              </tr>
            </thead>
            <tbody>
              {phones.map((phone, idx) => (
                <tr key={phone.id}>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <span style={{ fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>{idx + 1}</span>
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={phone.number} className="p-2 bg-transparent border border-solid border-border text-foreground w-full outline-none focus:border-ring" style={inputStyle} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <input type="text" defaultValue={phone.assignedTo} className="p-2 bg-transparent border border-solid border-border text-foreground w-full outline-none focus:border-ring" style={inputStyle} />
                  </td>
                  <td className="p-3 border-b border-solid" style={{ borderColor: "var(--border)" }}>
                    <button onClick={() => setPhones(phones.filter((p) => p.id !== phone.id))} className="bg-transparent border-none cursor-pointer p-1 hover:bg-muted transition-colors" style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup Numbers */}
      <div className="border border-solid p-6 flex flex-col gap-6" style={{ borderColor: "var(--border)", borderRadius: "var(--radius-card)", backgroundColor: "var(--card)" }}>
        <div className="border-b border-solid pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--foreground)" }}>Backup Phone Numbers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["OBM Master Number", "OBM Data Number", "SIM Card Number(s)", "FBB Phone + SIM"].map((label) => (
            <div key={label} className="flex flex-col gap-2">
              <label style={labelStyle}>{label}</label>
              <input type="text" className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>

        {/* Emergency Numbers Section */}
        <div className="border-t border-solid pt-6 mt-2" style={{ borderColor: "var(--border)" }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)" }}>Emergency Contacts</h4>
              <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>Add numbers to reach site managers, local authorities, or specific personnel in an emergency.</p>
            </div>
            <button 
              onClick={addEmergencyNumber} 
              className="inline-flex items-center gap-1.5 bg-transparent border border-solid px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors" 
              style={{ borderColor: "var(--border)", borderRadius: "var(--radius-button)", fontSize: "var(--text-sm)", fontFamily: "var(--font-heading)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}
            >
              <Plus size={14} /> Add Emergency Number
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {emergencyNumbers.map((contact, idx) => (
              <div key={contact.id} className="flex items-start gap-4 p-4 border border-solid" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--muted)/10" }}>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Contact Name / Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Local Police, Site Manager John..." 
                      className={inputCls} 
                      style={inputStyle} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+1 555-0000" 
                      className={inputCls} 
                      style={inputStyle} 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => removeEmergencyNumber(contact.id)} 
                  className="bg-transparent border-none cursor-pointer p-2 hover:bg-muted transition-colors mt-6" 
                  style={{ color: "var(--destructive)", borderRadius: "var(--radius)" }}
                  title="Remove emergency contact"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            {emergencyNumbers.length === 0 && (
              <div className="text-center p-6 border border-dashed" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", color: "var(--muted-foreground)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                No emergency numbers added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}