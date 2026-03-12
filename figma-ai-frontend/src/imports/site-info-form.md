A) Getting Started (Welcome / Guidance)
- Welcome page with Beam 3 cards for each role (PM/PC, FE, CSC).
- Each card lists what that role fills out in the app.
- Include a “How this works” mini flow: Fill → Validate → Generate Report.
- Provide a “Start” button that jumps to the first incomplete section.

B) 0. LogBook (Internal Logbook)
- Beam 3 data table with inline editing, filtering, sorting.
Columns:
- Ticket
- Viasat Representative
- FE Pending Activities
- Status (Pending / Completed / Canceled)
- Comments from PC/PM
- Timeline entries: Date + Name + Comment (view as expandable row or modal)
Features:
- Add row, edit row, attach evidence (images/PDF), filter by status, search by ticket.
- Ticket detail modal showing chronological comment timeline and attachments.

C) 1. Site Info (General Site Information)
Beam 3 form with clear sections:
1) Customer & Site
- Customer (combobox, supports “Other…”)
- Customer logo upload (image)
- Rig/Vessel name (text)
- Rig/Vessel photo upload (image)
- Country (combobox) + Location (text)
- Date (date picker) + Ticket (text)
2) Project Stakeholders
- Project Manager/Coordinator name + email
- Field Engineer name + email
- Sales Account Manager name + email
- Service Delivery Manager name + email (optional)
- Service Delivery Engineer name + email (optional)
3) Customer POC
- IT Representative name + email
- IT Manager name + email
- Additional POCs: repeatable group with “Add POC” / “Remove POC”
Validation:
- Required fields marked, inline email validation, date must be present.

D) 1.1 Services (Services Onboard)
- List of service cards with “Add service” CTA (Beam 3).
Each service includes:
- Service Type (KU / KA / C / LTE / OneWeb / Starlink)
- System Type (Single / Dual)
- Antenna System (searchable combobox from catalog + “Other…”)
- BUC power (W) (numeric)
- Bandwidth (Down/Up) (numeric + units)
- Satellite / Constellation (searchable combobox)
- Provided by (Viasat / Vendor / Other)
Actions:
- Add, duplicate, remove service.
Rules:
- At least one service must exist before report generation is enabled.

E) 2. Phone Numbers
Top controls:
- Does Viasat manage voice services? (Yes/No)
- Country (combobox) → auto-fills International Dial Code field
- Does it have a main phone with extension? (Yes/No)
  - If Yes: Main Number + Extension fields
Phone Number List:
- Beam 3 table (max 20 rows)
Columns: ID (auto), Phone Number, Assigned To
Backup Phone Numbers section:
- OBM Master Number
- OBM Data Number
- SIM card number(s)
- FBB Phone + SIM
- Sat Phone numbers (repeatable list)
Validation:
- Enforce maximum 20 phone numbers.
- Phone formatting hints based on dial code.

F) 3. Rack’s Information
- Beam 3 table for racks with inline edit + row details panel.
Fields per rack:
- Rack ID
- Rack Size (U) (combobox: 9U…52U)
- Vessel/Rig Location (text)
- Room (text)
- Front View photo upload
- Rear View photo upload
Rules:
- Minimum required: Rack ID, size, location, room; at least one photo recommended (flag missing photos).

G) 3.1 Rack Location Layout (Drag-and-drop over a site drawing)
- Canvas workspace:
  - Upload “Rig/Vessel drawing” image (plan view).
  - Right panel lists all racks (from Rack’s Info).
- Drag a rack pin (with label “Rack ID”) onto the drawing.
- Pin can rotate (angle control) and be repositioned.
- Store normalized X/Y coordinates and rotation.
- Provide “Reset layout” action and “Snap to grid” toggle.

H) 3.2 Equipment not on Rack (Optional)
- Beam 3 table with:
  - NON-Rack ID
  - Vessel/Rig Location
  - Room
  - Photo upload (front view)
- If section is empty, show Beam 3 empty state: “No off-rack equipment added.”

