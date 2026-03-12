import { Client } from "../schemas/client.schema";

type ClientRows = {
  id: Client["id"];
  name: Client["name"];
  logoUrl: Client["logoUrl"];
};

type ClientTableProps = {
  clients: ClientRows[];
};

export default function ClientsTable({ clients }: ClientTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Logo</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.logoUrl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
