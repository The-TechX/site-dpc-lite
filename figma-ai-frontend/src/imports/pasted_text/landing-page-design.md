
2) HERO SECTION — SITE DOCUMENT SEARCH
=====================================================
This is the main focus when the page loads.

Layout:
- Centered content
- Light background
- Large search input

Content:
- Title: “Find a Site Document”
- Subtitle: “Search by rig name, ticket, country, or customer”
- Large search bar with placeholder:
  “Search site documents…”

Behavior (visual only):
- Search should feel instant and prominent
- The input should visually suggest type-ahead / live search

=====================================================
3) MY TASKS — PERSONAL WORK QUEUE
=====================================================
This section appears ONLY if the user has pending tasks.

Title:
“My Tasks”

Layout:
- Horizontal cards (2–3 max per row)
- Each card represents one site document that requires action

Each task card includes:
- Rig / Site name
- Current phase (e.g. Assets, Layouts, Antennas, Closeout)
- Status badge (In Progress / Waiting Review / Pending Audit)
- Last updated timestamp
- Primary CTA button:
  - “Continue” (Field Engineer / PM)
  - “Review” (CSC)
  - “View” (read-only roles)

Design notes:
- Status should be color-coded but subtle
- CTA button should clearly indicate the next action
- Clicking the card or CTA resumes the document in the correct phase

Empty state:
- If no tasks exist, show:
  “You’re all caught up 🎉”

=====================================================
4) SITE DOCUMENTS LIST
=====================================================
A simple, readable table below “My Tasks”.

Title:
“All Site Documents”

Table columns:
- Site / Rig Name
- Customer
- Revision (A-Rev / B-Rev / C-Rev)
- Status (In Progress / Completed / Waiting Review)
- Current Phase
- Last Updated
- Action (Open / View / Review)

Design notes:
- Table should not feel like Excel
- Use clean spacing and light dividers
- Status should be visual (badge or pill)
- Limit visible rows (pagination or lazy load implied)

Filters above the table:
- Status
- Phase
- “Assigned to me” toggle

=====================================================
5) ROLE SCOPE — WHO DOES WHAT
=====================================================
This is an educational section to reduce confusion and onboarding time.

Title:
“Who does what in the Site Document”

Layout:
- Four role cards in a grid
- Each card has:
  - Icon
  - Role name
  - Short responsibility list
  - Highlighted phases they are involved in

Role content:

Project Engineer
- Defines technical architecture
- Provides antenna configurations
- Delivers general diagrams
Phases:
- Setup (support)
- Antennas
- Closeout

PM / Project Coordinator
- Owns the Site Document
- Defines services and revisions (A/B/C)
- Generates final customer report
Phases:
- Setup
- Assets (review)
- Closeout

Field Engineer
- Captures on-site data
- Uploads photos and layouts
- Documents inventory and connections
Phases:
- Assets
- Layouts
- Connections
- Antennas

CSC / NOC
- Reviews technical accuracy
- Performs CSC audit
- Confirms readiness for closeout
Phases:
- Closeout
- Audit

Design notes:
- Keep text short and scannable
- Use icons and subtle color accents per role
- This section should feel friendly, not technical

=====================================================
6) EMPTY & SUCCESS STATES
=====================================================
Include polished empty states:
- No site documents:
  “No site documents yet”
  CTA: “Create your first Site Document”
- No tasks:
  “You have no pending tasks”

=====================================================
7) OVERALL TONE & STYLE
=====================================================
- Calm, professional, enterprise-grade
- Avoid dense UI or heavy dashboards
- This page should feel welcoming, not overwhelming
- The user should know what to do within 5 seconds

DELIVERABLE:
- One complete Landing Page design
- Clean layout hierarchy
- Ready to be extended with real data later