I) 4. Inventory Table (Source of truth)
- Beam 3 advanced data table with:
Columns:
- Owner (Viasat / Customer / Other)
- Device Name
- Network ID
- Model (catalog combobox + “Other…”)
- Serial #
- MAC Address
- Rack ID (links to racks)
- Rack Unit # (numeric)
- Is not on rack? (toggle)
- If not on rack: Location text field
- Comments
Features:
- Import CSV/XLSX (optional UI) and map columns.
- Row validation badges (missing required fields, invalid MAC format).
Rules:
- Inventory drives downstream layouts (Switch, Patch Panel, Power, OBM) by selecting devices from inventory.

J) 4.1 Switches Layout
- Select a Switch device (from Inventory) then render a Ports table.
Ports table columns:
- Port (number or label)
- Connected Device (combobox from Inventory)
- Device Port (text)
- Status (Up / Down / NC)
- Commentaries (text)
Actions:
- Add port row, bulk add ports via “Template by model” (auto-create 24/48 ports if applicable).
- Duplicate switch layout for another switch device.

K) 4.2 Patch Panel Layout
- Similar to switch layout but for patch panels:
Columns:
- PP Port
- Local Device
- Remote Device
- Status
- Commentaries
Add/remove rows, validations for missing endpoints.

L) 4.3 PDU/UPS Layout
- Power mapping layout:
Columns:
- PDU/UPS Port
- Connected Device (from Inventory)
- Status (On / Off / Fault / Unknown)
- Commentaries
Use Beam 3 status chips and icons.

M) 4.4 OBM Layout (If applicable)
- Detect if OBM exists in inventory; if not, show empty state “No OBM device registered.”
If yes:
- OBM header: OBM device selector + “OBM Antenna Picture” upload (LEO box).
- Ports table:
  - Port
  - Device (from Inventory)
  - Status (Reachable / Not reachable / NC)
  - Commentaries
Include a quick action: “Mark Verified with NOC” (checkbox + timestamp).

N) 5. Antennas Photo
- Beam 3 table:
  - Antenna (from services catalog)
  - Location (text)
  - View/Photo upload (image)
Rules:
- One unique photo per antenna; warn on duplicate reuse.

O) 5.1 Antennas Location Layout (Main view)
- Canvas with uploaded site plan.
- Left panel lists antennas based on Services (and/or antenna catalog).
- Each antenna item is a draggable marker with:
  - Colored border
  - Arrow pointer
  - Antenna label (e.g., “KU VSAT 01”)
- Save position based on arrow tip (X/Y normalized) and rotation.
- Reset action.

P) 5.2 Antennas Location Layout (Optional additional views)
- Support adding multiple additional drawings (e.g., isometric).
- For each drawing: drag antennas onto the view as above.
- “Add antenna to this view” action that prompts antenna selection.

Q) 5.3 Blockage Zone
- For each antenna, provide “Add values” form:
  - Satellite Azimuth (degrees)
  - Blockage Start (degrees)
  - Blockage End (degrees)
- Generate an illustrative overlay (arc/sector) preview using Beam 3 visualization container style.
- Provide “Reset blockage values”.
- Store values per antenna and allow export of the illustration as SVG/PNG for reporting.

R) 6. General Diagram
- File upload area (supports vector/PDF) with preview viewer (zoom/pan).
- Notes field + version label.
- Guidance text: diagram should include connections (AC, RF, Network), labels, and standardized color coding.

S) 7. Antennas Configuration
- This is a flexible module (“Pending to define” in Excel): implement as
  - Per-antenna configuration form (repeatable sections)
  - Key/value grid + attachments + screenshots
  - Export config as JSON
- Provide placeholders and allow schema changes later.

T) 8. CSC Audit
- Checklist module with items and verification columns by role:
  - Engineer
  - Field Tech
  - Project Manager
  - GNOC
- Each item has:
  - Status (Yes-Verified / N/A / Pending)
  - Comments text area
  - Optional link buttons (SolarWinds, ServiceNow)
- Provide “Mark all reviewed for my role” action and a summary panel of pending items.

U) Generate / Report Generation
- Report readiness dashboard:
  - Section progress cards with % completion and “Go to missing fields”.
  - Buttons:
    - Generate PDF
    - Generate editable report (DOCX/online doc)
    - Export Inventory (XLSX/CSV)
    - Export Evidence ZIP
- Lock generation until minimum required sections are complete:
  Site Info + Services + Inventory + at least one of (Antenna photos or Antenna layout).
