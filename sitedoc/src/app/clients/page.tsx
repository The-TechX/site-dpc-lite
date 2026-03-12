import { getClients } from "@/src/features/clients/queries/get-clients";
import ClientsTable from "@/src/features/clients/ui/client-table";
//import { ClientCreateForm } from "@/src/clients/ui/client-create-form";

export default async function Page() {
  const clients = await getClients();
  return (
    <div className="flex gap-4 p-6">
      <h1>Clients</h1>
      <ClientsTable clients={clients} />
    </div>
  );
}
