import { createApi } from "..";

export async function ListarFornecedor(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarForncedor");

  return response;
}

export async function InserirFornecedor(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/CadastrarForncedor", props);

  return response;
}

export async function EditarFornecedor(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.put("/EditarForncedor", props);

  return response;
}

export async function ObterFornecedorGuid(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/ForncedorPorGuid?guid=${props}`);

  return response;
}

export async function PesquisarFornecedor(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("ForncedorFiltar", props);

  return response;
}

export async function SelectListForncedor(tenantId) {
  const Api = createApi(tenantId);
  let lista = [];
  const response = await Api.get("/SelectListForncedor");

  if (response.success) {
    response.data.map((item) => {
      lista.push({ value: item.value, label: item.text });
    });
  }
  lista.unshift({ value: "", label: "Selecione uma opção" });

  return lista;
}
