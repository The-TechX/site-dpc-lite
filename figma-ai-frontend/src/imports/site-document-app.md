You are designing a responsive web application that replaces a technical Excel “Site Document” with a modern, guided, task-driven workflow for data entry, validation, automation, evidence capture, and report generation.

CRITICAL DESIGN SYSTEM REQUIREMENT:
- Use the full Beam 3 component library exclusively for ALL UI elements.
- Do not create custom components unless Beam 3 lacks an equivalent. If so, extend Beam 3 styles/tokens only (typography, spacing, colors, elevation, radii).
- Apply Beam 3 patterns for: top app bar, sidebar navigation, grouped stepper, tables, forms, validation, empty states, modals, toasts, file uploads, chips/tags, progress indicators, side panels, and role-based UI states.

PRODUCT GOAL:
Convert the Excel tabs into a modern web “workspace” with:
- Phase-based navigation (grouped stepper)
- Role-based “My Tasks” (task-first, not tab-first)
- Hubs for complex areas (Antennas, Connections, Layouts)
- Evidence Center for all uploads
- Preflight validation before report generation

TARGET ROLES:
PM/PC, Field Engineer (FE), CSC, Viewer.
- Each section shows Owner role and an editable vs read-only state.
- Read-only users can comment if allowed.
- Field-level audit history accessible from a right-side panel.

========================================================
1) GLOBAL APP SHELL (Beam 3)
========================================================
A) Top App Bar
- Left: Site Selector (Customer + Rig/Vessel) + Document Status Badge (Draft / In Review / Final).
- Center/right: Overall Completion % (weighted), Last saved timestamp (autosave per field).
- Primary actions: Generate Report, Export, Share/Permissions.
- Overflow actions: Audit Log, Evidence Center, Help, Reset Section.

B) Left Sidebar Navigation (Grouped Stepper)
Use a grouped vertical stepper with phases (collapsible groups):
PHASE A — Setup
PHASE B — Assets
PHASE C — Layouts
PHASE D — Connections
PHASE E — Antennas
PHASE F — Closeout

Each group shows:
- Status icon (Not started / In progress / Completed / Blocked)
- Mini completion %
- Blocked reason tooltip when applicable

C) Persistent Footer on each page
- Back / Continue buttons
- Continue always routes to “next meaningful requirement” (next incomplete or blocking item), not merely the next page.

D) Right Side Panels (Beam 3)
- Panel 1: My Tasks (by role) with counts, priorities, and deep links to exact fields/rows.
- Panel 2: Field Audit Trail (who/when/what changed)
- Panel 3: Evidence Center (global) – can be opened as a side panel or modal

========================================================
2) NEW INFORMATION ARCHITECTURE (PHASES + HUBS)
========================================================
Do NOT present 20+ Excel tabs as flat navigation. Replace with phases and hubs:

PHASE A — Setup
1. Getting Started (role cards + mode selection)
2. Site Info
3. Services
4. Phone Numbers (conditional)

PHASE B — Assets
5. Racks Info
6. Equipment Not on Rack (optional)
7. Inventory (source of truth)

PHASE C — Layouts (HUB)
8. Layouts Hub (tabs)
   - Rack Location Layout (canvas)
   - Antenna Locations (main) (canvas)
   - Additional Views (multiple drawings) (canvas list)

PHASE D — Connections (HUB)
9. Connections Hub (tabs)
   - Switches Layout
   - Patch Panel Layout
   - Power (PDU/UPS) Layout
   - OBM Layout (conditional)

PHASE E — Antennas (HUB)
10. Antennas Hub (tabs)
   - Photos
   - Locations (shortcut to Layouts Hub antenna tab)
   - Blockage Zones (with preview overlay)
   - Antennas Configuration (key/value + attachments)

PHASE F — Closeout
11. CSC Audit
12. Generate / Preflight / Report Dashboard

========================================================
3) GETTING STARTED (MODERN ONBOARDING)
========================================================
Screen: Getting Started
- Beam 3 cards for each role (PM/PC, FE, CSC, Viewer) explaining responsibilities and edit rights.
- Offer two workflow modes (Beam 3 choice cards):
  A) Field Quick Mode (capture essentials first, placeholders allowed)
  B) Full Mode (inventory import + full mapping)
- Include “Start” button that jumps to the first incomplete REQUIRED item for the logged-in role.
- Show a “My Tasks” panel preview (e.g., “3 tasks for you”).

========================================================
4) CORE MODULE REQUIREMENTS (MODERNIZED)
========================================================
A) Site Info (Form Page Template)
- Keep all fields from Excel mapping (customer/site, stakeholders, customer POCs).
- Inline validation + top error summary when multiple errors.
- Autosave on change with “Saving…” then “Saved”.

B) Services (Cards + Add/Duplicate/Remove)
- Must have at least one service to enable report generation.
- Services drive antenna lists across the app.

