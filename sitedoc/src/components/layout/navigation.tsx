"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navSections = [
  {
    title: "Workspace",
    links: [
      { href: "/", label: "Dashboard" },
      { href: "/getting-started", label: "Getting Started" },
    ],
  },
  {
    title: "Phase A — Setup",
    links: [
      { href: "/site-info", label: "Site Info" },
      { href: "/services", label: "Services" },
      { href: "/phone-numbers", label: "Phone Numbers" },
    ],
  },
  {
    title: "Phase B/C — Assets & Layout",
    links: [
      { href: "/racks", label: "Racks" },
      { href: "/equipment-not-on-rack", label: "Off-Rack Equipment" },
      { href: "/inventory", label: "Inventory" },
      { href: "/layouts", label: "Layouts" },
      { href: "/connections", label: "Connections" },
      { href: "/antennas", label: "Antennas" },
      { href: "/general-diagram", label: "General Diagram" },
    ],
  },
  {
    title: "Phase F — Closeout",
    links: [
      { href: "/csc-audit", label: "CSC Audit" },
      { href: "/generate-report", label: "Generate Report" },
      { href: "/master-data", label: "Master Data" },
    ],
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-64 border-r border-slate-200 bg-white p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">SiteDoc UI Foundation</p>
      <nav className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{section.title}</h2>
            <ul className="space-y-1">
              {section.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-2 text-sm transition ${
                        active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
