import Api from "..";

export async function InserirVenda(form) {
  const response = await Api.request.post("/CadastrarVenda", form);

  return response;
}

export async function ListarVendas() {
  const response = await Api.request.get("/ListarVendas");

  return response;
}

export async function VendasPorGuid(guid) {
  const response = await Api.request.get(`/VendasPorGuid?guid=${guid}`);

  return response;
}

export async function VendasFiltar(form) {
  const response = await Api.request.post("/VendasFiltar", form);

  return response;
}

export async function CancelarVenda(id) {
  const response = await Api.request.put(`/VendasCancelar?id=${id}`);

  return response;
}

export async function StatusVenda(id, status) {
  const response = await Api.request.put(
    `/VendasStatus?id=${id}&status=${status}`
  );

  return response;
}

export async function VendaItens(id) {
  const response = await Api.request.get(`/ItensVenda?vendaId=${id}`);

  return response;
}
