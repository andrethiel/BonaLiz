import { createApi } from "..";

export async function InserirVenda(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/CadastrarVenda", form);

  return response;
}

export async function ListarVendas(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarVendas");

  return response;
}

export async function VendasPorGuid(guid, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/VendasPorGuid?guid=${guid}`);

  return response;
}

export async function VendasFiltar(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/VendasFiltar", form);

  return response;
}

export async function CancelarVenda(id, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.put(`/VendasCancelar?id=${id}`);

  return response;
}

export async function StatusVenda(id, status, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.put(`/VendasStatus?id=${id}&status=${status}`);

  return response;
}

export async function VendaItens(id, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/ItensVenda?vendaId=${id}`);

  return response;
}
