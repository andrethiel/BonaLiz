import { createApi } from "..";

export async function ListarClientes(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarClientes");

  return response;
}

export async function InserirCliente(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/CadastrarCliente", form);

  return response;
}

export async function EditarCliente(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.put("/EditarCliente", form);

  return response;
}

export async function ObterClienteGuid(guid, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/ClientePorGuid?Guid=${guid}`);

  return response;
}
export async function ClienteFiltrar(form, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/ClienteFiltrar", form);

  return response;
}

export async function SelectList(tenantId) {
  const Api = createApi(tenantId);
  let lista = [];
  const response = await Api.get("/SelectListClientes");

  response.map((item) => {
    lista.push({ value: item.value, label: item.text });
  });
  lista.unshift({ value: "", label: "Selecione uma opção" });

  return lista;
}
