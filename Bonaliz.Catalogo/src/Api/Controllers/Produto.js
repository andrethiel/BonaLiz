import Api from "..";

export async function ListarProdutosPrincal() {
  const response = await Api.request.get("/Listar?Inativo=false");

  return response;
}

export async function SelectListTipoProduto() {
  var lista = [];
  const response = await Api.request.get("/TipoProdutoSelectList");
  response.map((item) => {
    lista.push({ value: item.value, label: item.text });
  });

  return lista;
}

export async function Filtrar(params) {
  const response = await Api.request.post("/ProdutoFiltar", {
    fornecedorId: params,
  });

  return response;
}
