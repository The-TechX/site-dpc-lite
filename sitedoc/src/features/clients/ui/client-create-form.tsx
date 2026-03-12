"use client";

import { createClientAction } from "../actions/create-client.action";

export function ClientCreateForm() {
  return (
    <form action={createClientAction}>
      <input name="name" placeholder="Client name" />
      <input name="logoUrl" placeholder="Logo URL" />
      <button type="submit">Create Client</button>
    </form>
  );
}
