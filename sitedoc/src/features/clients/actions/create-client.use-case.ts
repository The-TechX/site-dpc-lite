import { CreateClientInput } from "../schemas/create-client.schema";

export async function createClient(data: CreateClientInput) {
  console.log("Creating client with data:", data);
}
