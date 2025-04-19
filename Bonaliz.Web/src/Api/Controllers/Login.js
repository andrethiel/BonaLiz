import { createApi } from "..";

export async function Entrar(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/Login", form);

  return response;
}

export async function Logout(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/sair");

  return response;
}
