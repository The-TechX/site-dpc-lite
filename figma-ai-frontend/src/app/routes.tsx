import React from "react"
import { createBrowserRouter } from "react-router"
import { Layout } from "./components/Layout"

import { Dashboard } from "./pages/Dashboard"
import { SiteInfo } from "./pages/SiteInfo"
import { Services } from "./pages/Services"
import { PhoneNumbers } from "./pages/PhoneNumbers"
import { RacksInfo } from "./pages/RacksInfo"
import { EquipmentNotOnRack } from "./pages/EquipmentNotOnRack"
import { Inventory } from "./pages/Inventory"
import { LayoutsHub } from "./pages/LayoutsHub"
import { ConnectionsHub } from "./pages/ConnectionsHub"
import { AntennasHub } from "./pages/AntennasHub"
import { GeneralDiagram } from "./pages/GeneralDiagram"
import { CSCAudit } from "./pages/CSCAudit"
import { GenerateReport } from "./pages/GenerateReport"
import { MasterData } from "./pages/MasterData"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "site-info", Component: SiteInfo },
      { path: "services", Component: Services },
      { path: "phone-numbers", Component: PhoneNumbers },
      { path: "racks", Component: RacksInfo },
      { path: "equipment-not-on-rack", Component: EquipmentNotOnRack },
      { path: "inventory", Component: Inventory },
      { path: "layouts", Component: LayoutsHub },
      { path: "connections", Component: ConnectionsHub },
      { path: "antennas", Component: AntennasHub },
      { path: "general-diagram", Component: GeneralDiagram },
      { path: "csc-audit", Component: CSCAudit },
      { path: "generate-report", Component: GenerateReport },
      { path: "master-data", Component: MasterData },
    ],
  },
])