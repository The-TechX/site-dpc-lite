import { RouterProvider } from "react-router"
import { router } from "./routes.tsx"
import { RoleProvider } from "./contexts/RoleContext"
import { WorkflowProvider } from "./contexts/WorkflowContext"
import { ClientFilterProvider } from "./contexts/ClientFilterContext"
import { Toaster } from "sonner"

export default function App() {
  return (
    <RoleProvider>
      <WorkflowProvider>
        <ClientFilterProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </ClientFilterProvider>
      </WorkflowProvider>
    </RoleProvider>
  )
}