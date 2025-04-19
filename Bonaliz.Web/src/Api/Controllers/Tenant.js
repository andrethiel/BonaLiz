import { createApi } from "..";

export async function ObterTenant(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ObterTenant");

  return response;
}