C) Phone Numbers (Conditional)
- If “Viasat manages voice” = No, minimize required fields and show guidance.
- Enforce max 20 rows in table.

D) Racks Info (Table + Row detail panel)
- Minimum required: Rack ID, size, location, room.
- Photos recommended with warnings if missing.

E) Inventory (Advanced Table – source of truth)
- Includes import CSV/XLSX with column mapping UI.
- Row validation badges (missing required, invalid MAC format, duplicates).
- Inventory drives downstream modules:
  - Switches/Patch/Power/OBM device selectors
  - Layout pin naming and device linking
- Allow “quick add device” from selectors elsewhere (creates draft inventory record).

========================================================
5) HUBS (KEY MODERN UX)
========================================================
A) Layouts Hub (Canvas Page Template)
- Supports uploading plan/drawing images for each view.
- Racks and antennas appear as draggable markers (pins).
- Must include modern canvas utilities:
  - Zoom/pan, snap-to-grid toggle, reset layout
  - Undo/redo
  - Layers/list panel with search
  - Marker rotation control
- Save normalized X/Y + rotation.
- Empty state: “Upload a drawing to start placing assets.”

B) Connections Hub (Table Page Template)
- Switches Layout:
  - Select switch device from Inventory then render Ports table
  - Bulk add ports via template by model (24/48)
  - Duplicate a layout for another switch
- Patch Panel Layout:
  - Similar ports table with validations for missing endpoints
- Power Layout (PDU/UPS):
  - Use Beam 3 status chips (On/Off/Fault/Unknown)
- OBM Layout:
  - Only enabled if OBM exists in Inventory; otherwise show empty state “No OBM device registered.”
  - Include “Mark Verified with NOC” checkbox + timestamp

C) Antennas Hub (Hybrid: table + forms + visualization)
- Photos tab:
  - Table: Antenna, location, photo upload
  - Warn on duplicate reuse of same photo
- Blockage tab:
  - Per-antenna form: sat azimuth, blockage start/end
  - Generate visual overlay preview (arc/sector)
  - Export the illustration as SVG/PNG for reporting
- Antennas Config tab:
  - Per-antenna key/value grid + attachments
  - Export config as JSON

========================================================
6) EVIDENCE CENTER (GLOBAL)
========================================================
Create a global Evidence Center (Beam 3 drawer/panel):
- Shows all uploaded files across the document
- Filter by section, type, date, role
- Shows where each file is used (links)
- Allows reusing a file with warnings when reused in restricted contexts
- Drag-and-drop from Evidence Center into fields that accept uploads

========================================================
7) PRE-FLIGHT VALIDATION (REPORT READINESS)
========================================================
Screen: Generate / Preflight Dashboard
- Section progress cards with “Go to missing fields” deep links.
- Preflight panel with:
  - Errors (block generation)
  - Warnings (allow but flagged)
  - Inconsistencies (e.g., device mapped to missing rack)
- Required gating for PDF:
  Site Info + Services + Inventory + at least one of (Antenna photos OR Antenna layout).
- Buttons:
  Generate PDF, Generate editable report (DOCX/online doc), Export Inventory (XLSX/CSV), Export Evidence ZIP.

========================================================
8) COMPLETION LOGIC (WEIGHTED)
========================================================
Compute completion per section = filled required fields / total required fields.
Overall weighted completion:
- Site Info 15%
- Services 10%
- Phones 10%
- Racks 10%
- Inventory 20%
- Connections (Switch/Patch/Power/OBM) 15%
- Antennas (photos/layouts/blockage/config) 15%
- CSC Audit 5%

Show warning banners for cross-section inconsistencies.

========================================================
9) RESPONSIVE BEHAVIOR
========================================================
- Desktop: sidebar + content; large canvas workspace; tables full width.
- Tablet: collapsible sidebar; canvas supports pinch zoom.
- Mobile: phase stepper becomes dropdown; tables become stacked cards; canvas remains usable with zoom/pan.

========================================================
10) FIGMA DELIVERABLES REQUIRED
========================================================
Create:
1) Full set of screens for each phase and hub:
- Getting Started (role cards + mode selection)
- Site Info
- Services
- Phone Numbers
- Racks Info
- Equipment Not on Rack
- Inventory (with import mapping modal)
- Layouts Hub (tabs: Rack layout, Antenna layout, Additional views)
- Connections Hub (tabs: Switches, Patch, Power, OBM conditional + empty)
- Antennas Hub (tabs: Photos, Blockage, Config)
- CSC Audit
- Generate / Preflight dashboard

2) Reusable page templates:
- Form Page Template
- Advanced Table Page Template
- Canvas Layout Page Template
- Checklist Page Template
- Report Dashboard Template

3) Clickable prototype:
Getting Started → Setup → Assets → Layouts Hub → Connections Hub → Antennas Hub → CSC Audit → Generate/Preflight.

All UI elements MUST be Beam 3 components.