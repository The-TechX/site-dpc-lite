import React, { createContext, useContext, useState, ReactNode } from "react"

export const SITE_CLIENTS = ["Viasat", "Client A", "Client B"]

interface ClientFilterContextType {
  selectedClient: string
  setSelectedClient: (client: string) => void
  clients: string[]
}

const ClientFilterContext = createContext<ClientFilterContextType | undefined>(undefined)

export function ClientFilterProvider({ children }: { children: ReactNode }) {
  const [selectedClient, setSelectedClient] = useState("All Clients")

  return (
    <ClientFilterContext.Provider
      value={{
        selectedClient,
        setSelectedClient,
        clients: SITE_CLIENTS,
      }}
    >
      {children}
    </ClientFilterContext.Provider>
  )
}

export function useClientFilter() {
  const context = useContext(ClientFilterContext)
  if (context === undefined) {
    throw new Error("useClientFilter must be used within a ClientFilterProvider")
  }
  return context
}
