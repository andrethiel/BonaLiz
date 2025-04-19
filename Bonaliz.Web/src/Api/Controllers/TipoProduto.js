import { createApi } from "..";

export async function ListarTipoProduto(tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get("/ListarTipoProduto");

  return response;
}
export async function PesquisarTipoProduto(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("TipoProdutoFiltar", props);

  return response;
}
export async function InserirTipoProduto(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.post("/CadastrarTipoProduto", props);

  return response;
}
export async function EditarTipoProduto(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.put("/EditarTipoProduto", props);

  return response;
}

export async function TipoProdutoPorGuid(props, tenantId) {
  const Api = createApi(tenantId);
  const response = await Api.get(`/TipoProdutoPorGuid?guid=${props}`);

  return response;
}

export async function SelectListTipoProduto(tenantId) {
  const Api = createApi(tenantId);
  var lista = [];
  const response = await Api.get("/SelectListTipoProduto");
  if (response.success) {
    response.data.map((item) => {
      lista.push({ value: item.value, label: item.text });
    });
  }
  lista.unshift({ value: "", label: "Selecione uma opção" });

  return lista;
}
