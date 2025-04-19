import { createApi } from "..";

export async function ListarCarrinhos(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarCarrinho");

  return response;
}

export async function ListarItensCarrinhos(carrinhoId, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(
    `/ListarItensCarrinho?carrinhoId=${carrinhoId}`
  );

  return response;
}
